const pool = require("../config/db");

class Media {
  static async create({ memory_id, tipo, arquivo_url }) {
    const result = await pool.query(
      "INSERT INTO media (memory_id, tipo, arquivo_url) VALUES ($1, $2, $3) RETURNING *",
      [memory_id, tipo, arquivo_url]
    );
    return result.rows[0];
  }

  static async findByMemoryId(memory_id) {
    const result = await pool.query("SELECT * FROM media WHERE memory_id = $1", [memory_id]);
    return result.rows;
  }

  static async delete(id) {
    await pool.query("DELETE FROM media WHERE id = $1", [id]);
    return { message: "Media deleted successfully" };
  }
}

module.exports = Media;
