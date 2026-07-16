const express = require("express");
const router = express.Router();
const mediaController = require("../controllers/mediaController");
const auth = require("../middleware/auth");

router.post("/", auth, mediaController.createMedia);
router.get("/memory/:memoryId", auth, mediaController.getMediaByMemory);
router.delete("/:id", auth, mediaController.deleteMedia);

module.exports = router;
