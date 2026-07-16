const express = require("express");
const router = express.Router();
const memoryController = require("./memoryController");
const auth = require("../auth/auth");

router.post("/", auth, memoryController.createMemory);
router.get("/user/:userId", auth, memoryController.getMemoriesByUser);
router.get("/:id", auth, memoryController.getMemoryById);
router.put("/:id", auth, memoryController.updateMemory);
router.delete("/:id", auth, memoryController.deleteMemory);

module.exports = router;
