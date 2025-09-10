import { type User, type InsertUser, type Translation, type InsertTranslation } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  saveTranslation(translation: InsertTranslation): Promise<Translation>;
  getRecentTranslations(limit?: number): Promise<Translation[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private translations: Map<string, Translation>;

  constructor() {
    this.users = new Map();
    this.translations = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async saveTranslation(insertTranslation: InsertTranslation): Promise<Translation> {
    const id = randomUUID();
    const translation: Translation = {
      ...insertTranslation,
      id,
      createdAt: new Date(),
    };
    this.translations.set(id, translation);
    return translation;
  }

  async getRecentTranslations(limit = 10): Promise<Translation[]> {
    const translations = Array.from(this.translations.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
    return translations;
  }
}

export const storage = new MemStorage();
