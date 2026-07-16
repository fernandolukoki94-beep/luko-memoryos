const express = require("express");
const router = express.Router();
const aiTransformationController = require("../controllers/aiTransformationController");
const auth = require("../middleware/auth");

// Transformar memória em texto poético
router.post("/:memoryId/poetic", auth, aiTransformationController.transformToPoetic);

// Criar resumo da memória
router.post("/:memoryId/summary", auth, aiTransformationController.createSummary);

// Enriquecer conteúdo da memória
router.post("/:memoryId/enhance", auth, aiTransformationController.enhanceContent);

// Gerar tags para a memória
router.post("/:memoryId/tags", auth, aiTransformationController.generateTags);

// Analisar sentimento da memória
router.post("/:memoryId/sentiment", auth, aiTransformationController.analyzeSentiment);

// Gerar descrição visual
router.post("/:memoryId/visual", auth, aiTransformationController.generateVisualDescription);

// Processar memória completa
router.post("/:memoryId/process", auth, aiTransformationController.processMemory);

// Criar homenagem especial
router.post("/tribute/create", auth, aiTransformationController.createTribute);

// Obter transformações de uma memória
router.get("/:memoryId", auth, aiTransformationController.getTransformations);

// Deletar uma transformação
router.delete("/:transformationId", auth, aiTransformationController.deleteTransformation);

module.exports = router;
