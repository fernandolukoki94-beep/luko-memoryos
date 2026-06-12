/**
 * Entity.ts
 * Classe base para todas as entidades do jogo
 */

import { EntityType, AnimationState } from '../constants/Enums';
import { MathUtils } from '../utils/MathUtils';

export interface EntityConfig {
  x: number;
  y: number;
  width: number;
  height: number;
  maxHp: number;
  speed: number;
}

export class Entity {
  // Posição
  x: number;
  y: number;
  width: number;
  height: number;

  // Velocidade
  vx: number = 0;
  vy: number = 0;

  // Saúde
  hp: number;
  maxHp: number;
  isDead: boolean = false;

  // Movimento
  speed: number;

  // Animação
  animationState: AnimationState = AnimationState.IDLE;
  animationFrame: number = 0;
  animationTimer: number = 0;
  animationSpeed: number = 0.1;

  // Tipo
  type: EntityType = EntityType.OBSTACLE;

  // Knockback
  knockbackX: number = 0;
  knockbackY: number = 0;

  constructor(config: EntityConfig) {
    this.x = config.x;
    this.y = config.y;
    this.width = config.width;
    this.height = config.height;
    this.maxHp = config.maxHp;
    this.hp = config.maxHp;
    this.speed = config.speed;
  }

  /**
   * Atualizar entidade
   */
  update(deltaTime: number = 16.67): void {
    // Aplicar knockback
    this.x += this.knockbackX;
    this.y += this.knockbackY;
    this.knockbackX *= 0.9; // Decay
    this.knockbackY *= 0.9;

    // Atualizar animação
    this.updateAnimation(deltaTime);
  }

  /**
   * Desenhar entidade
   */
  draw(ctx: CanvasRenderingContext2D): void {
    // Desenhar retângulo de debug
    ctx.fillStyle = 'rgba(100, 200, 100, 0.5)';
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // Desenhar barra de vida
    this.drawHealthBar(ctx);
  }

  /**
   * Desenhar barra de vida
   */
  protected drawHealthBar(ctx: CanvasRenderingContext2D): void {
    const barWidth = this.width;
    const barHeight = 4;
    const barY = this.y - 8;

    // Background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(this.x, barY, barWidth, barHeight);

    // Health
    const healthPercent = this.hp / this.maxHp;
    const healthColor = healthPercent > 0.5 ? '#00ff00' : healthPercent > 0.25 ? '#ffff00' : '#ff0000';
    ctx.fillStyle = healthColor;
    ctx.fillRect(this.x, barY, barWidth * healthPercent, barHeight);

    // Border
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.strokeRect(this.x, barY, barWidth, barHeight);
  }

  /**
   * Atualizar animação
   */
  protected updateAnimation(deltaTime: number): void {
    this.animationTimer += deltaTime;
    if (this.animationTimer >= this.animationSpeed * 1000) {
      this.animationFrame++;
      this.animationTimer = 0;
    }
  }

  /**
   * Receber dano
   */
  takeDamage(damage: number, knockbackX: number = 0, knockbackY: number = 0): void {
    this.hp = MathUtils.clamp(this.hp - damage, 0, this.maxHp);
    this.knockbackX = knockbackX;
    this.knockbackY = knockbackY;

    if (this.hp <= 0) {
      this.die();
    }
  }

  /**
   * Curar
   */
  heal(amount: number): void {
    this.hp = MathUtils.clamp(this.hp + amount, 0, this.maxHp);
  }

  /**
   * Morrer
   */
  die(): void {
    this.isDead = true;
    this.animationState = AnimationState.DEAD;
  }

  /**
   * Verificar colisão com outra entidade
   */
  isCollidingWith(other: Entity): boolean {
    return MathUtils.isColliding(this.x, this.y, this.width, this.height, other.x, other.y, other.width, other.height);
  }

  /**
   * Obter centro da entidade
   */
  getCenter(): { x: number; y: number } {
    return {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2,
    };
  }

  /**
   * Obter distância até outra entidade
   */
  getDistanceTo(other: Entity): number {
    const center1 = this.getCenter();
    const center2 = other.getCenter();
    return MathUtils.distance(center1.x, center1.y, center2.x, center2.y);
  }

  /**
   * Obter ângulo até outra entidade
   */
  getAngleTo(other: Entity): number {
    const center1 = this.getCenter();
    const center2 = other.getCenter();
    return MathUtils.angle(center1.x, center1.y, center2.x, center2.y);
  }

  /**
   * Resetar estado
   */
  reset(): void {
    this.hp = this.maxHp;
    this.isDead = false;
    this.vx = 0;
    this.vy = 0;
    this.knockbackX = 0;
    this.knockbackY = 0;
    this.animationState = AnimationState.IDLE;
    this.animationFrame = 0;
    this.animationTimer = 0;
  }
}

export default Entity;
