/**
 * Servicio para comunicación con el API de Cloudflare Worker
 */

// Interfaces
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  projectUrl: string;
  githubUrl: string;
  technologies: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Profile {
  id: string;
  fullName: string;
  title: string;
  description: string;
  email: string;
  linkedin: string;
  updatedAt: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  createdAt: string;
}

export interface PortfolioData {
  profile: Profile | null;
  projects: Project[];
  skills: Skill[];
  lastUpdated: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Configuración
const DEFAULT_API_URL = 'https://bbdd.hola-3e2.workers.dev';

class ApiService {
  private apiUrl: string;
  private apiKey: string;

  constructor() {
    // Cargar configuración desde localStorage
    const settings = this.loadSettings();
    this.apiUrl = settings.apiUrl || DEFAULT_API_URL;
    this.apiKey = settings.apiKey || '';
  }

  private loadSettings() {
    try {
      const saved = localStorage.getItem('portfolio-settings');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  }

  updateConfig(apiUrl: string, apiKey: string) {
    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    }

    return headers;
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.apiUrl}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result: ApiResponse<T> = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Error desconocido');
    }

    return result.data as T;
  }

  // Health check
  async healthCheck() {
    return this.makeRequest('/health');
  }

  // Portfolio completo (público)
  async getPortfolio(): Promise<PortfolioData> {
    return this.makeRequest<PortfolioData>('/api/portfolio');
  }

  // Proyectos
  async getProjects(): Promise<Project[]> {
    return this.makeRequest<Project[]>('/api/projects');
  }

  async createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    return this.makeRequest<Project>('/api/projects', {
      method: 'POST',
      body: JSON.stringify(project),
    });
  }

  async updateProject(id: string, project: Partial<Project>): Promise<Project> {
    return this.makeRequest<Project>(`/api/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(project),
    });
  }

  async deleteProject(id: string): Promise<void> {
    await this.makeRequest(`/api/projects/${id}`, {
      method: 'DELETE',
    });
  }

  // Perfil
  async getProfile(): Promise<Profile> {
    return this.makeRequest<Profile>('/api/profile');
  }

  async updateProfile(profile: Partial<Profile>): Promise<Profile> {
    return this.makeRequest<Profile>('/api/profile', {
      method: 'PUT',
      body: JSON.stringify(profile),
    });
  }

  // Habilidades
  async getSkills(): Promise<Skill[]> {
    return this.makeRequest<Skill[]>('/api/skills');
  }

  async createSkill(skill: { name: string; level: number }): Promise<Skill> {
    return this.makeRequest<Skill>('/api/skills', {
      method: 'POST',
      body: JSON.stringify(skill),
    });
  }

  async deleteSkill(id: string): Promise<void> {
    await this.makeRequest(`/api/skills/${id}`, {
      method: 'DELETE',
    });
  }
}

// Instancia global del servicio
export const apiService = new ApiService();
export default apiService;
