/**
 * MapForest.ts
 * Mapa da Floresta - Primeiro mapa do jogo
 */

import Map, { MapConfig } from './Map';
import { MapType } from '../constants/Enums';
import { GAME_CONFIG } from '../constants/GameConfig';

export class MapForest extends Map {
  constructor() {
    const config: MapConfig = {
      type: MapType.FOREST,
      width: GAME_CONFIG.MAPS.FOREST.WIDTH,
      height: GAME_CONFIG.MAPS.FOREST.HEIGHT,
      name: 'Floresta Misteriosa',
      description: 'Uma floresta densa e misteriosa cheia de inimigos',
      enemyCount: GAME_CONFIG.MAPS.FOREST.ENEMY_COUNT,
    };

    super(config);

    // Definir spawn do jogador
    this.playerSpawnX = 100;
    this.playerSpawnY = 300;

    // Definir saídas
    this.exits = [
      {
        x: this.width - 50,
        y: this.height / 2 - 50,
        width: 50,
        height: 100,
        nextMap: MapType.RUINS,
      },
    ];
  }

  /**
   * Desenhar mapa da floresta
   */
  draw(ctx: CanvasRenderingContext2D): void {
    // Desenhar fundo verde da floresta
    ctx.fillStyle = '#1a4d0e';
    ctx.fillRect(0, 0, this.width, this.height);

    // Desenhar árvores (retângulos simples)
    ctx.fillStyle = '#0d3a08';
    for (let i = 0; i < 10; i++) {
      const x = (i * 80) % this.width;
      const y = ((i * 60) % (this.height - 100)) + 50;
      ctx.fillRect(x, y, 60, 80);
    }

    // Desenhar grama
    ctx.fillStyle = '#2d5016';
    ctx.fillRect(0, this.height - 50, this.width, 50);

    // Desenhar saída (portal)
    ctx.fillStyle = 'rgba(255, 0, 255, 0.3)';
    ctx.fillRect(this.width - 50, this.height / 2 - 50, 50, 100);
    ctx.strokeStyle = '#ff00ff';
    ctx.lineWidth = 2;
    ctx.strokeRect(this.width - 50, this.height / 2 - 50, 50, 100);
  }
}

export default MapForest;
