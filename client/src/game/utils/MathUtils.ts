/**
 * MathUtils.ts
 * Utilitários matemáticos para o jogo
 */

export class MathUtils {
  /**
   * Clamp um valor entre min e max
   */
  static clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
  }

  /**
   * Distância entre dois pontos
   */
  static distance(x1: number, y1: number, x2: number, y2: number): number {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * Ângulo entre dois pontos (em radianos)
   */
  static angle(x1: number, y1: number, x2: number, y2: number): number {
    return Math.atan2(y2 - y1, x2 - x1);
  }

  /**
   * Verificar colisão AABB (Axis-Aligned Bounding Box)
   */
  static isColliding(
    x1: number,
    y1: number,
    w1: number,
    h1: number,
    x2: number,
    y2: number,
    w2: number,
    h2: number
  ): boolean {
    return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
  }

  /**
   * Lerp (interpolação linear)
   */
  static lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
  }

  /**
   * Número aleatório entre min e max
   */
  static random(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  /**
   * Número aleatório inteiro entre min e max
   */
  static randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Normalizar vetor
   */
  static normalize(x: number, y: number): { x: number; y: number } {
    const length = Math.sqrt(x * x + y * y);
    if (length === 0) return { x: 0, y: 0 };
    return { x: x / length, y: y / length };
  }

  /**
   * Produto escalar (dot product)
   */
  static dot(x1: number, y1: number, x2: number, y2: number): number {
    return x1 * x2 + y1 * y2;
  }

  /**
   * Easing: ease-out quad
   */
  static easeOutQuad(t: number): number {
    return 1 - (1 - t) * (1 - t);
  }

  /**
   * Easing: ease-in quad
   */
  static easeInQuad(t: number): number {
    return t * t;
  }

  /**
   * Easing: ease-in-out quad
   */
  static easeInOutQuad(t: number): number {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  /**
   * Converter graus para radianos
   */
  static toRadians(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }

  /**
   * Converter radianos para graus
   */
  static toDegrees(radians: number): number {
    return (radians * 180) / Math.PI;
  }

  /**
   * Verificar se ponto está dentro de retângulo
   */
  static isPointInRect(
    px: number,
    py: number,
    rx: number,
    ry: number,
    rw: number,
    rh: number
  ): boolean {
    return px >= rx && px <= rx + rw && py >= ry && py <= ry + rh;
  }

  /**
   * Verificar se ponto está dentro de círculo
   */
  static isPointInCircle(
    px: number,
    py: number,
    cx: number,
    cy: number,
    radius: number
  ): boolean {
    const dist = this.distance(px, py, cx, cy);
    return dist <= radius;
  }
}

export default MathUtils;
