/**
 * Enemy.ts
 * Classe base para inimigos
 */

import Entity, { EntityConfig } from './Entity';
import { EntityType, AIState, EnemyType, AnimationState } from '../constants/Enums';
import { MathUtils } from '../utils/MathUtils';

export interface EnemyConfig extends EntityConfig {
  enemyType: EnemyType;
  attackCooldown?: number;
  attackRange?: number;
  attackDamage?: number;
  detectionRange?: number;
  patrolDistance?: number;
  xpReward?: number;
  goldReward?: number;
}

export class Enemy extends Entity {
  // Tipo de inimigo
  enemyType: EnemyType;

  // Ataque
  attackCooldown: number;
  attackTimer: number = 0;
  attackRange: number;
  attackDamage: number;

  // IA
  aiState: AIState = AIState.IDLE;
  detectionRange: number;
  patrolDistance: number;
  patrolStartX: number;
  patrolStartY: number;

  // Alvo
  targetX: number;
  targetY: number;

  // Recompensas
  xpReward: number;
  goldReward: number;

  constructor(config: EnemyConfig) {
    super(config);
    this.type = EntityType.ENEMY;
    this.enemyType = config.enemyType;
    this.attackCooldown = config.attackCooldown || 1000;
    this.attackRange = config.attackRange || 60;
    this.attackDamage = config.attackDamage || 10;
    this.detectionRange = config.detectionRange || 200;
    this.patrolDistance = config.patrolDistance || 150;
    this.xpReward = config.xpReward || 50;
    this.goldReward = config.goldReward || 25;

    // Inicializar patrulha
    this.patrolStartX = config.x;
    this.patrolStartY = config.y;
    this.targetX = config.x;
    this.targetY = config.y;
  }

  /**
   * Atualizar inimigo
   */
  update(deltaTime: number = 16.67): void {
    if (this.isDead) {
      super.update(deltaTime);
      return;
    }

    // Reduzir cooldown de ataque
    if (this.attackTimer > 0) {
      this.attackTimer -= deltaTime;
    }

    // Atualizar IA
    this.updateAI(deltaTime);

    // Atualizar animação
    this.updateEnemyAnimation(deltaTime);

    // Chamar update da classe base
    super.update(deltaTime);
  }

  /**
   * Atualizar IA do inimigo
   */
  protected updateAI(deltaTime: number): void {
    // Será implementado nas subclasses
    this.patrol();
  }

  /**
   * Patrulhar
   */
  protected patrol(): void {
    // Mover em direção ao alvo de patrulha
    const dx = this.targetX - this.x;
    const dy = this.targetY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 5) {
      const nx = dx / distance;
      this.vx = nx * this.speed;
    } else {
      // Escolher novo ponto de patrulha
      const randomAngle = Math.random() * Math.PI * 2;
      const randomDistance = Math.random() * this.patrolDistance;
      this.targetX = this.patrolStartX + Math.cos(randomAngle) * randomDistance;
      this.targetY = this.patrolStartY + Math.sin(randomAngle) * randomDistance;
    }

    this.aiState = AIState.PATROL;
  }

  /**
   * Perseguir alvo
   */
  protected chase(targetX: number, targetY: number): void {
    const dx = targetX - this.x;
    const dy = targetY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 0) {
      const nx = dx / distance;
      const ny = dy / distance;
      this.vx = nx * this.speed;
      this.vy = ny * this.speed * 0.5; // Movimento vertical reduzido
    }

    this.aiState = AIState.CHASE;
  }

  /**
   * Atacar
   */
  protected attack(): void {
    if (this.attackTimer <= 0) {
      this.animationState = AnimationState.ATTACK;
      this.attackTimer = this.attackCooldown;
      this.aiState = AIState.ATTACK;
    }
  }

  /**
   * Atualizar animação do inimigo
   */
  protected updateEnemyAnimation(deltaTime: number): void {
    if (this.isDead) {
      this.animationState = AnimationState.DEAD;
      return;
    }

    if (this.vx !== 0) {
      this.animationState = AnimationState.WALK;
    } else {
      this.animationState = AnimationState.IDLE;
    }

    super.updateAnimation(deltaTime);
  }

  /**
   * Desenhar inimigo
   */
  draw(ctx: CanvasRenderingContext2D): void {
    // Desenhar corpo do inimigo (será substituído por sprite)
    ctx.fillStyle = '#8b7355';
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // Desenhar barra de vida
    this.drawHealthBar(ctx);

    // Desenhar raio de detecção em debug
    ctx.strokeStyle = 'rgba(255, 100, 100, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.detectionRange, 0, Math.PI * 2);
    ctx.stroke();
  }

  /**
   * Obter dados para save
   */
  getSaveData(): any {
    return {
      x: this.x,
      y: this.y,
      hp: this.hp,
      maxHp: this.maxHp,
      enemyType: this.enemyType,
    };
  }
}

export default Enemy;
