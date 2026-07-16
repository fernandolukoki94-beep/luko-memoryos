const express = require("express");
const router = express.Router();
const mediaController = require("./mediaController");
const auth = require("../auth/auth");

router.post("/", auth, mediaController.createMedia);
router.get("/memory/:memoryId", auth, mediaController.getMediaByMemory);
router.delete("/:id", auth, mediaController.deleteMedia);

module.exports = router;
