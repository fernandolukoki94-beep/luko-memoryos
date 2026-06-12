/**
 * Map.ts
 * Classe base para mapas do jogo
 */

import { MapType } from '../constants/Enums';
import { Entity } from '../entities/Entity';
import { Enemy } from '../entities/Enemy';
import { logger } from '../utils/Logger';

export interface MapConfig {
  type: MapType;
  width: number;
  height: number;
  name: string;
  description: string;
  enemyCount: number;
}

export class Map {
  type: MapType;
  width: number;
  height: number;
  name: string;
  description: string;
  enemyCount: number;

  // Entidades
  entities: Entity[] = [];
  enemies: Enemy[] = [];

  // Spawn points
  playerSpawnX: number = 100;
  playerSpawnY: number = 100;

  // Saídas do mapa
  exits: Array<{ x: number; y: number; width: number; height: number; nextMap: MapType }> = [];

  constructor(config: MapConfig) {
    this.type = config.type;
    this.width = config.width;
    this.height = config.height;
    this.name = config.name;
    this.description = config.description;
    this.enemyCount = config.enemyCount;

    logger.info(`Mapa criado: ${this.name}`);
  }

  /**
   * Inicializar mapa
   */
  initialize(): void {
    logger.info(`Inicializando mapa: ${this.name}`);
  }

  /**
   * Desenhar mapa
   */
  draw(ctx: CanvasRenderingContext2D): void {
    // Desenhar fundo
    ctx.fillStyle = '#2d5016';
    ctx.fillRect(0, 0, this.width, this.height);

    // Desenhar grid (debug)
    ctx.strokeStyle = 'rgba(100, 100, 100, 0.1)';
    ctx.lineWidth = 1;
    for (let x = 0; x < this.width; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.height);
      ctx.stroke();
    }
    for (let y = 0; y < this.height; y += 32) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(this.width, y);
      ctx.stroke();
    }
  }

  /**
   * Adicionar entidade
   */
  addEntity(entity: Entity): void {
    this.entities.push(entity);
  }

  /**
   * Remover entidade
   */
  removeEntity(entity: Entity): void {
    const index = this.entities.indexOf(entity);
    if (index > -1) {
      this.entities.splice(index, 1);
    }
  }

  /**
   * Adicionar inimigo
   */
  addEnemy(enemy: Enemy): void {
    this.enemies.push(enemy);
    this.addEntity(enemy);
  }

  /**
   * Remover inimigo
   */
  removeEnemy(enemy: Enemy): void {
    const index = this.enemies.indexOf(enemy);
    if (index > -1) {
      this.enemies.splice(index, 1);
    }
    this.removeEntity(enemy);
  }

  /**
   * Obter todas as entidades
   */
  getEntities(): Entity[] {
    return [...this.entities];
  }

  /**
   * Obter todos os inimigos
   */
  getEnemies(): Enemy[] {
    return [...this.enemies];
  }

  /**
   * Verificar colisão com saída
   */
  checkExitCollision(x: number, y: number, width: number, height: number): MapType | null {
    for (const exit of this.exits) {
      if (
        x < exit.x + exit.width &&
        x + width > exit.x &&
        y < exit.y + exit.height &&
        y + height > exit.y
      ) {
        return exit.nextMap;
      }
    }
    return null;
  }

  /**
   * Limpar mapa
   */
  clear(): void {
    this.entities = [];
    this.enemies = [];
    logger.info(`Mapa limpo: ${this.name}`);
  }

  /**
   * Obter informações do mapa
   */
  getInfo(): string {
    return `${this.name} (${this.width}x${this.height}) - ${this.description}`;
  }
}

export default Map;
