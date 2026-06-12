/**
 * MapManager.ts
 * Gerenciador de mapas do jogo
 */

import { Map } from './Map';
import { MapForest } from './MapForest';
import { MapRuins } from './MapRuins';
import { MapTemple } from './MapTemple';
import { MapType } from '../constants/Enums';
import { logger } from '../utils/Logger';

export class MapManager {
  private maps: Map[] = [];
  private currentMap: Map | null = null;

  constructor() {
    this.initializeMaps();
  }

  /**
   * Inicializar todos os mapas
   */
  private initializeMaps(): void {
    this.maps.push(new MapForest());
    this.maps.push(new MapRuins());
    this.maps.push(new MapTemple());

    logger.info(`${this.maps.length} mapas carregados`);
  }

  /**
   * Carregar mapa por tipo
   */
  loadMap(mapType: MapType): Map | null {
    const map = this.maps.find((m) => m.type === mapType);

    if (map) {
      this.currentMap = map;
      map.initialize();
      logger.info(`Mapa carregado: ${map.name}`);
      return map;
    }

    logger.error(`Mapa não encontrado: ${mapType}`);
    return null;
  }

  /**
   * Obter mapa atual
   */
  getCurrentMap(): Map | null {
    return this.currentMap;
  }

  /**
   * Obter mapa por tipo
   */
  getMap(mapType: MapType): Map | null {
    return this.maps.find((m) => m.type === mapType) || null;
  }

  /**
   * Obter todos os mapas
   */
  getAllMaps(): Map[] {
    return [...this.maps];
  }

  /**
   * Limpar mapa atual
   */
  clearCurrentMap(): void {
    if (this.currentMap) {
      this.currentMap.clear();
      this.currentMap = null;
    }
  }

  /**
   * Obter informações de todos os mapas
   */
  getMapInfo(): string[] {
    return this.maps.map((map) => map.getInfo());
  }
}

export default MapManager;
