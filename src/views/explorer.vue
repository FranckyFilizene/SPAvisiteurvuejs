<template>
  <div class="w-full text-[12px] flex flex-col bg-slate-700 h-dvh">
    <!-- Barre de recherche et filtres -->
    <div class="w-full p-4 flex flex-col gap-3">
      <!-- Barre de recherche principale -->
      <div class="w-full flex justify-evenly items-center gap-4">
        <div class="border p-2 w-full max-w-100 flex rounded-2xl text-slate-50 border-slate-50">
          <input 
            v-model="searchQuery"
            @keyup.enter="searchPlaces"
            type="text" 
            placeholder="Rechercher un endroit, une ville..."
            class="outline-none flex-1 bg-transparent px-2" 
          />
          <button 
            @click="searchPlaces"
            class="rounded-2xl bg-sky-700 cursor-pointer flex items-center gap-2 px-4 py-2 hover:bg-sky-600 transition"
          >
            rechercher
            <v-icon name="fa-search" scale=".8" fill="white" />
          </button>
        </div>


        <div class="border p-2 w-full max-w-50 cursor-pointer flex rounded-2xl text-slate-50 border-slate-50">
          <select 
            v-model="selectedType"
            @change="searchPlaces"
            class="bg-transparent outline-none w-full px-2"
          >
            <option value="">Type d'endroit</option>
            <option value="restaurant">Restaurant</option>
            <option value="hotel">Hôtel</option>
            <option value="park">Parc</option>
            <option value="museum">Musée</option>
            <option value="monument">Monument</option>
            <option value="shopping">Shopping</option>
            <option value="sport">Sport</option>
            <option value="loisir">Loisir</option>
          </select>
        </div>

        <!-- Filtre ville/région -->
        <div class="border p-2 w-full max-w-50 cursor-pointer flex rounded-2xl text-slate-50 border-slate-50">
          <select 
            v-model="selectedCity"
            @change="searchPlaces"
            class="bg-transparent outline-none w-full px-2"
          >
            <option value="">Toutes les villes</option>
            <option v-for="city in cities" :key="city" :value="city">
              {{ city }}
            </option>
          </select>
        </div>
      </div>

      <!-- Filtres supplémentaires -->
      <div class="flex gap-4 flex-wrap">
        <!-- Note minimum -->
        <div class="flex items-center gap-2 text-slate-50">
          <label class="text-xs">Note min :</label>
          <select 
            v-model="minRating"
            @change="searchPlaces"
            class="bg-slate-600 border border-slate-50 rounded px-2 py-1 text-xs"
          >
            <option value="">Toutes</option>
            <option value="5">★★★★★</option>
            <option value="4">★★★★☆</option>
            <option value="3">★★★☆☆</option>
            <option value="2">★★☆☆☆</option>
            <option value="1">★☆☆☆☆</option>
          </select>
        </div>

        <!-- Distance -->
        <div class="flex items-center gap-2 text-slate-50">
          <label class="text-xs">Distance max :</label>
          <select 
            v-model="maxDistance"
            @change="searchPlaces"
            class="bg-slate-600 border border-slate-50 rounded px-2 py-1 text-xs"
          >
            <option value="">Illimitée</option>
            <option value="1">1 km</option>
            <option value="5">5 km</option>
            <option value="10">10 km</option>
            <option value="20">20 km</option>
            <option value="50">50 km</option>
          </select>
        </div>

        <!-- Tri -->
        <div class="flex items-center gap-2 text-slate-50">
          <label class="text-xs">Trier par :</label>
          <select 
            v-model="sortBy"
            @change="searchPlaces"
            class="bg-slate-600 border border-slate-50 rounded px-2 py-1 text-xs"
          >
            <option value="relevance">Pertinence</option>
            <option value="rating">Meilleure note</option>
            <option value="distance">Distance</option>
            <option value="name">Nom A-Z</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Résultats -->
    <div class="flex-1 overflow-auto px-4">
      <!-- État de chargement -->
      <div v-if="loading" class="text-slate-50 text-center py-8">
        <div class="animate-spin inline-block w-8 h-8 border-4 border-sky-700 border-t-transparent rounded-full mb-4"></div>
        <p>Recherche en cours...</p>
      </div>

      <!-- Message d'erreur -->
      <div v-else-if="error" class="text-red-400 text-center py-8">
        <v-icon name="fa-exclamation-triangle" scale="1.5" fill="red" class="mb-2" />
        <p>{{ error }}</p>
        <button 
          @click="searchPlaces" 
          class="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Réessayer
        </button>
      </div>

      <!-- Résultats -->
      <div v-else-if="places.length > 0" class="space-y-4">
        <p class="text-slate-300 mb-4">
          {{ places.length }} endroit(s) trouvé(s)
          <span v-if="searchQuery">pour "{{ searchQuery }}"</span>
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div 
            v-for="place in places" 
            :key="place.id"
            class="bg-slate-600 rounded-lg overflow-hidden hover:bg-slate-500 transition cursor-pointer"
            @click="selectPlace(place)"
          >
            <!-- Image de l'endroit -->
            <div class="h-40 bg-slate-800 relative">
              <img 
                v-if="place.image" 
                :src="place.image" 
                :alt="place.name"
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full flex items-center justify-center">
                <v-icon name="fa-image" scale="2" fill="gray" />
              </div>
              <!-- Badge type -->
              <span class="absolute top-2 right-2 bg-sky-700 text-white px-2 py-1 rounded text-xs">
                {{ place.type }}
              </span>
            </div>

            <!-- Informations -->
            <div class="p-4">
              <h3 class="text-slate-50 font-bold text-base mb-1">{{ place.name }}</h3>
              
              <!-- Note -->
              <div class="flex items-center gap-1 mb-2">
                <span class="text-yellow-400">★</span>
                <span class="text-slate-300">{{ place.rating }}/5</span>
                <span class="text-slate-400">({{ place.reviews }} avis)</span>
              </div>

              <!-- Adresse -->
              <p class="text-slate-400 text-xs mb-2 flex items-center gap-1">
                <v-icon name="fa-map-marker-alt" scale=".7" fill="gray" />
                {{ place.address }}, {{ place.city }}
              </p>

              <!-- Description courte -->
              <p class="text-slate-300 text-xs mb-3">{{ place.description?.substring(0, 100) }}...</p>

              <!-- Footer -->
              <div class="flex justify-between items-center">
                <span class="text-sky-400 text-xs">{{ place.distance }} km</span>
                <button 
                  @click.stop="selectPlace(place)"
                  class="bg-sky-700 text-white px-3 py-1 rounded text-xs hover:bg-sky-600 transition"
                >
                  Voir détails
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Aucun résultat -->
      <div v-else-if="!loading && searchPerformed" class="text-slate-50 text-center py-12">
        <v-icon name="fa-search" scale="3" fill="gray" class="mb-4" />
        <p class="text-lg mb-2">Aucun endroit trouvé</p>
        <p class="text-slate-400 text-sm">Essayez de modifier vos critères de recherche</p>
      </div>
    </div>

    <!-- Modal détails (optionnel) -->
    <div v-if="selectedPlace" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-slate-600 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-auto">
        <div class="p-6">
          <div class="flex justify-between items-start mb-4">
            <h2 class="text-xl text-slate-50 font-bold">{{ selectedPlace.name }}</h2>
            <button @click="selectedPlace = null" class="text-slate-50 hover:text-red-400">
              <v-icon name="fa-times" scale="1.5" />
            </button>
          </div>
          <!-- Détails complets ici -->
          <div class="space-y-4 text-slate-300">
            <p>{{ selectedPlace.description }}</p>
            <p><strong>Adresse :</strong> {{ selectedPlace.address }}</p>
            <p><strong>Ville :</strong> {{ selectedPlace.city }}</p>
            <p><strong>Type :</strong> {{ selectedPlace.type }}</p>
            <p><strong>Note :</strong> {{ selectedPlace.rating }}/5</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import apiClient from '../Router/api'

// États réactifs
const searchQuery = ref('')
const selectedType = ref('')
const selectedCity = ref('')
const minRating = ref('')
const maxDistance = ref('')
const sortBy = ref('relevance')
const searchPerformed = ref(false)

const cities = ref([])
const places = ref([])
const loading = ref(false)
const error = ref(null)
const selectedPlace = ref(null)

// Charger les villes disponibles au montage
onMounted(async () => {
  await fetchCities()
})

// Récupérer la liste des villes
const fetchCities = async () => {
  try {
    const response = await apiClient.get('/places/cities')
    cities.value = response.data
  } catch (err) {
    console.error('Erreur chargement des villes:', err)
  }
}

// Rechercher des endroits
const searchPlaces = async () => {
  if (!searchQuery.value && !selectedType.value && !selectedCity.value) {
    return
  }

  loading.value = true
  error.value = null
  searchPerformed.value = true

  try {
    const params = {
      q: searchQuery.value,
      type: selectedType.value,
      city: selectedCity.value,
      min_rating: minRating.value,
      max_distance: maxDistance.value,
      sort: sortBy.value
    }

    // Nettoyer les paramètres vides
    Object.keys(params).forEach(key => {
      if (!params[key]) delete params[key]
    })

    const response = await apiClient.get('/places/search', { params })
    places.value = response.data
  } catch (err) {
    error.value = err.response?.data?.message || 'Erreur lors de la recherche'
    places.value = []
  } finally {
    loading.value = false
  }
}

// Sélectionner un endroit pour voir les détails
const selectPlace = (place) => {
  selectedPlace.value = place
}
</script>

<style scoped>
select option {
  background-color: #334155;
  color: #f8fafc;
}

/* Animation de chargement */
@keyframes spin {
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>