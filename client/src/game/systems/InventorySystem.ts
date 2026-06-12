/**
 * InventorySystem.ts
 * Sistema de inventário do jogo
 */

import { ItemType } from '../constants/Enums';
import { logger } from '../utils/Logger';

export interface Item {
  id: string;
  name: string;
  type: ItemType;
  quantity: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  description: string;
  value: number;
}

export class InventorySystem {
  private items: Item[] = [];
  private maxSlots: number = 20;

  constructor(maxSlots: number = 20) {
    this.maxSlots = maxSlots;
  }

  /**
   * Adicionar item
   */
  addItem(item: Item): boolean {
    // Verificar se item já existe (stackable)
    const existingItem = this.items.find((i) => i.id === item.id);

    if (existingItem) {
      existingItem.quantity += item.quantity;
      logger.info(`Item adicionado: ${item.name} x${item.quantity}`);
      return true;
    }

    // Verificar espaço
    if (this.items.length >= this.maxSlots) {
      logger.warn('Inventário cheio');
      return false;
    }

    this.items.push(item);
    logger.info(`Item adicionado: ${item.name}`);
    return true;
  }

  /**
   * Remover item
   */
  removeItem(itemId: string, quantity: number = 1): boolean {
    const item = this.items.find((i) => i.id === itemId);

    if (!item) {
      logger.warn(`Item não encontrado: ${itemId}`);
      return false;
    }

    item.quantity -= quantity;

    if (item.quantity <= 0) {
      const index = this.items.indexOf(item);
      this.items.splice(index, 1);
    }

    logger.info(`Item removido: ${item.name} x${quantity}`);
    return true;
  }

  /**
   * Obter item
   */
  getItem(itemId: string): Item | null {
    return this.items.find((i) => i.id === itemId) || null;
  }

  /**
   * Obter todos os itens
   */
  getAllItems(): Item[] {
    return [...this.items];
  }

  /**
   * Obter itens por tipo
   */
  getItemsByType(type: ItemType): Item[] {
    return this.items.filter((i) => i.type === type);
  }

  /**
   * Obter quantidade de item
   */
  getItemQuantity(itemId: string): number {
    const item = this.items.find((i) => i.id === itemId);
    return item ? item.quantity : 0;
  }

  /**
   * Verificar se tem item
   */
  hasItem(itemId: string, quantity: number = 1): boolean {
    return this.getItemQuantity(itemId) >= quantity;
  }

  /**
   * Limpar inventário
   */
  clear(): void {
    this.items = [];
    logger.info('Inventário limpo');
  }

  /**
   * Obter espaço disponível
   */
  getAvailableSlots(): number {
    return this.maxSlots - this.items.length;
  }

  /**
   * Verificar se está cheio
   */
  isFull(): boolean {
    return this.items.length >= this.maxSlots;
  }

  /**
   * Obter valor total do inventário
   */
  getTotalValue(): number {
    return this.items.reduce((total, item) => total + item.value * item.quantity, 0);
  }

  /**
   * Usar item
   */
  useItem(itemId: string): boolean {
    return this.removeItem(itemId, 1);
  }

  /**
   * Vender item
   */
  sellItem(itemId: string, quantity: number = 1): number {
    const item = this.getItem(itemId);
    if (!item) return 0;

    const totalValue = item.value * quantity;
    this.removeItem(itemId, quantity);
    return totalValue;
  }

  /**
   * Obter dados para save
   */
  getSaveData(): Item[] {
    return JSON.parse(JSON.stringify(this.items));
  }

  /**
   * Carregar dados
   */
  loadSaveData(data: Item[]): void {
    this.items = JSON.parse(JSON.stringify(data));
    logger.info(`Inventário carregado com ${this.items.length} itens`);
  }
}

export default InventorySystem;
