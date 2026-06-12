/**
 * GameEngine.ts
 * Motor principal do jogo - gerencia loop de jogo, atualização e renderização
 */

import { GAME_CONFIG } from '../constants/GameConfig';
import { GameState as GameStateEnum } from '../constants/Enums';
import { Player } from '../entities/Player';
import { Enemy } from '../entities/Enemy';
import { EnemyStone } from '../entities/EnemyStone';
import { Entity } from '../entities/Entity';
import { InputHandler } from './InputHandler';
import { Renderer } from './Renderer';
import { Physics } from './Physics';
import { GameState } from './GameState';
import { logger } from '../utils/Logger';
import { CombatSystem } from '../systems/CombatSystem';
import { AISystem } from '../systems/AISystem';
import { ParticleSystem } from '../systems/ParticleSystem';
import { AudioSystem } from '../systems/AudioSystem';
import { HUD } from '../ui/HUD';

export class GameEngine {
  private canvas: HTMLCanvasElement;
  private renderer: Renderer;
  private inputHandler: InputHandler;
  private physics: Physics;
  private gameState: GameState;

  private entities: Entity[] = [];
  private player: Player | null = null;
  private enemies: Enemy[] = [];
  private particleSystem: ParticleSystem = new ParticleSystem();
  private audioSystem: AudioSystem = new AudioSystem();

  private isRunning: boolean = false;
  private lastFrameTime: number = 0;
  private deltaTime: number = 0;

  private animationFrameId: number | null = null;

  constructor(canvasElement: HTMLCanvasElement) {
    this.canvas = canvasElement;
    this.renderer = new Renderer(canvasElement);
    this.inputHandler = new InputHandler();
    this.physics = new Physics();
    this.gameState = GameState.getInstance();

    logger.info('GameEngine inicializado');
  }

  /**
   * Iniciar jogo
   */
  start(): void {
    if (this.isRunning) return;

    this.isRunning = true;
    this.lastFrameTime = Date.now();

    logger.info('GameEngine iniciado');
    this.gameLoop();
  }

  /**
   * Parar jogo
   */
  stop(): void {
    this.isRunning = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    logger.info('GameEngine parado');
  }

  /**
   * Loop principal do jogo
   */
  private gameLoop = (): void => {
    if (!this.isRunning) return;

    // Calcular delta time
    const now = Date.now();
    this.deltaTime = Math.min(now - this.lastFrameTime, GAME_CONFIG.FRAME_TIME * 2);
    this.lastFrameTime = now;

    // Atualizar
    this.update(this.deltaTime);

    // Renderizar
    this.render();

    // Próximo frame
    this.animationFrameId = requestAnimationFrame(this.gameLoop);
  };

  /**
   * Atualizar lógica do jogo
   */
  private update(deltaTime: number): void {
    const state = this.gameState.getState();

    // Não atualizar se em menu ou pausado
    if (state === GameStateEnum.MENU || this.gameState.isPaused()) {
      return;
    }

    // Atualizar tempo total
    this.gameState.addTime(deltaTime);

    // Atualizar física
    this.physics.update(deltaTime);

    // Atualizar entidades
    for (const entity of this.entities) {
      if (!entity.isDead) {
        entity.update(deltaTime);
      }
    }

    // Atualizar partículas
    this.particleSystem.update(deltaTime);

    // Atualizar IA dos inimigos
    if (this.player) {
      AISystem.updateAllEnemiesAI(this.enemies, this.player);
    }

    // Processar combate
    if (this.player) {
      CombatSystem.processCombat(this.player, this.enemies);
    }

    // Processar colisões
    this.processCollisions();

    // Remover entidades mortas
    this.entities = this.entities.filter((entity) => !entity.isDead || entity === this.player);
    this.enemies = this.enemies.filter((enemy) => !enemy.isDead);

    // Atualizar câmera
    if (this.player) {
      const center = this.player.getCenter();
      const mapSize = this.renderer.getSize();
      this.renderer.updateCamera(center.x, center.y, mapSize.width * 2, mapSize.height * 2);
    }
  }

  /**
   * Processar colisões
   */
  private processCollisions(): void {
    const collisions = this.physics.getCollisions();

    for (const collision of collisions) {
      // Aqui será processado combate, coleta de itens, etc.
      // Por enquanto apenas separar entidades
      this.physics.resolveCollision(collision.entity1, collision.entity2);
    }
  }

  /**
   * Renderizar jogo
   */
  private render(): void {
    // Limpar canvas
    this.renderer.clear();

    // Desenhar fundo
    this.drawBackground();

    // Desenhar entidades
    for (const entity of this.entities) {
      entity.draw(this.renderer.getContext());
    }

    // Desenhar partículas
    this.particleSystem.draw(this.renderer.getContext());

    // Desenhar grid (debug)
    if (GAME_CONFIG.DEBUG.SHOW_GRID) {
      this.renderer.drawGrid();
    }

    // Desenhar HUD
    if (this.player) {
      HUD.draw(this.renderer.getContext(), this.player, this.enemies);
    }

    // Desenhar FPS
    if (GAME_CONFIG.DEBUG.SHOW_FPS) {
      this.renderer.updateFPS();
      this.renderer.drawFPS();
    }
  }

  /**
   * Desenhar fundo
   */
  private drawBackground(): void {
    const ctx = this.renderer.getContext();
    ctx.fillStyle = '#2d5016';
    ctx.fillRect(0, 0, this.renderer.getSize().width, this.renderer.getSize().height);
  }



  /**
   * Adicionar entidade
   */
  addEntity(entity: Entity): void {
    this.entities.push(entity);
    this.physics.addEntity(entity);

    if (entity instanceof Player) {
      this.player = entity;
      this.inputHandler.setPlayer(entity);
      this.gameState.setPlayer(entity);
    } else if (entity instanceof Enemy) {
      this.enemies.push(entity);
    }
  }

  /**
   * Remover entidade
   */
  removeEntity(entity: Entity): void {
    const index = this.entities.indexOf(entity);
    if (index > -1) {
      this.entities.splice(index, 1);
      this.physics.removeEntity(entity);
    }
  }

  /**
   * Obter jogador
   */
  getPlayer(): Player | null {
    return this.player;
  }

  /**
   * Obter entidades
   */
  getEntities(): Entity[] {
    return [...this.entities];
  }

  /**
   * Limpar todas as entidades
   */
  clearEntities(): void {
    this.entities = [];
    this.enemies = [];
    this.physics.clear();
    this.player = null;
  }

  /**
   * Obter inimigos
   */
  getEnemies(): Enemy[] {
    return [...this.enemies];
  }

  /**
   * Adicionar inimigo
   */
  addEnemy(enemy: Enemy): void {
    this.addEntity(enemy);
  }

  /**
   * Criar inimigos no mapa
   */
  spawnEnemies(count: number): void {
    for (let i = 0; i < count; i++) {
      const x = Math.random() * (GAME_CONFIG.CANVAS_WIDTH - 100) + 50;
      const y = Math.random() * (GAME_CONFIG.CANVAS_HEIGHT - 200) + 100;
      const enemy = new EnemyStone(x, y);
      this.addEnemy(enemy);
    }
    logger.info(`${count} inimigos criados`);
  }

  /**
   * Obter renderer
   */
  getRenderer(): Renderer {
    return this.renderer;
  }

  /**
   * Obter input handler
   */
  getInputHandler(): InputHandler {
    return this.inputHandler;
  }

  /**
   * Obter physics
   */
  getPhysics(): Physics {
    return this.physics;
  }

  /**
   * Destruir engine
   */
  destroy(): void {
    this.stop();
    this.clearEntities();
    this.inputHandler.destroy();
    this.renderer.destroy();
    logger.info('GameEngine destruído');
  }
}

export default GameEngine;
