const FALLBACK_API_URL = 'https://dual-cookbook-server.onrender.com';

export const API_URL = import.meta.env.VITE_BASE_API_URL ?? FALLBACK_API_URL;
