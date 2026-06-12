/**
 * QuestSystem.ts
 * Sistema de missões do jogo
 */

import { QuestStatus } from '../constants/Enums';
import { logger } from '../utils/Logger';

export interface Quest {
  id: string;
  name: string;
  description: string;
  status: QuestStatus;
  objective: string;
  reward: {
    xp: number;
    gold: number;
    items?: string[];
  };
  progress: number;
  maxProgress: number;
}

export class QuestSystem {
  private quests: Quest[] = [];
  private activeQuests: Quest[] = [];

  constructor() {
    this.initializeQuests();
  }

  /**
   * Inicializar missões
   */
  private initializeQuests(): void {
    // Missão 1: Derrotar 5 inimigos
    this.addQuest({
      id: 'quest_001',
      name: 'Os Primeiros Passos',
      description: 'Derrote 5 monstros de pedra para provar seu valor',
      status: QuestStatus.AVAILABLE,
      objective: 'Derrotar 5 monstros de pedra',
      reward: { xp: 200, gold: 100 },
      progress: 0,
      maxProgress: 5,
    });

    // Missão 2: Explorar ruínas
    this.addQuest({
      id: 'quest_002',
      name: 'Explorador das Ruínas',
      description: 'Explore as ruínas antigas e descubra seus segredos',
      status: QuestStatus.AVAILABLE,
      objective: 'Alcançar o final das ruínas',
      reward: { xp: 300, gold: 150 },
      progress: 0,
      maxProgress: 1,
    });

    // Missão 3: Derrotar o boss final
    this.addQuest({
      id: 'quest_003',
      name: 'O Confronto Final',
      description: 'Derrote o grande mal no templo sagrado',
      status: QuestStatus.AVAILABLE,
      objective: 'Derrotar o boss final',
      reward: { xp: 500, gold: 300 },
      progress: 0,
      maxProgress: 1,
    });

    logger.info(`${this.quests.length} missões carregadas`);
  }

  /**
   * Adicionar missão
   */
  addQuest(quest: Quest): void {
    this.quests.push(quest);
  }

  /**
   * Ativar missão
   */
  activateQuest(questId: string): boolean {
    const quest = this.quests.find((q) => q.id === questId);

    if (!quest) {
      logger.warn(`Missão não encontrada: ${questId}`);
      return false;
    }

    if (quest.status !== QuestStatus.AVAILABLE) {
      logger.warn(`Missão não está disponível: ${questId}`);
      return false;
    }

    quest.status = QuestStatus.ACTIVE;
    this.activeQuests.push(quest);
    logger.info(`Missão ativada: ${quest.name}`);
    return true;
  }

  /**
   * Completar missão
   */
  completeQuest(questId: string): boolean {
    const quest = this.quests.find((q) => q.id === questId);

    if (!quest) {
      logger.warn(`Missão não encontrada: ${questId}`);
      return false;
    }

    if (quest.status !== QuestStatus.ACTIVE) {
      logger.warn(`Missão não está ativa: ${questId}`);
      return false;
    }

    quest.status = QuestStatus.COMPLETED;
    const index = this.activeQuests.indexOf(quest);
    if (index > -1) {
      this.activeQuests.splice(index, 1);
    }

    logger.info(`Missão completada: ${quest.name}`);
    return true;
  }

  /**
   * Falhar missão
   */
  failQuest(questId: string): boolean {
    const quest = this.quests.find((q) => q.id === questId);

    if (!quest) {
      logger.warn(`Missão não encontrada: ${questId}`);
      return false;
    }

    quest.status = QuestStatus.FAILED;
    const index = this.activeQuests.indexOf(quest);
    if (index > -1) {
      this.activeQuests.splice(index, 1);
    }

    logger.info(`Missão falhou: ${quest.name}`);
    return true;
  }

  /**
   * Atualizar progresso da missão
   */
  updateQuestProgress(questId: string, progress: number): void {
    const quest = this.quests.find((q) => q.id === questId);

    if (!quest) return;

    quest.progress = Math.min(progress, quest.maxProgress);

    if (quest.progress >= quest.maxProgress) {
      this.completeQuest(questId);
    }
  }

  /**
   * Obter missão
   */
  getQuest(questId: string): Quest | null {
    return this.quests.find((q) => q.id === questId) || null;
  }

  /**
   * Obter todas as missões
   */
  getAllQuests(): Quest[] {
    return [...this.quests];
  }

  /**
   * Obter missões ativas
   */
  getActiveQuests(): Quest[] {
    return [...this.activeQuests];
  }

  /**
   * Obter missões completadas
   */
  getCompletedQuests(): Quest[] {
    return this.quests.filter((q) => q.status === QuestStatus.COMPLETED);
  }

  /**
   * Obter missões disponíveis
   */
  getAvailableQuests(): Quest[] {
    return this.quests.filter((q) => q.status === QuestStatus.AVAILABLE);
  }

  /**
   * Obter dados para save
   */
  getSaveData(): Quest[] {
    return JSON.parse(JSON.stringify(this.quests));
  }

  /**
   * Carregar dados
   */
  loadSaveData(data: Quest[]): void {
    this.quests = JSON.parse(JSON.stringify(data));
    this.activeQuests = this.quests.filter((q) => q.status === QuestStatus.ACTIVE);
    logger.info(`Missões carregadas: ${this.quests.length}`);
  }
}

export default QuestSystem;
