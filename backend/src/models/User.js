const pool = require("../config/db");

class User {
  static async create({ nome, email, senha, foto }) {
    const result = await pool.query(
      "INSERT INTO users (nome, email, senha, foto) VALUES ($1, $2, $3, $4) RETURNING *",
      [nome, email, senha, foto]
    );
    return result.rows[0];
  }

  static async findByEmail(email) {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
  }

  static async findById(id) {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
  }
}

module.exports = User;
