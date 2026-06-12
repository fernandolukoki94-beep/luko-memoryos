/**
 * GameConfig.ts
 * Configurações principais do jogo
 */

export const GAME_CONFIG = {
  // Canvas
  CANVAS_WIDTH: 1024,
  CANVAS_HEIGHT: 768,
  CANVAS_BG_COLOR: '#1a1a1a',

  // FPS e Timing
  TARGET_FPS: 60,
  FRAME_TIME: 1000 / 60, // ~16.67ms

  // Física
  GRAVITY: 0.6,
  FRICTION: 0.85,
  BOUNCE: 0.3,

  // Player
  PLAYER: {
    SPAWN_X: 100,
    SPAWN_Y: 400,
    WIDTH: 32,
    HEIGHT: 48,
    MAX_HP: 100,
    SPEED: 5,
    JUMP_POWER: 12,
    ACCELERATION: 0.5,
    ATTACK_COOLDOWN: 500, // ms
    ATTACK_RANGE: 50,
    ATTACK_DAMAGE: 15,
    ATTACK_CRIT_CHANCE: 0.2, // 20%
    ATTACK_CRIT_MULTIPLIER: 1.5,
    KNOCKBACK_FORCE: 10,
  },

  // Enemy
  ENEMY: {
    STONE: {
      WIDTH: 40,
      HEIGHT: 40,
      MAX_HP: 30,
      SPEED: 2,
      ATTACK_COOLDOWN: 1000,
      ATTACK_RANGE: 60,
      ATTACK_DAMAGE: 8,
      DETECTION_RANGE: 200,
      PATROL_DISTANCE: 150,
      XP_REWARD: 50,
      GOLD_REWARD: 25,
    },
  },

  // Maps
  MAPS: {
    FOREST: {
      WIDTH: 800,
      HEIGHT: 600,
      ENEMY_COUNT: 5,
    },
    RUINS: {
      WIDTH: 1000,
      HEIGHT: 800,
      ENEMY_COUNT: 10,
    },
    TEMPLE: {
      WIDTH: 1200,
      HEIGHT: 1000,
      ENEMY_COUNT: 15,
    },
  },

  // RPG System
  RPG: {
    BASE_XP_FOR_LEVEL: 100,
    XP_MULTIPLIER: 1.2, // Curva exponencial
    STATS_PER_LEVEL: {
      STRENGTH: 2,
      DEFENSE: 1,
      SPEED: 0.5,
      VITALITY: 5,
    },
  },

  // UI
  UI: {
    HUD_PADDING: 10,
    BAR_HEIGHT: 20,
    MINIMAP_SIZE: 150,
    MINIMAP_SCALE: 0.15,
  },

  // Audio
  AUDIO: {
    MASTER_VOLUME: 0.8,
    MUSIC_VOLUME: 0.6,
    SFX_VOLUME: 0.8,
  },

  // Particles
  PARTICLES: {
    DAMAGE_LIFETIME: 1000,
    DEATH_LIFETIME: 1500,
    ATTACK_LIFETIME: 300,
  },

  // Debug
  DEBUG: {
    ENABLED: false,
    SHOW_HITBOXES: false,
    SHOW_GRID: false,
    SHOW_FPS: true,
  },
};

export default GAME_CONFIG;
