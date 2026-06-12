/**
 * Enums.ts
 * Enumerações para o jogo
 */

export enum GameState {
  MENU = 'MENU',
  PLAYING = 'PLAYING',
  PAUSED = 'PAUSED',
  GAME_OVER = 'GAME_OVER',
  VICTORY = 'VICTORY',
}

export enum EntityType {
  PLAYER = 'PLAYER',
  ENEMY = 'ENEMY',
  PROJECTILE = 'PROJECTILE',
  ITEM = 'ITEM',
  OBSTACLE = 'OBSTACLE',
}

export enum EnemyType {
  STONE = 'STONE',
  GOBLIN = 'GOBLIN',
  BOSS = 'BOSS',
}

export enum AIState {
  IDLE = 'IDLE',
  PATROL = 'PATROL',
  CHASE = 'CHASE',
  ATTACK = 'ATTACK',
  DEAD = 'DEAD',
}

export enum ItemType {
  WEAPON = 'WEAPON',
  ARMOR = 'ARMOR',
  POTION = 'POTION',
  KEY = 'KEY',
  QUEST = 'QUEST',
}

export enum MapType {
  FOREST = 'FOREST',
  RUINS = 'RUINS',
  TEMPLE = 'TEMPLE',
}

export enum QuestStatus {
  AVAILABLE = 'AVAILABLE',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  IDLE = 'IDLE',
}

export enum AnimationState {
  IDLE = 'IDLE',
  WALK = 'WALK',
  JUMP = 'JUMP',
  ATTACK = 'ATTACK',
  HURT = 'HURT',
  DEAD = 'DEAD',
}

export enum DamageType {
  PHYSICAL = 'PHYSICAL',
  MAGIC = 'MAGIC',
  FIRE = 'FIRE',
  ICE = 'ICE',
  LIGHTNING = 'LIGHTNING',
}
