const Memory = require("../models/Memory");
const encryptionService = require("../utils/encryption");

/**
 * Cria uma nova memória com suporte a criptografia
 */
exports.createMemory = async (req, res) => {
  const { titulo, descricao, data, local, emocao, privacidade = 'privada', criptografar = false } = req.body;
  const user_id = req.user.id;

  try {
    let descricao_criptografada = null;
    let criptografada = false;

    // Se o usuário deseja criptografar e forneceu uma senha
    if (criptografar && req.body.senha_criptografia) {
      try {
        descricao_criptografada = encryptionService.encrypt(
          descricao,
          req.body.senha_criptografia
        );
        criptografada = true;
      } catch (error) {
        return res.status(400).json({ 
          message: "Erro ao criptografar memória",
          error: error.message 
        });
      }
    }

    const newMemory = await Memory.create({
      user_id,
      titulo,
      descricao: criptografada ? null : descricao,
      descricao_criptografada,
      data,
      local,
      emocao,
      privacidade,
      criptografada
    });

    res.status(201).json({
      ...newMemory,
      criptografada,
      mensagem: criptografada ? "Memória criada e criptografada com sucesso" : "Memória criada com sucesso"
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ 
      message: "Erro ao criar memória",
      error: err.message 
    });
  }
};

/**
 * Obtém todas as memórias de um usuário
 */
exports.getMemoriesByUser = async (req, res) => {
  const { userId } = req.params;
  const { descriptografar = false, senha_criptografia } = req.query;

  try {
    const memories = await Memory.findByUserId(userId);

    // Se solicitado descriptografar, faz isso
    if (descriptografar && senha_criptografia) {
      const memoriesDecrypted = memories.map(memory => {
        if (memory.criptografada && memory.descricao_criptografada) {
          try {
            memory.descricao = encryptionService.decrypt(
              memory.descricao_criptografada,
              senha_criptografia
            );
          } catch (error) {
            memory.descricao = "[Falha ao descriptografar - senha incorreta]";
          }
        }
        return memory;
      });
      return res.json(memoriesDecrypted);
    }

    // Retorna memórias sem descriptografar
    res.json(memories);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ 
      message: "Erro ao buscar memórias",
      error: err.message 
    });
  }
};

/**
 * Obtém uma memória específica por ID
 */
exports.getMemoryById = async (req, res) => {
  const { id } = req.params;
  const { descriptografar = false, senha_criptografia } = req.query;

  try {
    const memory = await Memory.findById(id);

    if (!memory) {
      return res.status(404).json({ message: "Memória não encontrada" });
    }

    // Verifica privacidade (apenas o dono ou admin pode ver)
    if (memory.privacidade === 'privada' && memory.user_id !== req.user.id) {
      return res.status(403).json({ message: "Acesso negado" });
    }

    // Se solicitado descriptografar
    if (descriptografar && senha_criptografia && memory.criptografada) {
      try {
        memory.descricao = encryptionService.decrypt(
          memory.descricao_criptografada,
          senha_criptografia
        );
      } catch (error) {
        return res.status(400).json({ 
          message: "Falha ao descriptografar",
          error: "Senha incorreta ou dados corrompidos"
        });
      }
    }

    res.json(memory);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ 
      message: "Erro ao buscar memória",
      error: err.message 
    });
  }
};

/**
 * Atualiza uma memória existente
 */
exports.updateMemory = async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, data, local, emocao, privacidade, criptografar = false, senha_criptografia } = req.body;

  try {
    const memory = await Memory.findById(id);

    if (!memory) {
      return res.status(404).json({ message: "Memória não encontrada" });
    }

    // Verifica se o usuário é o dono
    if (memory.user_id !== req.user.id) {
      return res.status(403).json({ message: "Acesso negado" });
    }

    let descricao_criptografada = null;
    let criptografada = false;

    if (criptografar && senha_criptografia) {
      try {
        descricao_criptografada = encryptionService.encrypt(
          descricao,
          senha_criptografia
        );
        criptografada = true;
      } catch (error) {
        return res.status(400).json({ 
          message: "Erro ao criptografar memória",
          error: error.message 
        });
      }
    }

    const updatedMemory = await Memory.update(id, {
      titulo,
      descricao: criptografada ? null : descricao,
      descricao_criptografada,
      data,
      local,
      emocao,
      privacidade,
      criptografada
    });

    res.json(updatedMemory);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ 
      message: "Erro ao atualizar memória",
      error: err.message 
    });
  }
};

/**
 * Deleta uma memória
 */
exports.deleteMemory = async (req, res) => {
  const { id } = req.params;

  try {
    const memory = await Memory.findById(id);

    if (!memory) {
      return res.status(404).json({ message: "Memória não encontrada" });
    }

    // Verifica se o usuário é o dono
    if (memory.user_id !== req.user.id) {
      return res.status(403).json({ message: "Acesso negado" });
    }

    const result = await Memory.delete(id);
    res.json({ 
      message: "Memória deletada com sucesso",
      result 
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ 
      message: "Erro ao deletar memória",
      error: err.message 
    });
  }
};

/**
 * Obtém memórias públicas de um usuário (para timeline pública)
 */
exports.getPublicMemories = async (req, res) => {
  const { userId } = req.params;

  try {
    const memories = await Memory.findPublicByUserId(userId);
    res.json(memories);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ 
      message: "Erro ao buscar memórias públicas",
      error: err.message 
    });
  }
};
