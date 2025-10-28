/**
 * Capa de abstracción para el almacenamiento
 * Usa KV storage de Cloudflare para persistencia
 */

export interface StorageInterface {
	get<T>(key: string): Promise<T | null>;
	put(key: string, value: any): Promise<void>;
	delete(key: string): Promise<void>;
	list(prefix?: string): Promise<string[]>;
}

export class KVStorage implements StorageInterface {
	constructor(private kv: KVNamespace) {}

	async get<T>(key: string): Promise<T | null> {
		try {
			const value = await this.kv.get(key, 'json');
			return value as T;
		} catch (error) {
			console.error(`Error getting key ${key}:`, error);
			return null;
		}
	}

	async put(key: string, value: any): Promise<void> {
		try {
			await this.kv.put(key, JSON.stringify(value));
		} catch (error) {
			console.error(`Error putting key ${key}:`, error);
			throw error;
		}
	}

	async delete(key: string): Promise<void> {
		try {
			await this.kv.delete(key);
		} catch (error) {
			console.error(`Error deleting key ${key}:`, error);
			throw error;
		}
	}

	async list(prefix?: string): Promise<string[]> {
		try {
			const result = await this.kv.list({ prefix });
			return result.keys.map(key => key.name);
		} catch (error) {
			console.error(`Error listing keys with prefix ${prefix}:`, error);
			return [];
		}
	}
}

// Storage local para desarrollo/testing
export class LocalStorage implements StorageInterface {
	private storage = new Map<string, any>();

	async get<T>(key: string): Promise<T | null> {
		return this.storage.get(key) || null;
	}

	async put(key: string, value: any): Promise<void> {
		this.storage.set(key, value);
	}

	async delete(key: string): Promise<void> {
		this.storage.delete(key);
	}

	async list(prefix?: string): Promise<string[]> {
		const keys = Array.from(this.storage.keys());
		return prefix ? keys.filter(key => key.startsWith(prefix)) : keys;
	}
}
