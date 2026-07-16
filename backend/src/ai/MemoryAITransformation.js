const pool = require("../config/db");

class MemoryAITransformation {
  /**
   * Cria uma nova transformação de IA
   */
  static async create({ memory_id, tipo, conteudo_original, conteudo_transformado, modelo_ia }) {
    const result = await pool.query(
      `INSERT INTO memory_ai_transformations (memory_id, tipo, conteudo_original, conteudo_transformado, modelo_ia) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [memory_id, tipo, conteudo_original, conteudo_transformado, modelo_ia]
    );
    return result.rows[0];
  }

  /**
   * Encontra transformações de uma memória específica
   */
  static async findByMemoryId(memory_id) {
    const result = await pool.query(
      `SELECT * FROM memory_ai_transformations 
       WHERE memory_id = $1 
       ORDER BY criado_em DESC`,
      [memory_id]
    );
    return result.rows;
  }

  /**
   * Encontra uma transformação específica
   */
  static async findById(id) {
    const result = await pool.query(
      `SELECT * FROM memory_ai_transformations 
       WHERE id = $1`,
      [id]
    );
    return result.rows[0];
  }

  /**
   * Encontra transformações por tipo
   */
  static async findByType(memory_id, tipo) {
    const result = await pool.query(
      `SELECT * FROM memory_ai_transformations 
       WHERE memory_id = $1 AND tipo = $2 
       ORDER BY criado_em DESC`,
      [memory_id, tipo]
    );
    return result.rows;
  }

  /**
   * Deleta uma transformação
   */
  static async delete(id) {
    await pool.query("DELETE FROM memory_ai_transformations WHERE id = $1", [id]);
    return { message: "Transformação deletada com sucesso" };
  }

  /**
   * Obtém todas as transformações de um usuário
   */
  static async findByUserId(user_id) {
    const result = await pool.query(
      `SELECT mat.* FROM memory_ai_transformations mat
       JOIN memories m ON mat.memory_id = m.id
       WHERE m.user_id = $1
       ORDER BY mat.criado_em DESC`,
      [user_id]
    );
    return result.rows;
  }
}

module.exports = MemoryAITransformation;
