/**
 * RPGSystem.ts
 * Sistema RPG: XP, níveis, stats e progressão
 */

import { Player } from '../entities/Player';
import { GAME_CONFIG } from '../constants/GameConfig';
import { logger } from '../utils/Logger';

export interface PlayerStats {
  level: number;
  experience: number;
  gold: number;
  strength: number;
  defense: number;
  vitality: number;
  hp: number;
  maxHp: number;
}

export class RPGSystem {
  /**
   * Calcular XP necessário para próximo nível
   */
  static getXPForLevel(level: number): number {
    return Math.floor(GAME_CONFIG.RPG.BASE_XP_FOR_LEVEL * Math.pow(GAME_CONFIG.RPG.XP_MULTIPLIER, level - 1));
  }

  /**
   * Calcular nível baseado em XP total
   */
  static calculateLevel(totalXP: number): number {
    let level = 1;
    let xpAccumulated = 0;

    while (true) {
      const xpForNextLevel = this.getXPForLevel(level);
      if (xpAccumulated + xpForNextLevel > totalXP) {
        break;
      }
      xpAccumulated += xpForNextLevel;
      level++;
    }

    return level;
  }

  /**
   * Obter XP atual do nível
   */
  static getXPInCurrentLevel(totalXP: number): number {
    let xpAccumulated = 0;
    let level = 1;

    while (true) {
      const xpForNextLevel = this.getXPForLevel(level);
      if (xpAccumulated + xpForNextLevel > totalXP) {
        break;
      }
      xpAccumulated += xpForNextLevel;
      level++;
    }

    return totalXP - xpAccumulated;
  }

  /**
   * Obter XP necessário para próximo nível
   */
  static getXPToNextLevel(totalXP: number): number {
    const level = this.calculateLevel(totalXP);
    return this.getXPForLevel(level);
  }

  /**
   * Aplicar ganho de XP
   */
  static applyXPGain(player: Player, xpAmount: number): void {
    const oldLevel = player.level;
    player.gainExperience(xpAmount);

    if (player.level > oldLevel) {
      logger.info(`Jogador subiu para nível ${player.level}!`);
    }
  }

  /**
   * Obter stats do jogador
   */
  static getPlayerStats(player: Player): PlayerStats {
    return {
      level: player.level,
      experience: player.experience,
      gold: player.gold,
      strength: player.strength,
      defense: player.defense,
      vitality: player.vitality,
      hp: player.hp,
      maxHp: player.maxHp,
    };
  }

  /**
   * Calcular dano total do jogador
   */
  static calculatePlayerDamage(player: Player): number {
    return player.getTotalDamage();
  }

  /**
   * Calcular defesa total do jogador
   */
  static calculatePlayerDefense(player: Player): number {
    return player.getTotalDefense();
  }

  /**
   * Calcular taxa de crítico
   */
  static calculateCritChance(player: Player): number {
    // 20% base + 1% por ponto de força (máximo 50%)
    return Math.min(0.5, 0.2 + player.strength * 0.01);
  }

  /**
   * Calcular multiplicador de crítico
   */
  static calculateCritMultiplier(player: Player): number {
    // 1.5x base + 0.1x por 10 pontos de força
    return 1.5 + Math.floor(player.strength / 10) * 0.1;
  }

  /**
   * Resetar progresso do jogador
   */
  static resetPlayer(player: Player): void {
    player.reset();
    logger.info('Progresso do jogador resetado');
  }

  /**
   * Salvar stats do jogador
   */
  static savePlayerStats(player: Player): PlayerStats {
    return this.getPlayerStats(player);
  }

  /**
   * Carregar stats do jogador
   */
  static loadPlayerStats(player: Player, stats: PlayerStats): void {
    player.level = stats.level;
    player.experience = stats.experience;
    player.gold = stats.gold;
    player.strength = stats.strength;
    player.defense = stats.defense;
    player.vitality = stats.vitality;
    player.hp = stats.hp;
    player.maxHp = stats.maxHp;
    logger.info('Stats do jogador carregados');
  }

  /**
   * Obter descrição de nível
   */
  static getLevelDescription(level: number): string {
    if (level <= 5) return 'Iniciante';
    if (level <= 10) return 'Aprendiz';
    if (level <= 20) return 'Guerreiro';
    if (level <= 30) return 'Campeão';
    if (level <= 50) return 'Lenda';
    return 'Imortal';
  }
}

export default RPGSystem;
