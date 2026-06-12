/**
 * CombatSystem.ts
 * Sistema de combate do jogo
 */

import { Player } from '../entities/Player';
import { Enemy } from '../entities/Enemy';
import { Entity } from '../entities/Entity';
import { MathUtils } from '../utils/MathUtils';
import { logger } from '../utils/Logger';

export interface DamageResult {
  damage: number;
  isCritical: boolean;
  defender: Entity;
  attacker: Entity;
}

export class CombatSystem {
  /**
   * Calcular dano
   */
  static calculateDamage(attacker: Entity, defender: Entity): DamageResult {
    let baseDamage = 10;

    if (attacker instanceof Player) {
      baseDamage = attacker.getTotalDamage();
    } else if (attacker instanceof Enemy) {
      baseDamage = attacker.attackDamage;
    }

    // Verificar crítico
    const isCritical = Math.random() < 0.2; // 20% de chance
    const critMultiplier = isCritical ? 1.5 : 1;

    // Calcular defesa
    let defense = 0;
    if (defender instanceof Player) {
      defense = defender.getTotalDefense();
    } else if (defender instanceof Enemy) {
      defense = 0; // Inimigos não têm defesa por enquanto
    }

    // Aplicar defesa
    const defenseReduction = defense * 0.1; // 10% de redução por ponto de defesa
    const finalDamage = Math.max(1, Math.floor((baseDamage * critMultiplier - defenseReduction) * 0.8 + Math.random() * 0.4 * baseDamage));

    return {
      damage: finalDamage,
      isCritical,
      defender,
      attacker,
    };
  }

  /**
   * Aplicar dano
   */
  static applyDamage(damageResult: DamageResult): void {
    const { damage, isCritical, defender, attacker } = damageResult;

    // Calcular knockback
    const angle = attacker.getAngleTo(defender);
    const knockbackForce = 10;
    const knockbackX = Math.cos(angle) * knockbackForce;
    const knockbackY = Math.sin(angle) * knockbackForce;

    // Aplicar dano
    defender.takeDamage(damage, knockbackX, knockbackY);

    // Log
    const critText = isCritical ? ' (CRÍTICO!)' : '';
    logger.info(`${attacker.constructor.name} atacou ${defender.constructor.name} causando ${damage} de dano${critText}`);
  }

  /**
   * Verificar colisão de ataque
   */
  static checkAttackCollision(attacker: Entity, defender: Entity): boolean {
    const distance = attacker.getDistanceTo(defender);
    const attackRange = (attacker as any).attackRange || 50;
    return distance <= attackRange;
  }

  /**
   * Processar ataque do jogador
   */
  static processPlayerAttack(player: Player, enemies: Enemy[]): void {
    if (!player.isAttacking) return;

    for (const enemy of enemies) {
      if (enemy.isDead) continue;

      if (this.checkAttackCollision(player, enemy)) {
        const damageResult = this.calculateDamage(player, enemy);
        this.applyDamage(damageResult);

        // Ganhar XP ao derrotar
        if (enemy.isDead) {
          player.gainExperience(enemy.xpReward);
          player.gainGold(enemy.goldReward);
          logger.info(`Jogador ganhou ${enemy.xpReward} XP e ${enemy.goldReward} ouro`);
        }
      }
    }
  }

  /**
   * Processar ataque de inimigo
   */
  static processEnemyAttack(enemy: Enemy, player: Player): void {
    if (player.isDead || enemy.isDead) return;

    if (this.checkAttackCollision(enemy, player)) {
      const damageResult = this.calculateDamage(enemy, player);
      this.applyDamage(damageResult);
    }
  }

  /**
   * Processar combate entre todas as entidades
   */
  static processCombat(player: Player, enemies: Enemy[]): void {
    // Ataque do jogador
    this.processPlayerAttack(player, enemies);

    // Ataque dos inimigos
    for (const enemy of enemies) {
      this.processEnemyAttack(enemy, player);
    }
  }

  /**
   * Verificar morte
   */
  static checkDeaths(entities: Entity[]): Entity[] {
    return entities.filter((entity) => entity.isDead);
  }
}

export default CombatSystem;
