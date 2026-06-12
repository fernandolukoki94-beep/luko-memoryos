/**
 * ParticleSystem.ts
 * Sistema de partículas para efeitos visuais
 */

import { GAME_CONFIG } from '../constants/GameConfig';
import { MathUtils } from '../utils/MathUtils';
import { logger } from '../utils/Logger';

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  lifetime: number;
  maxLifetime: number;
  size: number;
  color: string;
  type: 'damage' | 'death' | 'attack' | 'heal';
}

export class ParticleSystem {
  private particles: Particle[] = [];

  /**
   * Criar partículas de dano
   */
  createDamageParticles(x: number, y: number, damage: number): void {
    const particleCount = Math.min(Math.ceil(damage / 10), 10);

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      const speed = 3 + Math.random() * 2;

      const particle: Particle = {
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        lifetime: 0,
        maxLifetime: GAME_CONFIG.PARTICLES.DAMAGE_LIFETIME,
        size: 4 + Math.random() * 4,
        color: '#ff0000',
        type: 'damage',
      };

      this.particles.push(particle);
    }
  }

  /**
   * Criar partículas de morte
   */
  createDeathParticles(x: number, y: number): void {
    const particleCount = 15;

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 4;

      const particle: Particle = {
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        lifetime: 0,
        maxLifetime: GAME_CONFIG.PARTICLES.DEATH_LIFETIME,
        size: 6 + Math.random() * 6,
        color: '#ffff00',
        type: 'death',
      };

      this.particles.push(particle);
    }
  }

  /**
   * Criar partículas de ataque
   */
  createAttackParticles(x: number, y: number): void {
    const particleCount = 8;

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      const speed = 4 + Math.random() * 2;

      const particle: Particle = {
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        lifetime: 0,
        maxLifetime: GAME_CONFIG.PARTICLES.ATTACK_LIFETIME,
        size: 3 + Math.random() * 3,
        color: '#ffaa00',
        type: 'attack',
      };

      this.particles.push(particle);
    }
  }

  /**
   * Criar partículas de cura
   */
  createHealParticles(x: number, y: number): void {
    const particleCount = 10;

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 3;

      const particle: Particle = {
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1,
        lifetime: 0,
        maxLifetime: GAME_CONFIG.PARTICLES.DAMAGE_LIFETIME,
        size: 4 + Math.random() * 4,
        color: '#00ff00',
        type: 'heal',
      };

      this.particles.push(particle);
    }
  }

  /**
   * Atualizar partículas
   */
  update(deltaTime: number): void {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];

      // Atualizar posição
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Aplicar gravidade
      particle.vy += 0.1;

      // Atualizar lifetime
      particle.lifetime += deltaTime;

      // Remover partícula se expirou
      if (particle.lifetime >= particle.maxLifetime) {
        this.particles.splice(i, 1);
      }
    }
  }

  /**
   * Desenhar partículas
   */
  draw(ctx: CanvasRenderingContext2D): void {
    for (const particle of this.particles) {
      const alpha = 1 - particle.lifetime / particle.maxLifetime;

      ctx.fillStyle = particle.color;
      ctx.globalAlpha = alpha;
      ctx.fillRect(particle.x - particle.size / 2, particle.y - particle.size / 2, particle.size, particle.size);
      ctx.globalAlpha = 1;
    }
  }

  /**
   * Obter número de partículas ativas
   */
  getParticleCount(): number {
    return this.particles.length;
  }

  /**
   * Limpar todas as partículas
   */
  clear(): void {
    this.particles = [];
  }
}

export default ParticleSystem;
