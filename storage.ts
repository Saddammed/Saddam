import { 
  products, bioLinks, botLogs, topupRequests, saasGenerations, botSettings,
  type Product, type BioLink, type BotLog, type TopupRequest, type SaasGeneration,
  type InsertTopupRequest, type InsertBotLog, type InsertSaasGeneration
} from "@shared/schema";

export interface IStorage {
  getProducts(): Promise<Product[]>;
  seedProducts(): Promise<void>;
  getBioLinks(): Promise<BioLink[]>;
  seedBioLinks(): Promise<void>;
  getBotLogs(): Promise<BotLog[]>;
  createBotLog(log: InsertBotLog): Promise<BotLog>;
  createTopupRequest(request: InsertTopupRequest): Promise<TopupRequest>;
  getTopupRequests(): Promise<TopupRequest[]>;
  createSaasGeneration(gen: InsertSaasGeneration): Promise<SaasGeneration>;
  getBotSetting(key: string): Promise<string | null>;
  setBotSetting(key: string, value: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private products: Product[] = [];
  private bioLinks: BioLink[] = [];
  private botLogs: BotLog[] = [];
  private topupRequests: TopupRequest[] = [];
  private saasGenerations: SaasGeneration[] = [];
  private botSettings: Map<string, string> = new Map();

  constructor() {
    this.seedProducts();
    this.seedBioLinks();
  }

  async getProducts(): Promise<Product[]> { return this.products; }
  async seedProducts(): Promise<void> {
    this.products = [{
      id: 1,
      name: "Premium Wireless Headphones",
      description: "Experience high-fidelity sound with active noise cancellation and 30-hour battery life.",
      price: "$299.00",
      imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    }];
  }

  async getBioLinks(): Promise<BioLink[]> { return this.bioLinks; }
  async seedBioLinks(): Promise<void> {
    this.bioLinks = [
      { id: 1, title: "Visit Website", url: "https://wa.me/message/REDKIHRAVCUEB1", icon: "Globe", order: 1 },
      { id: 2, title: "Telegram", url: "https://t.me/Saddammed", icon: "Send", order: 2 },
      { id: 3, title: "TikTok", url: "https://www.tiktok.com/@saddamhub", icon: "Video", order: 3 },
    ];
  }

  async getBotLogs(): Promise<BotLog[]> { return this.botLogs; }
  async createBotLog(log: InsertBotLog): Promise<BotLog> {
    const newLog = { id: this.botLogs.length + 1, ...log, timestamp: new Date() };
    this.botLogs.push(newLog);
    return newLog;
  }

  async createTopupRequest(request: InsertTopupRequest): Promise<TopupRequest> {
    const newReq = { id: this.topupRequests.length + 1, ...request, status: "pending", createdAt: new Date() };
    this.topupRequests.push(newReq);
    return newReq;
  }
  async getTopupRequests(): Promise<TopupRequest[]> { return this.topupRequests; }

  async createSaasGeneration(gen: InsertSaasGeneration): Promise<SaasGeneration> {
    const newGen = { id: this.saasGenerations.length + 1, ...gen, createdAt: new Date() };
    this.saasGenerations.push(newGen);
    return newGen;
  }

  async getBotSetting(key: string): Promise<string | null> { return this.botSettings.get(key) || null; }
  async setBotSetting(key: string, value: string): Promise<void> { this.botSettings.set(key, value); }
}

export const storage = new MemStorage();
