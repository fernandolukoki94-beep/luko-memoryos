/**
 * AISystem.ts
 * Sistema de IA para inimigos
 */

import { Enemy } from '../entities/Enemy';
import { EnemyStone } from '../entities/EnemyStone';
import { Player } from '../entities/Player';
import { AIState } from '../constants/Enums';
import { logger } from '../utils/Logger';

export class AISystem {
  /**
   * Atualizar IA de um inimigo
   */
  static updateEnemyAI(enemy: Enemy, player: Player): void {
    if (enemy.isDead) return;

    if (enemy instanceof EnemyStone) {
      this.updateStoneEnemyAI(enemy, player);
    }
  }

  /**
   * Atualizar IA do Monstro de Pedra
   */
  private static updateStoneEnemyAI(enemy: EnemyStone, player: Player): void {
    // Verificar se pode ver o jogador
    if (enemy.canSeePlayer(player.x, player.y)) {
      // Verificar se pode atacar
      if (enemy.canAttack(player.x, player.y)) {
        enemy.aiState = AIState.ATTACK;
        enemy.vx = 0; // Parar de se mover ao atacar
      } else {
        // Perseguir jogador
        enemy.chasePlayer(player.x, player.y);
      }
    } else {
      // Patrulhar
      enemy.aiState = AIState.PATROL;
    }
  }

  /**
   * Atualizar IA de múltiplos inimigos
   */
  static updateAllEnemiesAI(enemies: Enemy[], player: Player): void {
    for (const enemy of enemies) {
      this.updateEnemyAI(enemy, player);
    }
  }

  /**
   * Obter inimigos próximos ao jogador
   */
  static getNearbyEnemies(enemies: Enemy[], player: Player, range: number): Enemy[] {
    return enemies.filter((enemy) => {
      const distance = Math.sqrt(
        Math.pow(enemy.x - player.x, 2) + Math.pow(enemy.y - player.y, 2)
      );
      return distance <= range && !enemy.isDead;
    });
  }

  /**
   * Obter inimigo mais próximo
   */
  static getClosestEnemy(enemies: Enemy[], player: Player): Enemy | null {
    let closest: Enemy | null = null;
    let closestDistance = Infinity;

    for (const enemy of enemies) {
      if (enemy.isDead) continue;

      const distance = Math.sqrt(
        Math.pow(enemy.x - player.x, 2) + Math.pow(enemy.y - player.y, 2)
      );

      if (distance < closestDistance) {
        closest = enemy;
        closestDistance = distance;
      }
    }

    return closest;
  }

  /**
   * Contar inimigos vivos
   */
  static countAliveEnemies(enemies: Enemy[]): number {
    return enemies.filter((enemy) => !enemy.isDead).length;
  }

  /**
   * Verificar se há inimigos próximos
   */
  static hasNearbyEnemies(enemies: Enemy[], player: Player, range: number): boolean {
    return this.getNearbyEnemies(enemies, player, range).length > 0;
  }

  /**
   * Obter estado de ameaça
   */
  static getThreatLevel(enemies: Enemy[], player: Player): 'safe' | 'warning' | 'danger' {
    const nearbyEnemies = this.getNearbyEnemies(enemies, player, 300);

    if (nearbyEnemies.length === 0) {
      return 'safe';
    } else if (nearbyEnemies.length <= 2) {
      return 'warning';
    } else {
      return 'danger';
    }
  }

  /**
   * Resetar IA de inimigos
   */
  static resetEnemiesAI(enemies: Enemy[]): void {
    for (const enemy of enemies) {
      enemy.aiState = AIState.PATROL;
      enemy.vx = 0;
      enemy.vy = 0;
    }
  }
}

export default AISystem;
