/**
 * GameCanvas.tsx
 * Componente React que encapsula o Canvas do jogo
 */

import React, { useEffect, useRef } from 'react';
import GameEngine from '@/game/core/GameEngine';
import { Player } from '@/game/entities/Player';
import { GAME_CONFIG } from '@/game/constants/GameConfig';
import { GameState as GameStateEnum } from '@/game/constants/Enums';
import { GameState } from '@/game/core/GameState';
import { logger } from '@/game/utils/Logger';

interface GameCanvasProps {
  onGameStart?: () => void;
  onGameEnd?: () => void;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({ onGameStart, onGameEnd }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<GameEngine | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Inicializar engine
    const engine = new GameEngine(canvasRef.current);
    engineRef.current = engine;

    // Criar jogador
    const player = new Player({
      x: GAME_CONFIG.PLAYER.SPAWN_X,
      y: GAME_CONFIG.PLAYER.SPAWN_Y,
      width: GAME_CONFIG.PLAYER.WIDTH,
      height: GAME_CONFIG.PLAYER.HEIGHT,
      maxHp: GAME_CONFIG.PLAYER.MAX_HP,
      speed: GAME_CONFIG.PLAYER.SPEED,
      jumpPower: GAME_CONFIG.PLAYER.JUMP_POWER,
      acceleration: GAME_CONFIG.PLAYER.ACCELERATION,
      attackCooldown: GAME_CONFIG.PLAYER.ATTACK_COOLDOWN,
      attackRange: GAME_CONFIG.PLAYER.ATTACK_RANGE,
      attackDamage: GAME_CONFIG.PLAYER.ATTACK_DAMAGE,
    });

    // Adicionar jogador ao engine
    engine.addEntity(player);

    // Criar inimigos
    engine.spawnEnemies(5);

    // Iniciar jogo
    const gameState = GameState.getInstance();
    gameState.setState(GameStateEnum.PLAYING);
    engine.start();

    logger.info('Jogo iniciado com sucesso');

    if (onGameStart) {
      onGameStart();
    }

    // Cleanup
    return () => {
      engine.destroy();
      if (onGameEnd) {
        onGameEnd();
      }
    };
  }, [onGameStart, onGameEnd]);

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-900">
      <canvas
        ref={canvasRef}
        width={GAME_CONFIG.CANVAS_WIDTH}
        height={GAME_CONFIG.CANVAS_HEIGHT}
        className="border-4 border-gray-700 bg-black"
      />
    </div>
  );
};

export default GameCanvas;
