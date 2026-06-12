/**
 * Physics.ts
 * Sistema de física e colisão
 */

import { Entity } from '../entities/Entity';
import { MathUtils } from '../utils/MathUtils';
import { logger } from '../utils/Logger';

export interface CollisionInfo {
  entity1: Entity;
  entity2: Entity;
  distance: number;
}

export class Physics {
  private entities: Entity[] = [];
  private collisions: CollisionInfo[] = [];

  /**
   * Adicionar entidade ao sistema de física
   */
  addEntity(entity: Entity): void {
    this.entities.push(entity);
  }

  /**
   * Remover entidade do sistema de física
   */
  removeEntity(entity: Entity): void {
    const index = this.entities.indexOf(entity);
    if (index > -1) {
      this.entities.splice(index, 1);
    }
  }

  /**
   * Limpar todas as entidades
   */
  clear(): void {
    this.entities = [];
    this.collisions = [];
  }

  /**
   * Atualizar física
   */
  update(deltaTime: number = 16.67): void {
    // Limpar colisões anteriores
    this.collisions = [];

    // Detectar colisões
    this.detectCollisions();
  }

  /**
   * Detectar colisões entre entidades
   */
  private detectCollisions(): void {
    for (let i = 0; i < this.entities.length; i++) {
      for (let j = i + 1; j < this.entities.length; j++) {
        const entity1 = this.entities[i];
        const entity2 = this.entities[j];

        if (entity1.isCollidingWith(entity2)) {
          const distance = entity1.getDistanceTo(entity2);
          this.collisions.push({
            entity1,
            entity2,
            distance,
          });
        }
      }
    }
  }

  /**
   * Obter colisões
   */
  getCollisions(): CollisionInfo[] {
    return [...this.collisions];
  }

  /**
   * Verificar colisão entre duas entidades
   */
  isColliding(entity1: Entity, entity2: Entity): boolean {
    return entity1.isCollidingWith(entity2);
  }

  /**
   * Obter todas as entidades colidindo com uma entidade específica
   */
  getCollidingEntities(entity: Entity): Entity[] {
    return this.collisions
      .filter((collision) => collision.entity1 === entity || collision.entity2 === entity)
      .map((collision) => (collision.entity1 === entity ? collision.entity2 : collision.entity1));
  }

  /**
   * Resolver colisão (separação simples)
   */
  resolveCollision(entity1: Entity, entity2: Entity): void {
    const dx = entity2.x - entity1.x;
    const dy = entity2.y - entity1.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance === 0) return;

    // Normalizar direção
    const nx = dx / distance;
    const ny = dy / distance;

    // Calcular sobreposição
    const overlap = entity1.width / 2 + entity2.width / 2 - distance;

    if (overlap > 0) {
      // Separar entidades
      const separationX = (nx * overlap) / 2;
      const separationY = (ny * overlap) / 2;

      entity1.x -= separationX;
      entity1.y -= separationY;
      entity2.x += separationX;
      entity2.y += separationY;
    }
  }

  /**
   * Raycast simples
   */
  raycast(
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    excludeEntity?: Entity
  ): Entity | null {
    const dx = endX - startX;
    const dy = endY - startY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const nx = dx / distance;
    const ny = dy / distance;

    let closestEntity: Entity | null = null;
    let closestDistance = distance;

    for (const entity of this.entities) {
      if (entity === excludeEntity) continue;

      // Verificar se o raio intersecta com a entidade
      const t = this.raycastEntity(startX, startY, nx, ny, entity);
      if (t !== null && t < closestDistance) {
        closestEntity = entity;
        closestDistance = t;
      }
    }

    return closestEntity;
  }

  /**
   * Raycast com entidade
   */
  private raycastEntity(startX: number, startY: number, nx: number, ny: number, entity: Entity): number | null {
    const dx = entity.x - startX;
    const dy = entity.y - startY;
    const t = dx * nx + dy * ny;

    if (t < 0) return null;

    const closestX = startX + nx * t;
    const closestY = startY + ny * t;

    const distX = closestX - entity.x;
    const distY = closestY - entity.y;
    const dist = Math.sqrt(distX * distX + distY * distY);

    if (dist < entity.width / 2) {
      return t;
    }

    return null;
  }

  /**
   * Obter entidades em área
   */
  getEntitiesInArea(x: number, y: number, width: number, height: number): Entity[] {
    return this.entities.filter((entity) => MathUtils.isColliding(x, y, width, height, entity.x, entity.y, entity.width, entity.height));
  }

  /**
   * Obter entidades em raio
   */
  getEntitiesInRadius(x: number, y: number, radius: number): Entity[] {
    return this.entities.filter((entity) => {
      const dist = MathUtils.distance(x, y, entity.x + entity.width / 2, entity.y + entity.height / 2);
      return dist <= radius;
    });
  }

  /**
   * Obter número de entidades
   */
  getEntityCount(): number {
    return this.entities.length;
  }

  /**
   * Obter todas as entidades
   */
  getEntities(): Entity[] {
    return [...this.entities];
  }
}

export default Physics;
