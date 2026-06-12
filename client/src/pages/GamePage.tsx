/**
 * GamePage.tsx
 * Página principal do jogo
 */

import React, { useState } from 'react';
import GameCanvas from '@/components/GameCanvas';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

export default function GamePage() {
  const [isGameRunning, setIsGameRunning] = useState(true);
  const [, setLocation] = useLocation();

  const handleGameStart = () => {
    setIsGameRunning(true);
  };

  const handleGameEnd = () => {
    setIsGameRunning(false);
  };

  const handleBackToMenu = () => {
    setLocation('/');
  };

  return (
    <div className="w-full h-screen bg-gray-900">
      {isGameRunning ? (
        <GameCanvas onGameStart={handleGameStart} onGameEnd={handleGameEnd} />
      ) : (
        <div className="flex flex-col justify-center items-center w-full h-screen gap-4">
          <h1 className="text-4xl font-bold text-white">Jogo Encerrado</h1>
          <Button onClick={handleBackToMenu} variant="default" size="lg">
            Voltar ao Menu
          </Button>
        </div>
      )}

      {/* Botão flutuante para voltar ao menu */}
      <div className="fixed top-4 right-4 z-50">
        <Button onClick={handleBackToMenu} variant="outline" size="sm">
          Menu
        </Button>
      </div>
    </div>
  );
}
