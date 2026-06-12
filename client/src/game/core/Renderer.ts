/**
 * Renderer.ts
 * Sistema de renderização 2D com Canvas
 */

import { GAME_CONFIG } from '../constants/GameConfig';
import { logger } from '../utils/Logger';

export class Renderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  private fps: number = 0;
  private frameCount: number = 0;
  private lastTime: number = Date.now();

  // Câmera
  private cameraX: number = 0;
  private cameraY: number = 0;

  constructor(canvasElement: HTMLCanvasElement) {
    this.canvas = canvasElement;
    this.canvas.width = GAME_CONFIG.CANVAS_WIDTH;
    this.canvas.height = GAME_CONFIG.CANVAS_HEIGHT;

    const ctx = this.canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Não foi possível obter contexto 2D do Canvas');
    }

    this.ctx = ctx;
    this.width = GAME_CONFIG.CANVAS_WIDTH;
    this.height = GAME_CONFIG.CANVAS_HEIGHT;

    // Desabilitar anti-aliasing para pixel art
    this.ctx.imageSmoothingEnabled = false;

    logger.info('Renderer inicializado', { width: this.width, height: this.height });
  }

  /**
   * Limpar canvas
   */
  clear(): void {
    this.ctx.fillStyle = GAME_CONFIG.CANVAS_BG_COLOR;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  /**
   * Desenhar retângulo
   */
  drawRect(x: number, y: number, width: number, height: number, color: string, filled: boolean = true): void {
    this.ctx.fillStyle = color;
    if (filled) {
      this.ctx.fillRect(x - this.cameraX, y - this.cameraY, width, height);
    } else {
      this.ctx.strokeStyle = color;
      this.ctx.strokeRect(x - this.cameraX, y - this.cameraY, width, height);
    }
  }

  /**
   * Desenhar círculo
   */
  drawCircle(x: number, y: number, radius: number, color: string, filled: boolean = true): void {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(x - this.cameraX, y - this.cameraY, radius, 0, Math.PI * 2);
    if (filled) {
      this.ctx.fill();
    } else {
      this.ctx.stroke();
    }
  }

  /**
   * Desenhar texto
   */
  drawText(text: string, x: number, y: number, color: string = '#ffffff', size: number = 16, align: CanvasTextAlign = 'left'): void {
    this.ctx.fillStyle = color;
    this.ctx.font = `${size}px Arial`;
    this.ctx.textAlign = align;
    this.ctx.fillText(text, x - this.cameraX, y - this.cameraY);
  }

  /**
   * Desenhar imagem
   */
  drawImage(image: HTMLImageElement, x: number, y: number, width?: number, height?: number): void {
    if (width && height) {
      this.ctx.drawImage(image, x - this.cameraX, y - this.cameraY, width, height);
    } else {
      this.ctx.drawImage(image, x - this.cameraX, y - this.cameraY);
    }
  }

  /**
   * Desenhar linha
   */
  drawLine(x1: number, y1: number, x2: number, y2: number, color: string = '#ffffff', width: number = 1): void {
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = width;
    this.ctx.beginPath();
    this.ctx.moveTo(x1 - this.cameraX, y1 - this.cameraY);
    this.ctx.lineTo(x2 - this.cameraX, y2 - this.cameraY);
    this.ctx.stroke();
  }

  /**
   * Desenhar grid (debug)
   */
  drawGrid(cellSize: number = 32): void {
    this.ctx.strokeStyle = 'rgba(100, 100, 100, 0.3)';
    this.ctx.lineWidth = 1;

    // Linhas verticais
    for (let x = 0; x < this.width; x += cellSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.height);
      this.ctx.stroke();
    }

    // Linhas horizontais
    for (let y = 0; y < this.height; y += cellSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.width, y);
      this.ctx.stroke();
    }
  }

  /**
   * Atualizar câmera
   */
  updateCamera(targetX: number, targetY: number, mapWidth: number, mapHeight: number): void {
    // Centralizar câmera no alvo
    this.cameraX = targetX - this.width / 2;
    this.cameraY = targetY - this.height / 2;

    // Limitar câmera aos limites do mapa
    this.cameraX = Math.max(0, Math.min(this.cameraX, mapWidth - this.width));
    this.cameraY = Math.max(0, Math.min(this.cameraY, mapHeight - this.height));
  }

  /**
   * Obter posição da câmera
   */
  getCameraPosition(): { x: number; y: number } {
    return { x: this.cameraX, y: this.cameraY };
  }

  /**
   * Converter coordenadas da tela para coordenadas do mundo
   */
  screenToWorld(screenX: number, screenY: number): { x: number; y: number } {
    return {
      x: screenX + this.cameraX,
      y: screenY + this.cameraY,
    };
  }

  /**
   * Converter coordenadas do mundo para coordenadas da tela
   */
  worldToScreen(worldX: number, worldY: number): { x: number; y: number } {
    return {
      x: worldX - this.cameraX,
      y: worldY - this.cameraY,
    };
  }

  /**
   * Atualizar FPS
   */
  updateFPS(): void {
    this.frameCount++;
    const now = Date.now();
    if (now - this.lastTime >= 1000) {
      this.fps = this.frameCount;
      this.frameCount = 0;
      this.lastTime = now;
    }
  }

  /**
   * Desenhar FPS
   */
  drawFPS(): void {
    this.drawText(`FPS: ${this.fps}`, 10, 20, '#00ff00', 14);
  }

  /**
   * Obter contexto Canvas
   */
  getContext(): CanvasRenderingContext2D {
    return this.ctx;
  }

  /**
   * Obter dimensões do canvas
   */
  getSize(): { width: number; height: number } {
    return { width: this.width, height: this.height };
  }

  /**
   * Destruir renderer
   */
  destroy(): void {
    logger.debug('Renderer destruído');
  }
}

export default Renderer;
