// Instance Axios unique pour toute l'application :
// - baseURL lue depuis le fichier .env (VITE_API_URL) ;
// - ajout automatique du token d'authentification ;
// - déconnexion automatique si la session n'est plus valide (401).
import axios from "axios";
import { getToken, clearSession } from "./auth.js";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Ajoute le token à chaque requête s'il existe.
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Déconnexion automatique si l'API renvoie 401 (session expirée).
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      clearSession();
      const publicPages = ["/", "/inscription", "/mot-de-passe-oublie"];
      if (!publicPages.includes(window.location.pathname)) {
        window.location.replace("/");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
