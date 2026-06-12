/**
 * InputHandler.ts
 * Gerenciador de entrada de teclado e mouse
 */

import { Player } from '../entities/Player';
import { logger } from '../utils/Logger';

export class InputHandler {
  private player: Player | null = null;
  private keys: Map<string, boolean> = new Map();
  private mousePos: { x: number; y: number } = { x: 0, y: 0 };
  private mouseDown: boolean = false;

  constructor() {
    this.setupEventListeners();
  }

  /**
   * Configurar listeners de eventos
   */
  private setupEventListeners(): void {
    // Teclado
    window.addEventListener('keydown', (e) => this.handleKeyDown(e));
    window.addEventListener('keyup', (e) => this.handleKeyUp(e));

    // Mouse
    window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    window.addEventListener('mousedown', (e) => this.handleMouseDown(e));
    window.addEventListener('mouseup', (e) => this.handleMouseUp(e));

    logger.debug('InputHandler inicializado');
  }

  /**
   * Lidar com tecla pressionada
   */
  private handleKeyDown(event: KeyboardEvent): void {
    const key = event.key.toLowerCase();
    this.keys.set(key, true);

    // Atualizar entrada do jogador
    if (this.player) {
      this.updatePlayerInput();
    }
  }

  /**
   * Lidar com tecla liberada
   */
  private handleKeyUp(event: KeyboardEvent): void {
    const key = event.key.toLowerCase();
    this.keys.set(key, false);

    // Atualizar entrada do jogador
    if (this.player) {
      this.updatePlayerInput();
    }
  }

  /**
   * Lidar com movimento do mouse
   */
  private handleMouseMove(event: MouseEvent): void {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      this.mousePos = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    }
  }

  /**
   * Lidar com clique do mouse
   */
  private handleMouseDown(event: MouseEvent): void {
    this.mouseDown = true;
    if (this.player) {
      this.player.inputAttack = true;
    }
  }

  /**
   * Lidar com liberação do mouse
   */
  private handleMouseUp(event: MouseEvent): void {
    this.mouseDown = false;
    if (this.player) {
      this.player.inputAttack = false;
    }
  }

  /**
   * Atualizar entrada do jogador
   */
  private updatePlayerInput(): void {
    if (!this.player) return;

    // Movimento horizontal
    this.player.inputLeft = this.isKeyPressed('a') || this.isKeyPressed('arrowleft');
    this.player.inputRight = this.isKeyPressed('d') || this.isKeyPressed('arrowright');

    // Pulo
    this.player.inputJump = this.isKeyPressed(' ');

    // Ataque (mouse já é tratado em handleMouseDown/Up)
  }

  /**
   * Verificar se tecla está pressionada
   */
  isKeyPressed(key: string): boolean {
    return this.keys.get(key.toLowerCase()) || false;
  }

  /**
   * Obter posição do mouse
   */
  getMousePosition(): { x: number; y: number } {
    return { ...this.mousePos };
  }

  /**
   * Verificar se mouse está pressionado
   */
  isMouseDown(): boolean {
    return this.mouseDown;
  }

  /**
   * Definir jogador para receber entrada
   */
  setPlayer(player: Player): void {
    this.player = player;
    logger.info('Jogador definido para InputHandler');
  }

  /**
   * Limpar entrada
   */
  clear(): void {
    this.keys.clear();
    this.mouseDown = false;
    if (this.player) {
      this.player.inputLeft = false;
      this.player.inputRight = false;
      this.player.inputJump = false;
      this.player.inputAttack = false;
    }
  }

  /**
   * Destruir InputHandler
   */
  destroy(): void {
    this.clear();
    window.removeEventListener('keydown', (e) => this.handleKeyDown(e));
    window.removeEventListener('keyup', (e) => this.handleKeyUp(e));
    window.removeEventListener('mousemove', (e) => this.handleMouseMove(e));
    window.removeEventListener('mousedown', (e) => this.handleMouseDown(e));
    window.removeEventListener('mouseup', (e) => this.handleMouseUp(e));
    logger.debug('InputHandler destruído');
  }
}

export default InputHandler;
