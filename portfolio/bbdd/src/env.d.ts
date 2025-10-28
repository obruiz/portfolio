// Definición de tipos para el entorno de Cloudflare Worker

interface Env {
  // Variables de entorno
  API_KEY?: string;
  
  // KV Namespaces
  PORTFOLIO_KV?: KVNamespace;
}

// Extend the global interface for ExportedHandler
declare global {
  interface Env {
    API_KEY?: string;
    PORTFOLIO_KV?: KVNamespace;
  }
}
