const pool = require("../config/db");

class Memory {
  /**
   * Cria uma nova memória
   */
  static async create({ user_id, titulo, descricao, descricao_criptografada, data, local, emocao, privacidade = 'privada', criptografada = false, tags = [] }) {
    const result = await pool.query(
      `INSERT INTO memories (user_id, titulo, descricao, descricao_criptografada, data, local, emocao, privacidade, criptografada, tags) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
       RETURNING *`,
      [user_id, titulo, descricao, descricao_criptografada, data, local, emocao, privacidade, criptografada, tags]
    );
    return result.rows[0];
  }

  /**
   * Encontra todas as memórias de um usuário, ordenadas por data
   */
  static async findByUserId(user_id) {
    const result = await pool.query(
      `SELECT id, user_id, titulo, descricao, descricao_criptografada, data, local, emocao, privacidade, criptografada, criado_em, atualizado_em 
       FROM memories 
       WHERE user_id = $1 
       ORDER BY data DESC`,
      [user_id]
    );
    return result.rows;
  }

  /**
   * Encontra uma memória específica por ID
   */
  static async findById(id) {
    const result = await pool.query(
      `SELECT id, user_id, titulo, descricao, descricao_criptografada, data, local, emocao, privacidade, criptografada, criado_em, atualizado_em 
       FROM memories 
       WHERE id = $1`,
      [id]
    );
    return result.rows[0];
  }

  /**
   * Encontra memórias públicas de um usuário
   */
  static async findPublicByUserId(user_id) {
    const result = await pool.query(
      `SELECT id, user_id, titulo, descricao, data, local, emocao, criado_em, atualizado_em 
       FROM memories 
       WHERE user_id = $1 AND privacidade = 'publica'
       ORDER BY data DESC`,
      [user_id]
    );
    return result.rows;
  }

  /**
   * Atualiza uma memória existente
   */
  static async update(id, { titulo, descricao, descricao_criptografada, data, local, emocao, privacidade, criptografada, tags }) {
    const result = await pool.query(
      `UPDATE memories 
       SET titulo = $1, descricao = $2, descricao_criptografada = $3, data = $4, local = $5, emocao = $6, privacidade = $7, criptografada = $8, tags = $9, atualizado_em = CURRENT_TIMESTAMP
       WHERE id = $10 
       RETURNING *`,
      [titulo, descricao, descricao_criptografada, data, local, emocao, privacidade, criptografada, tags, id]
    );
    return result.rows[0];
  }

  /**
   * Deleta uma memória
   */
  static async delete(id) {
    await pool.query("DELETE FROM memories WHERE id = $1", [id]);
    return { message: "Memória deletada com sucesso" };
  }

  /**
   * Encontra memórias por emoção
   */
  static async findByEmotion(user_id, emocao) {
    const result = await pool.query(
      `SELECT * FROM memories 
       WHERE user_id = $1 AND emocao = $2 
       ORDER BY data DESC`,
      [user_id, emocao]
    );
    return result.rows;
  }

  /**
   * Encontra memórias por data (intervalo)
   */
  static async findByDateRange(user_id, startDate, endDate) {
    const result = await pool.query(
      `SELECT * FROM memories 
       WHERE user_id = $1 AND data BETWEEN $2 AND $3 
       ORDER BY data DESC`,
      [user_id, startDate, endDate]
    );
    return result.rows;
  }

  /**
   * Encontra memórias por local
   */
  static async findByLocation(user_id, local) {
    const result = await pool.query(
      `SELECT * FROM memories 
       WHERE user_id = $1 AND local ILIKE $2 
       ORDER BY data DESC`,
      [user_id, `%${local}%`]
    );
    return result.rows;
  }

  /**
   * Conta memórias por privacidade
   */
  static async countByPrivacy(user_id) {
    const result = await pool.query(
      `SELECT privacidade, COUNT(*) as count 
       FROM memories 
       WHERE user_id = $1 
       GROUP BY privacidade`,
      [user_id]
    );
    return result.rows;
  }

  /**
   * Pesquisa memórias do usuário por termo
   */
  static async search(user_id, term) {
    const result = await pool.query(
      `SELECT * FROM memories 
       WHERE user_id = $1 AND (titulo ILIKE $2 OR descricao ILIKE $2 OR $3 = ANY(tags))
       ORDER BY data DESC`,
      [user_id, `%${term}%`, term]
    );
    return result.rows;
  }

  /**
   * Encontra memórias por tag
   */
  static async findByTag(user_id, tag) {
    const result = await pool.query(
      `SELECT * FROM memories 
       WHERE user_id = $1 AND $2 = ANY(tags)
       ORDER BY data DESC`,
      [user_id, tag]
    );
    return result.rows;
  }

  /**
   * Obtém estatísticas de memórias do usuário
   */
  static async getStats(user_id) {
    const result = await pool.query(
      `SELECT 
        COUNT(*) as total_memories,
        COUNT(CASE WHEN criptografada = true THEN 1 END) as encrypted_memories,
        COUNT(CASE WHEN privacidade = 'privada' THEN 1 END) as private_memories,
        COUNT(CASE WHEN privacidade = 'publica' THEN 1 END) as public_memories,
        MIN(data) as oldest_memory,
        MAX(data) as newest_memory
       FROM memories 
       WHERE user_id = $1`,
      [user_id]
    );
    return result.rows[0];
  }
}

module.exports = Memory;
