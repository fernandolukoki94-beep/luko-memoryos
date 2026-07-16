const LifeEvent = require("./LifeEvent");

/**
 * Cria um novo evento de vida
 */
exports.createLifeEvent = async (req, res) => {
  const { ano, titulo, descricao, tipo, icone } = req.body;
  const user_id = req.user.id;

  try {
    // Validação básica
    if (!ano || !titulo) {
      return res.status(400).json({ 
        message: "Ano e título são obrigatórios" 
      });
    }

    const newEvent = await LifeEvent.create({
      user_id,
      ano,
      titulo,
      descricao,
      tipo,
      icone
    });

    res.status(201).json({
      message: "Evento de vida criado com sucesso",
      event: newEvent
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ 
      message: "Erro ao criar evento de vida",
      error: err.message 
    });
  }
};

/**
 * Obtém todos os eventos de vida de um usuário
 */
exports.getLifeEventsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const events = await LifeEvent.findByUserId(userId);
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ 
      message: "Erro ao buscar eventos de vida",
      error: err.message 
    });
  }
};

/**
 * Obtém um evento de vida específico
 */
exports.getLifeEventById = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await LifeEvent.findById(id);

    if (!event) {
      return res.status(404).json({ message: "Evento de vida não encontrado" });
    }

    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ 
      message: "Erro ao buscar evento de vida",
      error: err.message 
    });
  }
};

/**
 * Atualiza um evento de vida
 */
exports.updateLifeEvent = async (req, res) => {
  const { id } = req.params;
  const { ano, titulo, descricao, tipo, icone } = req.body;

  try {
    const event = await LifeEvent.findById(id);

    if (!event) {
      return res.status(404).json({ message: "Evento de vida não encontrado" });
    }

    // Verifica se o usuário é o dono
    if (event.user_id !== req.user.id) {
      return res.status(403).json({ message: "Acesso negado" });
    }

    const updatedEvent = await LifeEvent.update(id, {
      ano,
      titulo,
      descricao,
      tipo,
      icone
    });

    res.json({
      message: "Evento de vida atualizado com sucesso",
      event: updatedEvent
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ 
      message: "Erro ao atualizar evento de vida",
      error: err.message 
    });
  }
};

/**
 * Deleta um evento de vida
 */
exports.deleteLifeEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await LifeEvent.findById(id);

    if (!event) {
      return res.status(404).json({ message: "Evento de vida não encontrado" });
    }

    // Verifica se o usuário é o dono
    if (event.user_id !== req.user.id) {
      return res.status(403).json({ message: "Acesso negado" });
    }

    const result = await LifeEvent.delete(id);
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ 
      message: "Erro ao deletar evento de vida",
      error: err.message 
    });
  }
};

/**
 * Obtém a timeline completa de vida do usuário
 */
exports.getLifeTimeline = async (req, res) => {
  const { userId } = req.params;

  try {
    const timeline = await LifeEvent.getLifeTimeline(userId);
    res.json(timeline);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ 
      message: "Erro ao buscar timeline de vida",
      error: err.message 
    });
  }
};

/**
 * Obtém eventos de vida por tipo
 */
exports.getLifeEventsByType = async (req, res) => {
  const { userId, tipo } = req.params;

  try {
    const events = await LifeEvent.findByType(userId, tipo);
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ 
      message: "Erro ao buscar eventos de vida por tipo",
      error: err.message 
    });
  }
};

/**
 * Obtém estatísticas de eventos de vida
 */
exports.getLifeEventStats = async (req, res) => {
  const { userId } = req.params;

  try {
    const stats = await LifeEvent.countByType(userId);
    res.json(stats);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ 
      message: "Erro ao buscar estatísticas de eventos de vida",
      error: err.message 
    });
  }
};
