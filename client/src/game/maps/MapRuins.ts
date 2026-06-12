/**
 * MapRuins.ts
 * Mapa das Ruínas - Segundo mapa do jogo
 */

import Map, { MapConfig } from './Map';
import { MapType } from '../constants/Enums';
import { GAME_CONFIG } from '../constants/GameConfig';

export class MapRuins extends Map {
  constructor() {
    const config: MapConfig = {
      type: MapType.RUINS,
      width: GAME_CONFIG.MAPS.RUINS.WIDTH,
      height: GAME_CONFIG.MAPS.RUINS.HEIGHT,
      name: 'Ruínas Antigas',
      description: 'Ruínas de uma civilização antiga, repletas de perigos',
      enemyCount: GAME_CONFIG.MAPS.RUINS.ENEMY_COUNT,
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
        nextMap: MapType.FOREST,
      },
      {
        x: this.width - 50,
        y: this.height / 2 - 50,
        width: 50,
        height: 100,
        nextMap: MapType.TEMPLE,
      },
    ];
  }

  /**
   * Desenhar mapa das ruínas
   */
  draw(ctx: CanvasRenderingContext2D): void {
    // Desenhar fundo cinzento das ruínas
    ctx.fillStyle = '#4a4a4a';
    ctx.fillRect(0, 0, this.width, this.height);

    // Desenhar blocos de pedra
    ctx.fillStyle = '#6b6b6b';
    for (let i = 0; i < 15; i++) {
      const x = (i * 70) % this.width;
      const y = ((i * 50) % (this.height - 100)) + 50;
      ctx.fillRect(x, y, 50, 50);
    }

    // Desenhar rachaduras
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 2;
    for (let i = 0; i < 10; i++) {
      const x1 = Math.random() * this.width;
      const y1 = Math.random() * this.height;
      const x2 = x1 + (Math.random() - 0.5) * 100;
      const y2 = y1 + (Math.random() - 0.5) * 100;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    // Desenhar saídas (portais)
    ctx.fillStyle = 'rgba(255, 0, 255, 0.3)';
    ctx.fillRect(0, this.height / 2 - 50, 50, 100);
    ctx.fillRect(this.width - 50, this.height / 2 - 50, 50, 100);
    ctx.strokeStyle = '#ff00ff';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, this.height / 2 - 50, 50, 100);
    ctx.strokeRect(this.width - 50, this.height / 2 - 50, 50, 100);
  }
}

export default MapRuins;
