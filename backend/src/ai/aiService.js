/**
 * Serviço de IA para transformação e enriquecimento de memórias
 * Integra com LLM para criar conteúdo poético, resumos e homenagens
 */

const MemoryAITransformation = require("./MemoryAITransformation");

class AIService {
  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY;
    this.apiBase = process.env.OPENAI_API_BASE || "https://api.openai.com/v1";
  }

  /**
   * Transforma uma memória em texto poético
   */
  async transformToPoetic(memoryContent) {
    try {
      const prompt = `Transforme a seguinte memória em um texto poético e emotivo, mantendo os detalhes importantes mas tornando-a mais lírica e tocante:

Memória original:
"${memoryContent}"

Responda apenas com o texto poético, sem explicações adicionais.`;

      const response = await this.callLLM(prompt, "poetic");
      return response;
    } catch (error) {
      console.error("Erro ao transformar para poético:", error);
      throw new Error("Falha ao transformar memória em texto poético");
    }
  }

  /**
   * Cria um resumo da memória
   */
  async createSummary(memoryContent) {
    try {
      const prompt = `Crie um resumo conciso e impactante da seguinte memória, capturando os pontos principais em 2-3 frases:

Memória original:
"${memoryContent}"

Responda apenas com o resumo, sem explicações adicionais.`;

      const response = await this.callLLM(prompt, "summary");
      return response;
    } catch (error) {
      console.error("Erro ao criar resumo:", error);
      throw new Error("Falha ao criar resumo da memória");
    }
  }

  /**
   * Cria uma homenagem especial para pessoas que partiram
   */
  async createTribute(personName, memories) {
    try {
      const memoriesText = Array.isArray(memories)
        ? memories.join("\n- ")
        : memories;

      const prompt = `Crie uma homenagem tocante e respeitosa para ${personName} baseada nas seguintes memórias:

Memórias:
- ${memoriesText}

A homenagem deve ser emotiva, respeitosa e celebrar a vida dessa pessoa. Responda apenas com a homenagem, sem explicações adicionais.`;

      const response = await this.callLLM(prompt, "tribute");
      return response;
    } catch (error) {
      console.error("Erro ao criar homenagem:", error);
      throw new Error("Falha ao criar homenagem");
    }
  }

  /**
   * Melhora e enriquece o conteúdo de uma memória
   */
  async enhanceContent(memoryContent) {
    try {
      const prompt = `Melhore e enriqueça o seguinte conteúdo de memória, adicionando detalhes sensoriais e emocionais, mas mantendo a autenticidade:

Memória original:
"${memoryContent}"

Responda apenas com o texto melhorado, sem explicações adicionais.`;

      const response = await this.callLLM(prompt, "enhancement");
      return response;
    } catch (error) {
      console.error("Erro ao enriquecer conteúdo:", error);
      throw new Error("Falha ao enriquecer conteúdo da memória");
    }
  }

  /**
   * Gera sugestões de tags/categorias para uma memória
   */
  async generateTags(memoryContent) {
    try {
      const prompt = `Analise a seguinte memória e gere 5-7 tags relevantes que a categorizam:

Memória:
"${memoryContent}"

Responda com apenas as tags separadas por vírgula, sem explicações adicionais. Exemplo: felicidade, família, viagem, natureza`;

      const response = await this.callLLM(prompt, "tags");
      return response.split(",").map((tag) => tag.trim());
    } catch (error) {
      console.error("Erro ao gerar tags:", error);
      throw new Error("Falha ao gerar tags");
    }
  }

  /**
   * Analisa o sentimento emocional de uma memória
   */
  async analyzeSentiment(memoryContent) {
    try {
      const prompt = `Analise o sentimento emocional predominante na seguinte memória e classifique em uma das categorias: feliz, triste, saudade, amor, conquista, neutro, medo, esperança.

Memória:
"${memoryContent}"

Responda apenas com a categoria de sentimento, sem explicações adicionais.`;

      const response = await this.callLLM(prompt, "sentiment");
      return response.toLowerCase().trim();
    } catch (error) {
      console.error("Erro ao analisar sentimento:", error);
      return "neutro";
    }
  }

  /**
   * Cria uma descrição visual para uma memória (para geração de imagens)
   */
  async generateVisualDescription(memoryContent) {
    try {
      const prompt = `Baseado na seguinte memória, crie uma descrição visual detalhada que pudesse ser usada para gerar uma imagem artística. A descrição deve ser vívida, poética e capturar a essência emocional:

Memória:
"${memoryContent}"

Responda apenas com a descrição visual, sem explicações adicionais.`;

      const response = await this.callLLM(prompt, "visual");
      return response;
    } catch (error) {
      console.error("Erro ao gerar descrição visual:", error);
      throw new Error("Falha ao gerar descrição visual");
    }
  }

  /**
   * Chama a API do LLM (OpenAI ou compatível)
   */
  async callLLM(prompt, transformationType) {
    try {
      const response = await fetch(`${this.apiBase}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: process.env.AI_MODEL || "gpt-4.1-mini",
          messages: [
            {
              role: "system",
              content:
                "Você é um assistente especializado em transformar memórias pessoais em conteúdo emotivo, poético e significativo. Responda sempre de forma empática e respeitosa.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      if (!data.choices || data.choices.length === 0) {
        throw new Error("No choices returned from AI");
      }
      return data.choices[0].message.content.trim();
    } catch (error) {
      console.error("Erro ao chamar LLM:", error);
      throw error;
    }
  }

  /**
   * Salva uma transformação no banco de dados
   */
  async saveTransformation(memory_id, tipo, conteudo_original, conteudo_transformado) {
    try {
      const transformation = await MemoryAITransformation.create({
        memory_id,
        tipo,
        conteudo_original,
        conteudo_transformado,
        modelo_ia: process.env.AI_MODEL || "gpt-4.1-mini",
      });
      return transformation;
    } catch (error) {
      console.error("Erro ao salvar transformação:", error);
      throw error;
    }
  }

  /**
   * Processa uma memória completa com todas as transformações
   */
  async processMemory(memory) {
    try {
      const results = {
        poetic: null,
        summary: null,
        sentiment: null,
        tags: null,
        visual: null,
      };

      // Análise de sentimento (sempre)
      results.sentiment = await this.analyzeSentiment(memory.descricao);

      // Transformação poética
      try {
        results.poetic = await this.transformToPoetic(memory.descricao);
      } catch (error) {
        console.warn("Falha ao transformar para poético:", error.message);
      }

      // Resumo
      try {
        results.summary = await this.createSummary(memory.descricao);
      } catch (error) {
        console.warn("Falha ao criar resumo:", error.message);
      }

      // Tags
      try {
        results.tags = await this.generateTags(memory.descricao);
      } catch (error) {
        console.warn("Falha ao gerar tags:", error.message);
      }

      // Descrição visual
      try {
        results.visual = await this.generateVisualDescription(memory.descricao);
      } catch (error) {
        console.warn("Falha ao gerar descrição visual:", error.message);
      }

      return results;
    } catch (error) {
      console.error("Erro ao processar memória:", error);
      throw error;
    }
  }
}

module.exports = new AIService();
