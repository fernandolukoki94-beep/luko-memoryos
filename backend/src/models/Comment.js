const pool = require("../config/db");

class Comment {
  static async create({ memory_id, user_id, texto }) {
    const result = await pool.query(
      "INSERT INTO comments (memory_id, user_id, texto) VALUES ($1, $2, $3) RETURNING *",
      [memory_id, user_id, texto]
    );
    return result.rows[0];
  }

  static async findByMemoryId(memory_id) {
    const result = await pool.query("SELECT * FROM comments WHERE memory_id = $1 ORDER BY created_at ASC", [memory_id]);
    return result.rows;
  }

  static async delete(id) {
    await pool.query("DELETE FROM comments WHERE id = $1", [id]);
    return { message: "Comment deleted successfully" };
  }
}

module.exports = Comment;
