/**
 * HUD.ts
 * Interface de jogo (Heads-Up Display)
 */

import { Player } from '../entities/Player';
import { GAME_CONFIG } from '../constants/GameConfig';
import { RPGSystem } from '../systems/RPGSystem';
import { AISystem } from '../systems/AISystem';
import { Enemy } from '../entities/Enemy';

export class HUD {
  /**
   * Desenhar HUD completo
   */
  static draw(ctx: CanvasRenderingContext2D, player: Player, enemies: Enemy[]): void {
    const padding = GAME_CONFIG.UI.HUD_PADDING;

    // Desenhar vida
    this.drawHealthBar(ctx, player, padding, padding);

    // Desenhar XP
    this.drawXPBar(ctx, player, padding, padding + 50);

    // Desenhar stats
    this.drawStats(ctx, player, padding, padding + 100);

    // Desenhar nível de ameaça
    this.drawThreatLevel(ctx, player, enemies, GAME_CONFIG.CANVAS_WIDTH - 150, padding);

    // Desenhar minimapa
    this.drawMinimap(ctx, player, enemies, GAME_CONFIG.CANVAS_WIDTH - GAME_CONFIG.UI.MINIMAP_SIZE - padding, GAME_CONFIG.CANVAS_HEIGHT - GAME_CONFIG.UI.MINIMAP_SIZE - padding);
  }

  /**
   * Desenhar barra de vida
   */
  private static drawHealthBar(ctx: CanvasRenderingContext2D, player: Player, x: number, y: number): void {
    const barWidth = 200;
    const barHeight = GAME_CONFIG.UI.BAR_HEIGHT;

    // Label
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`HP: ${player.hp}/${player.maxHp}`, x, y - 5);

    // Background
    ctx.fillStyle = '#333333';
    ctx.fillRect(x, y, barWidth, barHeight);

    // Health
    const healthPercent = player.hp / player.maxHp;
    const healthColor = healthPercent > 0.5 ? '#00ff00' : healthPercent > 0.25 ? '#ffff00' : '#ff0000';
    ctx.fillStyle = healthColor;
    ctx.fillRect(x, y, barWidth * healthPercent, barHeight);

    // Border
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, barWidth, barHeight);
  }

  /**
   * Desenhar barra de XP
   */
  private static drawXPBar(ctx: CanvasRenderingContext2D, player: Player, x: number, y: number): void {
    const barWidth = 200;
    const barHeight = GAME_CONFIG.UI.BAR_HEIGHT;

    // Label
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'left';
    const xpForLevel = RPGSystem.getXPForLevel(player.level);
    const xpInLevel = RPGSystem.getXPInCurrentLevel(player.experience);
    ctx.fillText(`XP: ${xpInLevel}/${xpForLevel}`, x, y - 5);

    // Background
    ctx.fillStyle = '#333333';
    ctx.fillRect(x, y, barWidth, barHeight);

    // XP
    const xpPercent = xpInLevel / xpForLevel;
    ctx.fillStyle = '#0099ff';
    ctx.fillRect(x, y, barWidth * xpPercent, barHeight);

    // Border
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, barWidth, barHeight);
  }

  /**
   * Desenhar stats
   */
  private static drawStats(ctx: CanvasRenderingContext2D, player: Player, x: number, y: number): void {
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px Arial';
    ctx.textAlign = 'left';

    const stats = [
      `Nível: ${player.level}`,
      `Ouro: ${player.gold}`,
      `Força: ${player.strength}`,
      `Defesa: ${player.defense}`,
    ];

    stats.forEach((stat, index) => {
      ctx.fillText(stat, x, y + index * 18);
    });
  }

  /**
   * Desenhar nível de ameaça
   */
  private static drawThreatLevel(ctx: CanvasRenderingContext2D, player: Player, enemies: Enemy[], x: number, y: number): void {
    const threatLevel = AISystem.getThreatLevel(enemies, player);
    const threatColors = {
      safe: '#00ff00',
      warning: '#ffff00',
      danger: '#ff0000',
    };

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'right';
    ctx.fillText('Ameaça:', x, y);

    ctx.fillStyle = threatColors[threatLevel];
    ctx.font = 'bold 16px Arial';
    ctx.fillText(threatLevel.toUpperCase(), x, y + 25);

    // Inimigos próximos
    const nearbyEnemies = AISystem.getNearbyEnemies(enemies, player, 300);
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px Arial';
    ctx.fillText(`Inimigos: ${nearbyEnemies.length}`, x, y + 45);
  }

  /**
   * Desenhar minimapa
   */
  private static drawMinimap(ctx: CanvasRenderingContext2D, player: Player, enemies: Enemy[], x: number, y: number): void {
    const minimapSize = GAME_CONFIG.UI.MINIMAP_SIZE;
    const scale = GAME_CONFIG.UI.MINIMAP_SCALE;

    // Background
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(x, y, minimapSize, minimapSize);

    // Border
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, minimapSize, minimapSize);

    // Desenhar jogador
    ctx.fillStyle = '#00ff00';
    const playerX = x + (player.x * scale) % minimapSize;
    const playerY = y + (player.y * scale) % minimapSize;
    ctx.fillRect(playerX - 2, playerY - 2, 4, 4);

    // Desenhar inimigos
    ctx.fillStyle = '#ff0000';
    for (const enemy of enemies) {
      if (!enemy.isDead) {
        const enemyX = x + (enemy.x * scale) % minimapSize;
        const enemyY = y + (enemy.y * scale) % minimapSize;
        ctx.fillRect(enemyX - 2, enemyY - 2, 4, 4);
      }
    }

    // Label
    ctx.fillStyle = '#ffffff';
    ctx.font = '10px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Mapa', x + 5, y + minimapSize + 15);
  }
}

export default HUD;
