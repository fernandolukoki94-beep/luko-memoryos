/**
 * GameState.ts
 * Gerenciador de estado global do jogo
 */

import { GameState as GameStateEnum, MapType } from '../constants/Enums';
import { Player } from '../entities/Player';
import { logger } from '../utils/Logger';

export interface GameStateData {
  currentState: GameStateEnum;
  currentMap: MapType;
  player: Player | null;
  isPaused: boolean;
  difficulty: 'easy' | 'normal' | 'hard';
  totalTime: number;
  saveSlot: number | null;
}

export class GameState {
  private static instance: GameState;
  private state: GameStateData;
  private listeners: Map<string, Function[]> = new Map();

  private constructor() {
    this.state = {
      currentState: GameStateEnum.MENU,
      currentMap: MapType.FOREST,
      player: null,
      isPaused: false,
      difficulty: 'normal',
      totalTime: 0,
      saveSlot: null,
    };
  }

  /**
   * Obter instância singleton
   */
  static getInstance(): GameState {
    if (!GameState.instance) {
      GameState.instance = new GameState();
    }
    return GameState.instance;
  }

  /**
   * Obter estado atual
   */
  getState(): GameStateEnum {
    return this.state.currentState;
  }

  /**
   * Definir estado
   */
  setState(newState: GameStateEnum): void {
    const oldState = this.state.currentState;
    this.state.currentState = newState;
    this.emit('stateChanged', { oldState, newState });
    logger.info(`Estado alterado: ${oldState} -> ${newState}`);
  }

  /**
   * Obter mapa atual
   */
  getCurrentMap(): MapType {
    return this.state.currentMap;
  }

  /**
   * Definir mapa atual
   */
  setCurrentMap(map: MapType): void {
    const oldMap = this.state.currentMap;
    this.state.currentMap = map;
    this.emit('mapChanged', { oldMap, newMap: map });
    logger.info(`Mapa alterado: ${oldMap} -> ${map}`);
  }

  /**
   * Obter jogador
   */
  getPlayer(): Player | null {
    return this.state.player;
  }

  /**
   * Definir jogador
   */
  setPlayer(player: Player | null): void {
    this.state.player = player;
    this.emit('playerChanged', { player });
  }

  /**
   * Verificar se está pausado
   */
  isPaused(): boolean {
    return this.state.isPaused;
  }

  /**
   * Pausar jogo
   */
  pause(): void {
    this.state.isPaused = true;
    this.emit('paused');
    logger.info('Jogo pausado');
  }

  /**
   * Retomar jogo
   */
  resume(): void {
    this.state.isPaused = false;
    this.emit('resumed');
    logger.info('Jogo retomado');
  }

  /**
   * Obter dificuldade
   */
  getDifficulty(): 'easy' | 'normal' | 'hard' {
    return this.state.difficulty;
  }

  /**
   * Definir dificuldade
   */
  setDifficulty(difficulty: 'easy' | 'normal' | 'hard'): void {
    this.state.difficulty = difficulty;
    this.emit('difficultyChanged', { difficulty });
    logger.info(`Dificuldade alterada: ${difficulty}`);
  }

  /**
   * Obter tempo total
   */
  getTotalTime(): number {
    return this.state.totalTime;
  }

  /**
   * Adicionar tempo
   */
  addTime(deltaTime: number): void {
    this.state.totalTime += deltaTime;
  }

  /**
   * Resetar tempo
   */
  resetTime(): void {
    this.state.totalTime = 0;
  }

  /**
   * Obter slot de save
   */
  getSaveSlot(): number | null {
    return this.state.saveSlot;
  }

  /**
   * Definir slot de save
   */
  setSaveSlot(slot: number | null): void {
    this.state.saveSlot = slot;
  }

  /**
   * Obter dados completos do estado
   */
  getFullState(): GameStateData {
    return { ...this.state };
  }

  /**
   * Resetar estado
   */
  reset(): void {
    this.state = {
      currentState: GameStateEnum.MENU,
      currentMap: MapType.FOREST,
      player: null,
      isPaused: false,
      difficulty: 'normal',
      totalTime: 0,
      saveSlot: null,
    };
    this.emit('stateReset');
    logger.info('Estado resetado');
  }

  /**
   * Registrar listener de evento
   */
  on(event: string, callback: Function): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
  }

  /**
   * Remover listener de evento
   */
  off(event: string, callback: Function): void {
    if (!this.listeners.has(event)) return;
    const callbacks = this.listeners.get(event)!;
    const index = callbacks.indexOf(callback);
    if (index > -1) {
      callbacks.splice(index, 1);
    }
  }

  /**
   * Emitir evento
   */
  private emit(event: string, data?: any): void {
    if (!this.listeners.has(event)) return;
    const callbacks = this.listeners.get(event)!;
    callbacks.forEach((callback) => callback(data));
  }
}

export default GameState;
