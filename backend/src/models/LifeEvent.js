const pool = require("../config/db");

class LifeEvent {
  /**
   * Cria um novo evento de vida
   */
  static async create({ user_id, ano, titulo, descricao, tipo, icone }) {
    const result = await pool.query(
      `INSERT INTO life_events (user_id, ano, titulo, descricao, tipo, icone) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [user_id, ano, titulo, descricao, tipo, icone]
    );
    return result.rows[0];
  }

  /**
   * Encontra todos os eventos de vida de um usuário, ordenados por ano
   */
  static async findByUserId(user_id) {
    const result = await pool.query(
      `SELECT * FROM life_events 
       WHERE user_id = $1 
       ORDER BY ano ASC`,
      [user_id]
    );
    return result.rows;
  }

  /**
   * Encontra um evento de vida específico
   */
  static async findById(id) {
    const result = await pool.query(
      `SELECT * FROM life_events 
       WHERE id = $1`,
      [id]
    );
    return result.rows[0];
  }

  /**
   * Atualiza um evento de vida
   */
  static async update(id, { ano, titulo, descricao, tipo, icone }) {
    const result = await pool.query(
      `UPDATE life_events 
       SET ano = $1, titulo = $2, descricao = $3, tipo = $4, icone = $5, atualizado_em = CURRENT_TIMESTAMP
       WHERE id = $6 
       RETURNING *`,
      [ano, titulo, descricao, tipo, icone, id]
    );
    return result.rows[0];
  }

  /**
   * Deleta um evento de vida
   */
  static async delete(id) {
    await pool.query("DELETE FROM life_events WHERE id = $1", [id]);
    return { message: "Evento de vida deletado com sucesso" };
  }

  /**
   * Encontra eventos de vida por tipo
   */
  static async findByType(user_id, tipo) {
    const result = await pool.query(
      `SELECT * FROM life_events 
       WHERE user_id = $1 AND tipo = $2 
       ORDER BY ano ASC`,
      [user_id, tipo]
    );
    return result.rows;
  }

  /**
   * Obtém a timeline de vida do usuário com eventos e memórias
   */
  static async getLifeTimeline(user_id) {
    const result = await pool.query(
      `SELECT 
        'event' as tipo_item,
        id,
        ano as ano_item,
        titulo,
        descricao,
        tipo,
        icone,
        NULL as emocao,
        NULL as local,
        criado_em
       FROM life_events
       WHERE user_id = $1
       
       UNION ALL
       
       SELECT 
        'memory' as tipo_item,
        id,
        EXTRACT(YEAR FROM data)::INTEGER as ano_item,
        titulo,
        descricao,
        NULL as tipo,
        NULL as icone,
        emocao,
        local,
        criado_em
       FROM memories
       WHERE user_id = $1 AND privacidade = 'publica'
       
       ORDER BY ano_item ASC, criado_em DESC`,
      [user_id]
    );
    return result.rows;
  }

  /**
   * Conta eventos por tipo
   */
  static async countByType(user_id) {
    const result = await pool.query(
      `SELECT tipo, COUNT(*) as count 
       FROM life_events 
       WHERE user_id = $1 
       GROUP BY tipo`,
      [user_id]
    );
    return result.rows;
  }
}

module.exports = LifeEvent;
