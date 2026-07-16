const Memory = require("../models/Memory");
const MemoryAITransformation = require("../models/MemoryAITransformation");
const aiService = require("../services/aiService");

/**
 * Transforma uma memória em texto poético
 */
exports.transformToPoetic = async (req, res) => {
  const { memoryId } = req.params;

  try {
    const memory = await Memory.findById(memoryId);

    if (!memory) {
      return res.status(404).json({ message: "Memória não encontrada" });
    }

    // Verifica se o usuário é o dono
    if (memory.user_id !== req.user.id) {
      return res.status(403).json({ message: "Acesso negado" });
    }

    const conteudo_original = memory.descricao;
    const conteudo_transformado = await aiService.transformToPoetic(
      conteudo_original
    );

    const transformation = await MemoryAITransformation.create({
      memory_id: memoryId,
      tipo: "poetic",
      conteudo_original,
      conteudo_transformado,
      modelo_ia: "gpt-3.5-turbo",
    });

    res.status(201).json({
      message: "Memória transformada em texto poético",
      transformation,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: "Erro ao transformar memória",
      error: err.message,
    });
  }
};

/**
 * Cria um resumo da memória
 */
exports.createSummary = async (req, res) => {
  const { memoryId } = req.params;

  try {
    const memory = await Memory.findById(memoryId);

    if (!memory) {
      return res.status(404).json({ message: "Memória não encontrada" });
    }

    // Verifica se o usuário é o dono
    if (memory.user_id !== req.user.id) {
      return res.status(403).json({ message: "Acesso negado" });
    }

    const conteudo_original = memory.descricao;
    const conteudo_transformado = await aiService.createSummary(
      conteudo_original
    );

    const transformation = await MemoryAITransformation.create({
      memory_id: memoryId,
      tipo: "summary",
      conteudo_original,
      conteudo_transformado,
      modelo_ia: "gpt-3.5-turbo",
    });

    res.status(201).json({
      message: "Resumo criado com sucesso",
      transformation,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: "Erro ao criar resumo",
      error: err.message,
    });
  }
};

/**
 * Cria uma homenagem especial
 */
exports.createTribute = async (req, res) => {
  const { personName, memories } = req.body;
  const user_id = req.user.id;

  try {
    if (!personName || !memories || memories.length === 0) {
      return res.status(400).json({
        message: "Nome da pessoa e memórias são obrigatórios",
      });
    }

    const conteudo_transformado = await aiService.createTribute(
      personName,
      memories
    );

    res.status(201).json({
      message: "Homenagem criada com sucesso",
      tribute: {
        personName,
        content: conteudo_transformado,
        created_at: new Date().toISOString(),
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: "Erro ao criar homenagem",
      error: err.message,
    });
  }
};

/**
 * Melhora o conteúdo de uma memória
 */
exports.enhanceContent = async (req, res) => {
  const { memoryId } = req.params;

  try {
    const memory = await Memory.findById(memoryId);

    if (!memory) {
      return res.status(404).json({ message: "Memória não encontrada" });
    }

    // Verifica se o usuário é o dono
    if (memory.user_id !== req.user.id) {
      return res.status(403).json({ message: "Acesso negado" });
    }

    const conteudo_original = memory.descricao;
    const conteudo_transformado = await aiService.enhanceContent(
      conteudo_original
    );

    const transformation = await MemoryAITransformation.create({
      memory_id: memoryId,
      tipo: "enhancement",
      conteudo_original,
      conteudo_transformado,
      modelo_ia: "gpt-3.5-turbo",
    });

    res.status(201).json({
      message: "Conteúdo enriquecido com sucesso",
      transformation,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: "Erro ao enriquecer conteúdo",
      error: err.message,
    });
  }
};

/**
 * Gera tags para uma memória
 */
exports.generateTags = async (req, res) => {
  const { memoryId } = req.params;

  try {
    const memory = await Memory.findById(memoryId);

    if (!memory) {
      return res.status(404).json({ message: "Memória não encontrada" });
    }

    // Verifica se o usuário é o dono
    if (memory.user_id !== req.user.id) {
      return res.status(403).json({ message: "Acesso negado" });
    }

    const tags = await aiService.generateTags(memory.descricao);

    res.json({
      message: "Tags geradas com sucesso",
      tags,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: "Erro ao gerar tags",
      error: err.message,
    });
  }
};

/**
 * Analisa o sentimento de uma memória
 */
exports.analyzeSentiment = async (req, res) => {
  const { memoryId } = req.params;

  try {
    const memory = await Memory.findById(memoryId);

    if (!memory) {
      return res.status(404).json({ message: "Memória não encontrada" });
    }

    // Verifica se o usuário é o dono
    if (memory.user_id !== req.user.id) {
      return res.status(403).json({ message: "Acesso negado" });
    }

    const sentiment = await aiService.analyzeSentiment(memory.descricao);

    res.json({
      message: "Sentimento analisado com sucesso",
      sentiment,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: "Erro ao analisar sentimento",
      error: err.message,
    });
  }
};

/**
 * Gera descrição visual para uma memória
 */
exports.generateVisualDescription = async (req, res) => {
  const { memoryId } = req.params;

  try {
    const memory = await Memory.findById(memoryId);

    if (!memory) {
      return res.status(404).json({ message: "Memória não encontrada" });
    }

    // Verifica se o usuário é o dono
    if (memory.user_id !== req.user.id) {
      return res.status(403).json({ message: "Acesso negado" });
    }

    const visualDescription = await aiService.generateVisualDescription(
      memory.descricao
    );

    res.json({
      message: "Descrição visual gerada com sucesso",
      visualDescription,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: "Erro ao gerar descrição visual",
      error: err.message,
    });
  }
};

/**
 * Processa uma memória completa com todas as transformações
 */
exports.processMemory = async (req, res) => {
  const { memoryId } = req.params;

  try {
    const memory = await Memory.findById(memoryId);

    if (!memory) {
      return res.status(404).json({ message: "Memória não encontrada" });
    }

    // Verifica se o usuário é o dono
    if (memory.user_id !== req.user.id) {
      return res.status(403).json({ message: "Acesso negado" });
    }

    const results = await aiService.processMemory(memory);

    res.json({
      message: "Memória processada com sucesso",
      results,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: "Erro ao processar memória",
      error: err.message,
    });
  }
};

/**
 * Obtém todas as transformações de uma memória
 */
exports.getTransformations = async (req, res) => {
  const { memoryId } = req.params;

  try {
    const memory = await Memory.findById(memoryId);

    if (!memory) {
      return res.status(404).json({ message: "Memória não encontrada" });
    }

    // Verifica se o usuário é o dono
    if (memory.user_id !== req.user.id) {
      return res.status(403).json({ message: "Acesso negado" });
    }

    const transformations = await MemoryAITransformation.findByMemoryId(
      memoryId
    );

    res.json(transformations);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: "Erro ao buscar transformações",
      error: err.message,
    });
  }
};

/**
 * Deleta uma transformação
 */
exports.deleteTransformation = async (req, res) => {
  const { transformationId } = req.params;

  try {
    const transformation = await MemoryAITransformation.findById(
      transformationId
    );

    if (!transformation) {
      return res.status(404).json({ message: "Transformação não encontrada" });
    }

    const memory = await Memory.findById(transformation.memory_id);

    // Verifica se o usuário é o dono
    if (memory.user_id !== req.user.id) {
      return res.status(403).json({ message: "Acesso negado" });
    }

    const result = await MemoryAITransformation.delete(transformationId);
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: "Erro ao deletar transformação",
      error: err.message,
    });
  }
};
