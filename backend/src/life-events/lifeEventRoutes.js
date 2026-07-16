const express = require("express");
const router = express.Router();
const lifeEventController = require("./lifeEventController");
const auth = require("../auth/auth");

// Criar um novo evento de vida
router.post("/", auth, lifeEventController.createLifeEvent);

// Obter todos os eventos de vida de um usuário
router.get("/user/:userId", lifeEventController.getLifeEventsByUser);

// Obter a timeline completa de vida
router.get("/timeline/:userId", lifeEventController.getLifeTimeline);

// Obter eventos por tipo
router.get("/type/:userId/:tipo", lifeEventController.getLifeEventsByType);

// Obter estatísticas
router.get("/stats/:userId", lifeEventController.getLifeEventStats);

// Obter um evento específico
router.get("/:id", lifeEventController.getLifeEventById);

// Atualizar um evento
router.put("/:id", auth, lifeEventController.updateLifeEvent);

// Deletar um evento
router.delete("/:id", auth, lifeEventController.deleteLifeEvent);

module.exports = router;
