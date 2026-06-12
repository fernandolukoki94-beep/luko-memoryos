/**
 * SaveSystem.ts
 * Sistema de save e load do jogo
 */

import { Player } from '../entities/Player';
import { GameState } from '../core/GameState';
import { logger } from './Logger';

export interface SaveData {
  version: number;
  timestamp: number;
  player: any;
  gameState: any;
}

export class SaveSystem {
  private static readonly SAVE_KEY_PREFIX = 'fernando_lukoki_save_';
  private static readonly MAX_SAVE_SLOTS = 3;
  private static readonly CURRENT_VERSION = 1;

  /**
   * Salvar jogo em slot específico
   */
  static saveGame(slot: number, player: Player, gameState: GameState): boolean {
    if (slot < 0 || slot >= this.MAX_SAVE_SLOTS) {
      logger.error(`Slot de save inválido: ${slot}`);
      return false;
    }

    try {
      const saveData: SaveData = {
        version: this.CURRENT_VERSION,
        timestamp: Date.now(),
        player: player.getSaveData(),
        gameState: gameState.getFullState(),
      };

      const key = this.SAVE_KEY_PREFIX + slot;
      localStorage.setItem(key, JSON.stringify(saveData));

      logger.info(`Jogo salvo no slot ${slot}`);
      return true;
    } catch (error) {
      logger.error(`Erro ao salvar jogo: ${error}`);
      return false;
    }
  }

  /**
   * Carregar jogo de slot específico
   */
  static loadGame(slot: number): SaveData | null {
    if (slot < 0 || slot >= this.MAX_SAVE_SLOTS) {
      logger.error(`Slot de save inválido: ${slot}`);
      return null;
    }

    try {
      const key = this.SAVE_KEY_PREFIX + slot;
      const data = localStorage.getItem(key);

      if (!data) {
        logger.warn(`Nenhum save encontrado no slot ${slot}`);
        return null;
      }

      const saveData: SaveData = JSON.parse(data);

      // Verificar versão
      if (saveData.version !== this.CURRENT_VERSION) {
        logger.warn(`Save de versão diferente: ${saveData.version}`);
      }

      logger.info(`Jogo carregado do slot ${slot}`);
      return saveData;
    } catch (error) {
      logger.error(`Erro ao carregar jogo: ${error}`);
      return null;
    }
  }

  /**
   * Deletar save de slot específico
   */
  static deleteSave(slot: number): boolean {
    if (slot < 0 || slot >= this.MAX_SAVE_SLOTS) {
      logger.error(`Slot de save inválido: ${slot}`);
      return false;
    }

    try {
      const key = this.SAVE_KEY_PREFIX + slot;
      localStorage.removeItem(key);

      logger.info(`Save do slot ${slot} deletado`);
      return true;
    } catch (error) {
      logger.error(`Erro ao deletar save: ${error}`);
      return false;
    }
  }

  /**
   * Obter informações de todos os saves
   */
  static getAllSaves(): Array<{ slot: number; data: SaveData | null }> {
    const saves = [];

    for (let i = 0; i < this.MAX_SAVE_SLOTS; i++) {
      const data = this.loadGame(i);
      saves.push({ slot: i, data });
    }

    return saves;
  }

  /**
   * Verificar se slot tem save
   */
  static hasSave(slot: number): boolean {
    const key = this.SAVE_KEY_PREFIX + slot;
    return localStorage.getItem(key) !== null;
  }

  /**
   * Obter número de saves
   */
  static getSaveCount(): number {
    let count = 0;
    for (let i = 0; i < this.MAX_SAVE_SLOTS; i++) {
      if (this.hasSave(i)) {
        count++;
      }
    }
    return count;
  }

  /**
   * Limpar todos os saves
   */
  static clearAllSaves(): boolean {
    try {
      for (let i = 0; i < this.MAX_SAVE_SLOTS; i++) {
        this.deleteSave(i);
      }
      logger.info('Todos os saves foram deletados');
      return true;
    } catch (error) {
      logger.error(`Erro ao limpar saves: ${error}`);
      return false;
    }
  }

  /**
   * Exportar save como JSON
   */
  static exportSave(slot: number): string | null {
    const saveData = this.loadGame(slot);
    if (!saveData) return null;

    return JSON.stringify(saveData, null, 2);
  }

  /**
   * Importar save de JSON
   */
  static importSave(slot: number, jsonData: string): boolean {
    try {
      const saveData: SaveData = JSON.parse(jsonData);

      if (!saveData.version || !saveData.player || !saveData.gameState) {
        logger.error('Formato de save inválido');
        return false;
      }

      const key = this.SAVE_KEY_PREFIX + slot;
      localStorage.setItem(key, JSON.stringify(saveData));

      logger.info(`Save importado para slot ${slot}`);
      return true;
    } catch (error) {
      logger.error(`Erro ao importar save: ${error}`);
      return false;
    }
  }

  /**
   * Auto-save
   */
  static autoSave(player: Player, gameState: GameState): boolean {
    // Usar slot 0 para auto-save
    return this.saveGame(0, player, gameState);
  }
}

export default SaveSystem;
