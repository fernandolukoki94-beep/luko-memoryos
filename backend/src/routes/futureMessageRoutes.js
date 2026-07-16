const express = require("express");
const router = express.Router();
const futureMessageController = require("../controllers/futureMessageController");
const auth = require("../middleware/auth");

router.post("/", auth, futureMessageController.createFutureMessage);
router.get("/user/:userId", auth, futureMessageController.getFutureMessagesByUser);
router.delete("/:id", auth, futureMessageController.deleteFutureMessage);

module.exports = router;
