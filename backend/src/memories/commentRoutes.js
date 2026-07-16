const express = require("express");
const router = express.Router();
const commentController = require("./commentController");
const auth = require("../auth/auth");

router.post("/", auth, commentController.createComment);
router.get("/memory/:memoryId", auth, commentController.getCommentsByMemory);
router.delete("/:id", auth, commentController.deleteComment);

module.exports = router;
