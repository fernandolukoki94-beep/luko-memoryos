const crypto = require('crypto');

/**
 * Utilitários de criptografia para proteger memórias sensíveis
 * Usa AES-256-GCM para criptografia autenticada
 */

class EncryptionService {
  constructor() {
    // Algoritmo de criptografia
    this.algorithm = 'aes-256-gcm';
    this.saltLength = 64;
    this.tagLength = 16;
    this.tagPosition = this.saltLength;
    this.encryptedPosition = this.tagPosition + this.tagLength;
  }

  /**
   * Deriva uma chave a partir de uma senha usando PBKDF2
   * @param {string} password - Senha do usuário
   * @param {Buffer} salt - Salt para derivação
   * @returns {Buffer} Chave derivada
   */
  deriveKey(password, salt) {
    return crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256');
  }

  /**
   * Criptografa um texto usando a chave do usuário
   * @param {string} plaintext - Texto a criptografar
   * @param {string} userPassword - Senha do usuário (usada para derivar a chave)
   * @returns {string} Texto criptografado em base64
   */
  encrypt(plaintext, userPassword) {
    try {
      // Gera um salt aleatório
      const salt = crypto.randomBytes(this.saltLength);
      
      // Deriva a chave a partir da senha
      const key = this.deriveKey(userPassword, salt);
      
      // Gera um IV aleatório
      const iv = crypto.randomBytes(16);
      
      // Cria o cipher
      const cipher = crypto.createCipheriv(this.algorithm, key, iv);
      
      // Criptografa o texto
      let encrypted = cipher.update(plaintext, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      
      // Obtém a tag de autenticação
      const tag = cipher.getAuthTag();
      
      // Combina: salt + tag + iv + encrypted
      const buffer = Buffer.concat([
        salt,
        tag,
        iv,
        Buffer.from(encrypted, 'hex')
      ]);
      
      return buffer.toString('base64');
    } catch (error) {
      console.error('Erro ao criptografar:', error);
      throw new Error('Falha ao criptografar memória');
    }
  }

  /**
   * Descriptografa um texto usando a chave do usuário
   * @param {string} encryptedData - Dados criptografados em base64
   * @param {string} userPassword - Senha do usuário (usada para derivar a chave)
   * @returns {string} Texto descriptografado
   */
  decrypt(encryptedData, userPassword) {
    try {
      // Converte de base64 para buffer
      const buffer = Buffer.from(encryptedData, 'base64');
      
      // Extrai os componentes
      const salt = buffer.slice(0, this.saltLength);
      const tag = buffer.slice(this.tagPosition, this.encryptedPosition);
      const iv = buffer.slice(this.encryptedPosition, this.encryptedPosition + 16);
      const encrypted = buffer.slice(this.encryptedPosition + 16).toString('hex');
      
      // Deriva a chave a partir da senha
      const key = this.deriveKey(userPassword, salt);
      
      // Cria o decipher
      const decipher = crypto.createDecipheriv(this.algorithm, key, iv);
      
      // Define a tag de autenticação
      decipher.setAuthTag(tag);
      
      // Descriptografa o texto
      let decrypted = decipher.update(encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      
      return decrypted;
    } catch (error) {
      console.error('Erro ao descriptografar:', error);
      throw new Error('Falha ao descriptografar memória. Senha incorreta ou dados corrompidos.');
    }
  }

  /**
   * Gera um hash seguro para verificação de integridade
   * @param {string} data - Dados a fazer hash
   * @returns {string} Hash em hexadecimal
   */
  generateHash(data) {
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  /**
   * Verifica se um hash corresponde aos dados
   * @param {string} data - Dados originais
   * @param {string} hash - Hash para verificar
   * @returns {boolean} True se o hash corresponde
   */
  verifyHash(data, hash) {
    return this.generateHash(data) === hash;
  }
}

module.exports = new EncryptionService();
