/**
 * MapTemple.ts
 * Mapa do Templo Final - Terceiro mapa do jogo
 */

import Map, { MapConfig } from './Map';
import { MapType } from '../constants/Enums';
import { GAME_CONFIG } from '../constants/GameConfig';

export class MapTemple extends Map {
  constructor() {
    const config: MapConfig = {
      type: MapType.TEMPLE,
      width: GAME_CONFIG.MAPS.TEMPLE.WIDTH,
      height: GAME_CONFIG.MAPS.TEMPLE.HEIGHT,
      name: 'Templo Sagrado',
      description: 'O templo final onde o grande mal aguarda',
      enemyCount: GAME_CONFIG.MAPS.TEMPLE.ENEMY_COUNT,
    };

    super(config);

    // Definir spawn do jogador
    this.playerSpawnX = 50;
    this.playerSpawnY = this.height / 2;

    // Definir saídas
    this.exits = [
      {
        x: 0,
        y: this.height / 2 - 50,
        width: 50,
        height: 100,
        nextMap: MapType.RUINS,
      },
    ];
  }

  /**
   * Desenhar mapa do templo
   */
  draw(ctx: CanvasRenderingContext2D): void {
    // Desenhar fundo dourado do templo
    ctx.fillStyle = '#3d3d1f';
    ctx.fillRect(0, 0, this.width, this.height);

    // Desenhar colunas do templo
    ctx.fillStyle = '#8b7355';
    for (let i = 0; i < 6; i++) {
      const x = 100 + i * 180;
      const y = 100;
      ctx.fillRect(x, y, 40, 300);
    }

    // Desenhar piso do templo
    ctx.fillStyle = '#d4af37';
    ctx.fillRect(0, this.height - 100, this.width, 100);

    // Desenhar padrão no piso
    ctx.strokeStyle = '#b8860b';
    ctx.lineWidth = 2;
    for (let i = 0; i < this.width; i += 50) {
      for (let j = 0; j < 100; j += 50) {
        ctx.strokeRect(i, this.height - 100 + j, 50, 50);
      }
    }

    // Desenhar altar no centro
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(this.width / 2 - 50, this.height / 2 - 50, 100, 100);
    ctx.strokeStyle = '#ffff00';
    ctx.lineWidth = 3;
    ctx.strokeRect(this.width / 2 - 50, this.height / 2 - 50, 100, 100);

    // Desenhar saída (portal)
    ctx.fillStyle = 'rgba(255, 0, 255, 0.3)';
    ctx.fillRect(0, this.height / 2 - 50, 50, 100);
    ctx.strokeStyle = '#ff00ff';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, this.height / 2 - 50, 50, 100);
  }
}

export default MapTemple;
