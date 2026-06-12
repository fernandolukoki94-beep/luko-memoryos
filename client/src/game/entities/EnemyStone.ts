/**
 * EnemyStone.ts
 * Inimigo específico: Monstro de Pedra
 */

import Enemy, { EnemyConfig } from './Enemy';
import { EnemyType, AIState } from '../constants/Enums';
import { GAME_CONFIG } from '../constants/GameConfig';
import { MathUtils } from '../utils/MathUtils';

export class EnemyStone extends Enemy {
  constructor(x: number, y: number) {
    const config: EnemyConfig = {
      x,
      y,
      width: GAME_CONFIG.ENEMY.STONE.WIDTH,
      height: GAME_CONFIG.ENEMY.STONE.HEIGHT,
      maxHp: GAME_CONFIG.ENEMY.STONE.MAX_HP,
      speed: GAME_CONFIG.ENEMY.STONE.SPEED,
      enemyType: EnemyType.STONE,
      attackCooldown: GAME_CONFIG.ENEMY.STONE.ATTACK_COOLDOWN,
      attackRange: GAME_CONFIG.ENEMY.STONE.ATTACK_RANGE,
      attackDamage: GAME_CONFIG.ENEMY.STONE.ATTACK_DAMAGE,
      detectionRange: GAME_CONFIG.ENEMY.STONE.DETECTION_RANGE,
      patrolDistance: GAME_CONFIG.ENEMY.STONE.PATROL_DISTANCE,
      xpReward: GAME_CONFIG.ENEMY.STONE.XP_REWARD,
      goldReward: GAME_CONFIG.ENEMY.STONE.GOLD_REWARD,
    };

    super(config);
  }

  /**
   * Atualizar IA do Monstro de Pedra
   */
  protected updateAI(deltaTime: number): void {
    // Será chamado pelo sistema de combate para atualizar comportamento
    // Por enquanto apenas patrulha
    this.patrol();
  }

  /**
   * Verificar se pode ver o jogador
   */
  canSeePlayer(playerX: number, playerY: number): boolean {
    const distance = MathUtils.distance(
      this.x + this.width / 2,
      this.y + this.height / 2,
      playerX + 16,
      playerY + 24
    );
    return distance <= this.detectionRange;
  }

  /**
   * Perseguir jogador
   */
  chasePlayer(playerX: number, playerY: number): void {
    this.chase(playerX, playerY);
  }

  /**
   * Verificar se pode atacar
   */
  canAttack(playerX: number, playerY: number): boolean {
    const distance = MathUtils.distance(
      this.x + this.width / 2,
      this.y + this.height / 2,
      playerX + 16,
      playerY + 24
    );
    return distance <= this.attackRange;
  }

  /**
   * Realizar ataque
   */
  performAttack(): number {
    if (this.attackTimer <= 0) {
      this.attackTimer = this.attackCooldown;
      return this.attackDamage;
    }
    return 0;
  }

  /**
   * Desenhar Monstro de Pedra
   */
  draw(ctx: CanvasRenderingContext2D): void {
    // Desenhar corpo de pedra
    ctx.fillStyle = '#808080';
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // Desenhar textura de pedra
    ctx.fillStyle = '#696969';
    ctx.fillRect(this.x + 5, this.y + 5, 8, 8);
    ctx.fillRect(this.x + 20, this.y + 10, 8, 8);
    ctx.fillRect(this.x + 10, this.y + 20, 8, 8);

    // Desenhar olhos
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(this.x + 8, this.y + 8, 4, 4);
    ctx.fillRect(this.x + 24, this.y + 8, 4, 4);

    // Desenhar barra de vida
    this.drawHealthBar(ctx);
  }
}

export default EnemyStone;
