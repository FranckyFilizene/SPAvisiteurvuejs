// src/api/client.js
import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', // Remplacez par l'URL de votre API
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// Intercepteur pour les requêtes
apiClient.interceptors.request.use(
  config => {
    // Ajouter un token d'authentification si nécessaire
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Intercepteur pour les réponses
apiClient.interceptors.response.use(
  response => response,
  error => {
    // Gérer les erreurs globalement
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Rediriger vers la page de connexion
          console.error('Non autorisé')
          break
        case 404:
          console.error('Ressource non trouvée')
          break
        case 500:
          console.error('Erreur serveur')
          break
      }
    }
    return Promise.reject(error)
  }
)

export default apiClient