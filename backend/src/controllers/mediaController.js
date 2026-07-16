const Media = require("../models/Media");

exports.createMedia = async (req, res) => {
  const { memory_id, tipo, arquivo_url } = req.body;
  try {
    const newMedia = await Media.create({ memory_id, tipo, arquivo_url });
    res.status(201).json(newMedia);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getMediaByMemory = async (req, res) => {
  const { memoryId } = req.params;
  try {
    const media = await Media.findByMemoryId(memoryId);
    res.json(media);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.deleteMedia = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Media.delete(id);
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
