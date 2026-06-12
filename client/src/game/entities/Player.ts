/**
 * Player.ts
 * Classe do personagem principal - Fernando Lukoki
 */

import Entity, { EntityConfig } from './Entity';
import { EntityType, AnimationState, Direction } from '../constants/Enums';
import { GAME_CONFIG } from '../constants/GameConfig';
import { MathUtils } from '../utils/MathUtils';

export interface PlayerConfig extends EntityConfig {
  jumpPower?: number;
  acceleration?: number;
  attackCooldown?: number;
  attackRange?: number;
  attackDamage?: number;
}

export class Player extends Entity {
  // Movimento
  jumpPower: number;
  acceleration: number;
  isGrounded: boolean = false;
  isJumping: boolean = false;

  // Ataque
  attackCooldown: number;
  attackTimer: number = 0;
  attackRange: number;
  attackDamage: number;
  isAttacking: boolean = false;

  // Direção
  direction: Direction = Direction.RIGHT;
  facingRight: boolean = true;

  // Stats RPG
  level: number = 1;
  experience: number = 0;
  gold: number = 0;
  strength: number = 10;
  defense: number = 5;
  vitality: number = 10;

  // Controles
  inputLeft: boolean = false;
  inputRight: boolean = false;
  inputJump: boolean = false;
  inputAttack: boolean = false;

  constructor(config: PlayerConfig) {
    super(config);
    this.type = EntityType.PLAYER;
    this.jumpPower = config.jumpPower || GAME_CONFIG.PLAYER.JUMP_POWER;
    this.acceleration = config.acceleration || GAME_CONFIG.PLAYER.ACCELERATION;
    this.attackCooldown = config.attackCooldown || GAME_CONFIG.PLAYER.ATTACK_COOLDOWN;
    this.attackRange = config.attackRange || GAME_CONFIG.PLAYER.ATTACK_RANGE;
    this.attackDamage = config.attackDamage || GAME_CONFIG.PLAYER.ATTACK_DAMAGE;
  }

  /**
   * Atualizar jogador
   */
  update(deltaTime: number = 16.67): void {
    if (this.isDead) {
      super.update(deltaTime);
      return;
    }

    // Aplicar gravidade
    this.vy += GAME_CONFIG.GRAVITY;
    this.vy = MathUtils.clamp(this.vy, -this.jumpPower, 20);

    // Movimento horizontal
    this.updateHorizontalMovement(deltaTime);

    // Pulo
    this.updateJump(deltaTime);

    // Ataque
    this.updateAttack(deltaTime);

    // Atualizar animação
    this.updatePlayerAnimation(deltaTime);

    // Chamar update da classe base
    super.update(deltaTime);
  }

  /**
   * Atualizar movimento horizontal
   */
  private updateHorizontalMovement(deltaTime: number): void {
    let targetVx = 0;

    if (this.inputLeft) {
      targetVx = -this.speed;
      this.facingRight = false;
      this.direction = Direction.LEFT;
    } else if (this.inputRight) {
      targetVx = this.speed;
      this.facingRight = true;
      this.direction = Direction.RIGHT;
    } else {
      this.direction = Direction.IDLE;
    }

    // Suavizar aceleração
    this.vx += (targetVx - this.vx) * this.acceleration;

    // Aplicar movimento
    this.x += this.vx;
  }

  /**
   * Atualizar pulo
   */
  private updateJump(deltaTime: number): void {
    // Verificar se está no chão (simplificado - em um jogo real usaria colisão)
    if (this.y + this.height >= GAME_CONFIG.CANVAS_HEIGHT - 50) {
      this.isGrounded = true;
      this.y = GAME_CONFIG.CANVAS_HEIGHT - 50 - this.height;
      this.vy = 0;
    } else {
      this.isGrounded = false;
    }

    // Pular
    if (this.inputJump && this.isGrounded) {
      this.vy = -this.jumpPower;
      this.isJumping = true;
      this.isGrounded = false;
    }

    // Aplicar movimento vertical
    this.y += this.vy;
  }

  /**
   * Atualizar ataque
   */
  private updateAttack(deltaTime: number): void {
    // Reduzir cooldown de ataque
    if (this.attackTimer > 0) {
      this.attackTimer -= deltaTime;
    }

    // Executar ataque
    if (this.inputAttack && this.attackTimer <= 0) {
      this.attack();
      this.attackTimer = this.attackCooldown;
      this.isAttacking = true;
    } else {
      this.isAttacking = false;
    }
  }

  /**
   * Executar ataque
   */
  attack(): void {
    // Aqui será processado o ataque (colisão com inimigos)
    this.animationState = AnimationState.ATTACK;
    this.animationFrame = 0;
    this.animationTimer = 0;
  }

  /**
   * Atualizar animação do jogador
   */
  private updatePlayerAnimation(deltaTime: number): void {
    if (this.isDead) {
      this.animationState = AnimationState.DEAD;
      return;
    }

    if (this.isAttacking) {
      this.animationState = AnimationState.ATTACK;
    } else if (!this.isGrounded) {
      this.animationState = AnimationState.JUMP;
    } else if (this.vx !== 0) {
      this.animationState = AnimationState.WALK;
    } else {
      this.animationState = AnimationState.IDLE;
    }

    super.updateAnimation(deltaTime);
  }

  /**
   * Desenhar jogador
   */
  draw(ctx: CanvasRenderingContext2D): void {
    // Desenhar corpo do personagem
    ctx.save();

    // Espelhar se virado para esquerda
    if (!this.facingRight) {
      ctx.translate(this.x + this.width / 2, this.y);
      ctx.scale(-1, 1);
      ctx.translate(-this.width / 2, 0);
    } else {
      ctx.translate(this.x, this.y);
    }

    // Desenhar corpo (simplificado - será substituído por sprite)
    ctx.fillStyle = '#ff6b6b';
    ctx.fillRect(0, 0, this.width, this.height);

    // Desenhar cabeça
    ctx.fillStyle = '#ffdbac';
    ctx.fillRect(this.width / 4, -8, this.width / 2, 12);

    // Desenhar olhos
    ctx.fillStyle = '#000000';
    ctx.fillRect(this.width / 3, -4, 3, 3);
    ctx.fillRect(this.width / 2, -4, 3, 3);

    ctx.restore();

    // Desenhar barra de vida
    this.drawHealthBar(ctx);

    // Desenhar alcance de ataque em debug
    if (this.isAttacking) {
      ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      const center = this.getCenter();
      ctx.arc(center.x, center.y, this.attackRange, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  /**
   * Ganhar experiência
   */
  gainExperience(amount: number): void {
    this.experience += amount;
    const xpForLevel = GAME_CONFIG.RPG.BASE_XP_FOR_LEVEL * Math.pow(GAME_CONFIG.RPG.XP_MULTIPLIER, this.level - 1);

    while (this.experience >= xpForLevel) {
      this.experience -= xpForLevel;
      this.levelUp();
    }
  }

  /**
   * Subir de nível
   */
  private levelUp(): void {
    this.level++;
    this.strength += GAME_CONFIG.RPG.STATS_PER_LEVEL.STRENGTH;
    this.defense += GAME_CONFIG.RPG.STATS_PER_LEVEL.DEFENSE;
    this.vitality += GAME_CONFIG.RPG.STATS_PER_LEVEL.VITALITY;

    const hpIncrease = GAME_CONFIG.RPG.STATS_PER_LEVEL.VITALITY;
    this.maxHp += hpIncrease;
    this.hp = this.maxHp; // Curar ao subir de nível
  }

  /**
   * Ganhar ouro
   */
  gainGold(amount: number): void {
    this.gold += amount;
  }

  /**
   * Usar poção de vida
   */
  useHealthPotion(amount: number = 50): void {
    this.heal(amount);
  }

  /**
   * Resetar estado do jogador
   */
  reset(): void {
    super.reset();
    this.level = 1;
    this.experience = 0;
    this.gold = 0;
    this.strength = 10;
    this.defense = 5;
    this.vitality = 10;
    this.maxHp = GAME_CONFIG.PLAYER.MAX_HP;
    this.hp = this.maxHp;
    this.isGrounded = false;
    this.isJumping = false;
    this.attackTimer = 0;
  }

  /**
   * Obter dano total (força + armas)
   */
  getTotalDamage(): number {
    return this.attackDamage + this.strength;
  }

  /**
   * Obter defesa total
   */
  getTotalDefense(): number {
    return this.defense;
  }

  /**
   * Obter dados do jogador para save
   */
  getSaveData(): any {
    return {
      x: this.x,
      y: this.y,
      level: this.level,
      experience: this.experience,
      gold: this.gold,
      hp: this.hp,
      maxHp: this.maxHp,
      strength: this.strength,
      defense: this.defense,
      vitality: this.vitality,
    };
  }
}

export default Player;
