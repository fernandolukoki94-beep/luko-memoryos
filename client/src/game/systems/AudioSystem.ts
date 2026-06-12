/**
 * AudioSystem.ts
 * Sistema de áudio do jogo
 */

import { GAME_CONFIG } from '../constants/GameConfig';
import { logger } from '../utils/Logger';

export class AudioSystem {
  private masterVolume: number = GAME_CONFIG.AUDIO.MASTER_VOLUME;
  private musicVolume: number = GAME_CONFIG.AUDIO.MUSIC_VOLUME;
  private sfxVolume: number = GAME_CONFIG.AUDIO.SFX_VOLUME;

  private sounds: Map<string, HTMLAudioElement> = new Map();
  private currentMusic: HTMLAudioElement | null = null;

  private isMuted: boolean = false;

  constructor() {
    logger.info('AudioSystem inicializado');
  }

  /**
   * Carregar som
   */
  loadSound(id: string, url: string): void {
    try {
      const audio = new Audio(url);
      audio.volume = this.sfxVolume * this.masterVolume;
      this.sounds.set(id, audio);
      logger.info(`Som carregado: ${id}`);
    } catch (error) {
      logger.error(`Erro ao carregar som: ${id}`, error);
    }
  }

  /**
   * Reproduzir som
   */
  playSound(id: string): void {
    if (this.isMuted) return;

    const sound = this.sounds.get(id);
    if (!sound) {
      logger.warn(`Som não encontrado: ${id}`);
      return;
    }

    try {
      sound.currentTime = 0;
      sound.play().catch((error) => {
        logger.warn(`Erro ao reproduzir som: ${id}`, error);
      });
    } catch (error) {
      logger.error(`Erro ao reproduzir som: ${id}`, error);
    }
  }

  /**
   * Parar som
   */
  stopSound(id: string): void {
    const sound = this.sounds.get(id);
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
    }
  }

  /**
   * Reproduzir música
   */
  playMusic(url: string, loop: boolean = true): void {
    if (this.isMuted) return;

    try {
      if (this.currentMusic) {
        this.currentMusic.pause();
        this.currentMusic.currentTime = 0;
      }

      const audio = new Audio(url);
      audio.volume = this.musicVolume * this.masterVolume;
      audio.loop = loop;
      audio.play().catch((error) => {
        logger.warn(`Erro ao reproduzir música`, error);
      });

      this.currentMusic = audio;
      logger.info('Música iniciada');
    } catch (error) {
      logger.error('Erro ao reproduzir música', error);
    }
  }

  /**
   * Parar música
   */
  stopMusic(): void {
    if (this.currentMusic) {
      this.currentMusic.pause();
      this.currentMusic.currentTime = 0;
      this.currentMusic = null;
      logger.info('Música parada');
    }
  }

  /**
   * Definir volume mestre
   */
  setMasterVolume(volume: number): void {
    this.masterVolume = Math.max(0, Math.min(1, volume));
    this.updateVolumes();
  }

  /**
   * Definir volume de música
   */
  setMusicVolume(volume: number): void {
    this.musicVolume = Math.max(0, Math.min(1, volume));
    this.updateVolumes();
  }

  /**
   * Definir volume de efeitos
   */
  setSFXVolume(volume: number): void {
    this.sfxVolume = Math.max(0, Math.min(1, volume));
    this.updateVolumes();
  }

  /**
   * Atualizar volumes
   */
  private updateVolumes(): void {
    if (this.currentMusic) {
      this.currentMusic.volume = this.musicVolume * this.masterVolume;
    }

    this.sounds.forEach((sound) => {
      sound.volume = this.sfxVolume * this.masterVolume;
    });
  }

  /**
   * Mutar/desmutar
   */
  toggleMute(): void {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      if (this.currentMusic) {
        this.currentMusic.pause();
      }
      logger.info('Áudio mutado');
    } else {
      if (this.currentMusic) {
        this.currentMusic.play();
      }
      logger.info('Áudio ativado');
    }
  }

  /**
   * Verificar se está mutado
   */
  isMutedState(): boolean {
    return this.isMuted;
  }

  /**
   * Obter volume mestre
   */
  getMasterVolume(): number {
    return this.masterVolume;
  }

  /**
   * Obter volume de música
   */
  getMusicVolume(): number {
    return this.musicVolume;
  }

  /**
   * Obter volume de efeitos
   */
  getSFXVolume(): number {
    return this.sfxVolume;
  }

  /**
   * Limpar todos os sons
   */
  clear(): void {
    this.stopMusic();
    this.sounds.forEach((sound) => {
      sound.pause();
    });
    this.sounds.clear();
    logger.info('AudioSystem limpo');
  }
}

export default AudioSystem;
