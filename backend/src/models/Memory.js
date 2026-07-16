const pool = require("../config/db");

class Memory {
  static async create({ user_id, titulo, descricao, data, local, emocao }) {
    const result = await pool.query(
      "INSERT INTO memories (user_id, titulo, descricao, data, local, emocao) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [user_id, titulo, descricao, data, local, emocao]
    );
    return result.rows[0];
  }

  static async findByUserId(user_id) {
    const result = await pool.query("SELECT * FROM memories WHERE user_id = $1 ORDER BY data DESC", [user_id]);
    return result.rows;
  }

  static async findById(id) {
    const result = await pool.query("SELECT * FROM memories WHERE id = $1", [id]);
    return result.rows[0];
  }

  static async update(id, { titulo, descricao, data, local, emocao }) {
    const result = await pool.query(
      "UPDATE memories SET titulo = $1, descricao = $2, data = $3, local = $4, emocao = $5 WHERE id = $6 RETURNING *",
      [titulo, descricao, data, local, emocao, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    await pool.query("DELETE FROM memories WHERE id = $1", [id]);
    return { message: "Memory deleted successfully" };
  }
}

module.exports = Memory;
