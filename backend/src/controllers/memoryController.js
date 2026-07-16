const Memory = require("../models/Memory");

exports.createMemory = async (req, res) => {
  const { titulo, descricao, data, local, emocao } = req.body;
  const user_id = req.user.id; // Assuming user ID is available from auth middleware
  try {
    const newMemory = await Memory.create({ user_id, titulo, descricao, data, local, emocao });
    res.status(201).json(newMemory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getMemoriesByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const memories = await Memory.findByUserId(userId);
    res.json(memories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getMemoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const memory = await Memory.findById(id);
    if (!memory) {
      return res.status(404).json({ message: "Memory not found" });
    }
    res.json(memory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.updateMemory = async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, data, local, emocao } = req.body;
  try {
    const updatedMemory = await Memory.update(id, { titulo, descricao, data, local, emocao });
    if (!updatedMemory) {
      return res.status(404).json({ message: "Memory not found" });
    }
    res.json(updatedMemory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.deleteMemory = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Memory.delete(id);
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
