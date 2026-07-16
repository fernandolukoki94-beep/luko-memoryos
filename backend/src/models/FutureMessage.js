const pool = require("../config/db");

class FutureMessage {
  static async create({ user_id, mensagem, data_abertura }) {
    const result = await pool.query(
      "INSERT INTO future_messages (user_id, mensagem, data_abertura) VALUES ($1, $2, $3) RETURNING *",
      [user_id, mensagem, data_abertura]
    );
    return result.rows[0];
  }

  static async findByUserId(user_id) {
    const result = await pool.query("SELECT * FROM future_messages WHERE user_id = $1 ORDER BY data_abertura ASC", [user_id]);
    return result.rows;
  }

  static async findById(id) {
    const result = await pool.query("SELECT * FROM future_messages WHERE id = $1", [id]);
    return result.rows[0];
  }

  static async delete(id) {
    await pool.query("DELETE FROM future_messages WHERE id = $1", [id]);
    return { message: "Future message deleted successfully" };
  }
}

module.exports = FutureMessage;
