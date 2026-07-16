const Comment = require("./Comment");

exports.createComment = async (req, res) => {
  const { memory_id, texto } = req.body;
  const user_id = req.user.id; // Assuming user ID is available from auth middleware
  try {
    const newComment = await Comment.create({ memory_id, user_id, texto });
    res.status(201).json(newComment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getCommentsByMemory = async (req, res) => {
  const { memoryId } = req.params;
  try {
    const comments = await Comment.findByMemoryId(memoryId);
    res.json(comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Comment.delete(id);
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
