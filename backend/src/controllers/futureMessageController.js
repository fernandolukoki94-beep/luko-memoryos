const FutureMessage = require("../models/FutureMessage");

exports.createFutureMessage = async (req, res) => {
  const { mensagem, data_abertura } = req.body;
  const user_id = req.user.id; // Assuming user ID is available from auth middleware
  try {
    const newFutureMessage = await FutureMessage.create({ user_id, mensagem, data_abertura });
    res.status(201).json(newFutureMessage);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getFutureMessagesByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const futureMessages = await FutureMessage.findByUserId(userId);
    res.json(futureMessages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.deleteFutureMessage = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await FutureMessage.delete(id);
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
