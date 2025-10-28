/**
 * Portfolio Backend API - Cloudflare Worker
 * 
 * Endpoints disponibles:
 * - GET/POST /api/projects - Gestión de proyectos
 * - GET/PUT /api/profile - Información personal
 * - GET/POST /api/skills - Habilidades técnicas
 * - GET /api/portfolio - Datos completos del portfolio
 */

import { KVStorage, LocalStorage, type StorageInterface } from './storage';
import './env.d.ts';

// Interfaces
interface Project {
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

interface Profile {
	id: string;
	fullName: string;
	title: string;
	description: string;
	email: string;
	linkedin: string;
	updatedAt: string;
}

interface Skill {
	id: string;
	name: string;
	level: number;
	createdAt: string;
}

interface ApiResponse<T = any> {
	success: boolean;
	data?: T;
	error?: string;
	message?: string;
}

// Configuración
const CORS_HEADERS = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type, Authorization',
	'Content-Type': 'application/json',
};

// Claves de almacenamiento
const STORAGE_KEYS = {
	PROJECTS: 'portfolio:projects',
	PROFILE: 'portfolio:profile',
	SKILLS: 'portfolio:skills',
};

// Utilidades
function generateId(): string {
	return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function createResponse<T>(data: T, status = 200): Response {
	const response: ApiResponse<T> = { success: true, data };
	return new Response(JSON.stringify(response), {
		status,
		headers: CORS_HEADERS,
	});
}

function createErrorResponse(error: string, status = 400): Response {
	const response: ApiResponse = { success: false, error };
	return new Response(JSON.stringify(response), {
		status,
		headers: CORS_HEADERS,
	});
}

function isAuthenticated(request: Request, env: Env): boolean {
	const authHeader = request.headers.get('Authorization');
	if (!authHeader) return false;
	
	const token = authHeader.replace('Bearer ', '');
	const apiKey = env.API_KEY || 'portfolio-admin-2024';
	return token === apiKey;
}

// Inicializar datos por defecto
async function initializeDefaultData(storage: StorageInterface): Promise<void> {
	// Verificar si ya existe el perfil
	const existingProfile = await storage.get<Profile>(STORAGE_KEYS.PROFILE);
	
	if (!existingProfile) {
		const defaultProfile: Profile = {
			id: '1',
			fullName: 'Tu Nombre',
			title: 'Desarrollador Full Stack',
			description: 'Descripción profesional aquí...',
			email: 'tu@email.com',
			linkedin: 'https://linkedin.com/in/tu-perfil',
			updatedAt: new Date().toISOString(),
		};
		
		await storage.put(STORAGE_KEYS.PROFILE, defaultProfile);
		await storage.put(STORAGE_KEYS.PROJECTS, []);
		await storage.put(STORAGE_KEYS.SKILLS, []);
	}
}

// Handlers para cada endpoint
class ProjectsHandler {
	static async get(storage: StorageInterface): Promise<Response> {
		const projects = await storage.get<Project[]>(STORAGE_KEYS.PROJECTS) || [];
		return createResponse(projects);
	}

	static async post(request: Request, storage: StorageInterface, env: Env): Promise<Response> {
		if (!isAuthenticated(request, env)) {
			return createErrorResponse('No autorizado', 401);
		}

		try {
			const data = await request.json() as Omit<Project, 'id' | 'createdAt' | 'updatedAt'>;
			
			if (!data.title || !data.description) {
				return createErrorResponse('Título y descripción son obligatorios');
			}

			const newProject: Project = {
				...data,
				id: generateId(),
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			};

			const projects = await storage.get<Project[]>(STORAGE_KEYS.PROJECTS) || [];
			projects.push(newProject);
			await storage.put(STORAGE_KEYS.PROJECTS, projects);

			return createResponse(newProject, 201);
		} catch (error) {
			return createErrorResponse('Error al crear proyecto');
		}
	}

	static async put(request: Request, projectId: string, storage: StorageInterface, env: Env): Promise<Response> {
		if (!isAuthenticated(request, env)) {
			return createErrorResponse('No autorizado', 401);
		}

		try {
			const data = await request.json() as Partial<Project>;
			const projects = await storage.get<Project[]>(STORAGE_KEYS.PROJECTS) || [];
			const projectIndex = projects.findIndex(p => p.id === projectId);
			
			if (projectIndex === -1) {
				return createErrorResponse('Proyecto no encontrado', 404);
			}

			projects[projectIndex] = {
				...projects[projectIndex],
				...data,
				id: projectId,
				updatedAt: new Date().toISOString(),
			};

			await storage.put(STORAGE_KEYS.PROJECTS, projects);
			return createResponse(projects[projectIndex]);
		} catch (error) {
			return createErrorResponse('Error al actualizar proyecto');
		}
	}

	static async delete(request: Request, projectId: string, storage: StorageInterface, env: Env): Promise<Response> {
		if (!isAuthenticated(request, env)) {
			return createErrorResponse('No autorizado', 401);
		}

		const projects = await storage.get<Project[]>(STORAGE_KEYS.PROJECTS) || [];
		const projectIndex = projects.findIndex(p => p.id === projectId);
		
		if (projectIndex === -1) {
			return createErrorResponse('Proyecto no encontrado', 404);
		}

		projects.splice(projectIndex, 1);
		await storage.put(STORAGE_KEYS.PROJECTS, projects);
		
		return createResponse({ message: 'Proyecto eliminado exitosamente' });
	}
}

class ProfileHandler {
	static async get(storage: StorageInterface): Promise<Response> {
		const profile = await storage.get<Profile>(STORAGE_KEYS.PROFILE);
		return createResponse(profile);
	}

	static async put(request: Request, storage: StorageInterface, env: Env): Promise<Response> {
		if (!isAuthenticated(request, env)) {
			return createErrorResponse('No autorizado', 401);
		}

		try {
			const data = await request.json() as Partial<Profile>;
			const currentProfile = await storage.get<Profile>(STORAGE_KEYS.PROFILE);
			
			const updatedProfile: Profile = {
				id: currentProfile?.id || '1',
				fullName: data.fullName || currentProfile?.fullName || '',
				title: data.title || currentProfile?.title || '',
				description: data.description || currentProfile?.description || '',
				email: data.email || currentProfile?.email || '',
				linkedin: data.linkedin || currentProfile?.linkedin || '',
				updatedAt: new Date().toISOString(),
			};

			await storage.put(STORAGE_KEYS.PROFILE, updatedProfile);
			return createResponse(updatedProfile);
		} catch (error) {
			return createErrorResponse('Error al actualizar perfil');
		}
	}
}

class SkillsHandler {
	static async get(storage: StorageInterface): Promise<Response> {
		const skills = await storage.get<Skill[]>(STORAGE_KEYS.SKILLS) || [];
		return createResponse(skills);
	}

	static async post(request: Request, storage: StorageInterface, env: Env): Promise<Response> {
		if (!isAuthenticated(request, env)) {
			return createErrorResponse('No autorizado', 401);
		}

		try {
			const data = await request.json() as { name: string; level: number };
			
			if (!data.name || data.level < 0 || data.level > 100) {
				return createErrorResponse('Nombre y nivel (0-100) son obligatorios');
			}

			const newSkill: Skill = {
				id: generateId(),
				name: data.name,
				level: data.level,
				createdAt: new Date().toISOString(),
			};

			const skills = await storage.get<Skill[]>(STORAGE_KEYS.SKILLS) || [];
			skills.push(newSkill);
			await storage.put(STORAGE_KEYS.SKILLS, skills);

			return createResponse(newSkill, 201);
		} catch (error) {
			return createErrorResponse('Error al crear habilidad');
		}
	}

	static async delete(request: Request, skillId: string, storage: StorageInterface, env: Env): Promise<Response> {
		if (!isAuthenticated(request, env)) {
			return createErrorResponse('No autorizado', 401);
		}

		const skills = await storage.get<Skill[]>(STORAGE_KEYS.SKILLS) || [];
		const skillIndex = skills.findIndex(s => s.id === skillId);
		
		if (skillIndex === -1) {
			return createErrorResponse('Habilidad no encontrada', 404);
		}

		skills.splice(skillIndex, 1);
		await storage.put(STORAGE_KEYS.SKILLS, skills);

		return createResponse({ message: 'Habilidad eliminada exitosamente' });
	}
}

class PortfolioHandler {
	static async get(storage: StorageInterface): Promise<Response> {
		// Endpoint público que devuelve todos los datos del portfolio
		const [profile, projects, skills] = await Promise.all([
			storage.get<Profile>(STORAGE_KEYS.PROFILE),
			storage.get<Project[]>(STORAGE_KEYS.PROJECTS),
			storage.get<Skill[]>(STORAGE_KEYS.SKILLS),
		]);

		return createResponse({
			profile: profile || null,
			projects: projects || [],
			skills: skills || [],
			lastUpdated: new Date().toISOString(),
		});
	}
}

// Router principal
async function handleRequest(request: Request, env: Env): Promise<Response> {
	const url = new URL(request.url);
	const path = url.pathname;
	const method = request.method;

	// Inicializar storage
	const storage: StorageInterface = env.PORTFOLIO_KV 
		? new KVStorage(env.PORTFOLIO_KV) 
		: new LocalStorage();

	// Inicializar datos por defecto si es necesario
	await initializeDefaultData(storage);

	// Manejar CORS preflight
	if (method === 'OPTIONS') {
		return new Response(null, { status: 200, headers: CORS_HEADERS });
	}

	// Ruta de health check
	if (path === '/' || path === '/health') {
		return createResponse({
			service: 'Portfolio API',
			status: 'healthy',
			timestamp: new Date().toISOString(),
			version: '1.0.0',
			storage: env.PORTFOLIO_KV ? 'KV' : 'Local',
		});
	}

	// Rutas de la API
	try {
		// Proyectos
		if (path === '/api/projects') {
			switch (method) {
				case 'GET':
					return await ProjectsHandler.get(storage);
				case 'POST':
					return await ProjectsHandler.post(request, storage, env);
				default:
					return createErrorResponse('Método no permitido', 405);
			}
		}

		if (path.startsWith('/api/projects/')) {
			const projectId = path.split('/')[3];
			switch (method) {
				case 'PUT':
					return await ProjectsHandler.put(request, projectId, storage, env);
				case 'DELETE':
					return await ProjectsHandler.delete(request, projectId, storage, env);
				default:
					return createErrorResponse('Método no permitido', 405);
			}
		}

		// Perfil
		if (path === '/api/profile') {
			switch (method) {
				case 'GET':
					return await ProfileHandler.get(storage);
				case 'PUT':
					return await ProfileHandler.put(request, storage, env);
				default:
					return createErrorResponse('Método no permitido', 405);
			}
		}

		// Habilidades
		if (path === '/api/skills') {
			switch (method) {
				case 'GET':
					return await SkillsHandler.get(storage);
				case 'POST':
					return await SkillsHandler.post(request, storage, env);
				default:
					return createErrorResponse('Método no permitido', 405);
			}
		}

		if (path.startsWith('/api/skills/')) {
			const skillId = path.split('/')[3];
			switch (method) {
				case 'DELETE':
					return await SkillsHandler.delete(request, skillId, storage, env);
				default:
					return createErrorResponse('Método no permitido', 405);
			}
		}

		// Portfolio completo (endpoint público)
		if (path === '/api/portfolio') {
			if (method === 'GET') {
				return await PortfolioHandler.get(storage);
			}
			return createErrorResponse('Método no permitido', 405);
		}

		// Ruta no encontrada
		return createErrorResponse('Endpoint no encontrado', 404);

	} catch (error) {
		console.error('Error en la API:', error);
		return createErrorResponse('Error interno del servidor', 500);
	}
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		return await handleRequest(request, env);
	},
} satisfies ExportedHandler<Env>;
