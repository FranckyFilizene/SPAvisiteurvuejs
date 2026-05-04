<template>
  <div class="flex justify-center items-center min-h-screen w-full bg-slate-50 p-4">
    <div class="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-slate-100">
      
      <div class="bg-slate-800 p-8 text-center">
        <h1 class="text-3xl font-extrabold text-white tracking-tight">Connexion</h1>
        <p class="text-slate-400 mt-2">Heureux de vous revoir !</p>
      </div>
      <div class="p-8">
        <form @submit.prevent="handleLogin" class="flex flex-col gap-6">
          
          <!-- Champ Nom -->
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-semibold text-slate-700 ml-1">Identifiant</label>
            <div class="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-transparent transition-all">
              <v-icon name="fa-user" class="text-slate-400 mr-3" />
              <input
                v-model="nom"
                type="text"
                placeholder="Votre nom"
                class="w-full bg-transparent focus:outline-none text-slate-800 placeholder:text-slate-300"
              />
            </div>
          </div>
          <div class="flex flex-col gap-1.5">
            <div class="flex justify-between items-center px-1">
              <label class="text-sm font-semibold text-slate-700">Mot de passe</label>
              <router-link to="/inscription" class="text-xs text-orange-600 hover:underline font-medium">
                Oublié ?
              </router-link>
            </div>
            <div class="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-transparent transition-all">
              <v-icon name="fa-lock" class="text-slate-400 mr-3" />
              <input
                v-model="password"
                :type="showpassword ? 'text' : 'password'"
                placeholder="••••••••"
                class="w-full bg-transparent focus:outline-none text-slate-800 placeholder:text-slate-300"
              />
              <button type="button" @click="showpassword = !showpassword" class="text-slate-400 hover:text-slate-600">
                <v-icon :name="showpassword ? 'fa-eye-slash' : 'fa-eye'" />
              </button>
            </div>
          </div>
          <div class="flex items-center gap-2 px-1">
            <input 
              type="checkbox" 
              v-model="showpassword" 
              id="check" 
              class="w-4 h-4 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
            />
            <label for="check" class="text-sm text-slate-600 cursor-pointer select-none">
              Afficher le mot de passe
            </label>
          </div>
          <button
            type="submit"
            class="w-full bg-slate-800 text-white py-3.5 rounded-xl font-bold text-lg hover:bg-slate-900 hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-lg shadow-slate-200"
          >
            Se connecter
          </button>
          <p class="text-center text-slate-600 text-sm mt-2">
            Pas encore de compte ? 
            <router-link to="/inscription" class="text-orange-600 font-bold hover:underline">
              S'inscrire
            </router-link>
          </p>
          <transition name="fade">
            <div v-if="error" class="bg-red-50 border-l-4 border-red-500 p-3 rounded flex items-center gap-2">
              <v-icon name="fa-exclamation-triangle" class="text-red-500" />
              <p class="text-red-700 text-xs font-medium">{{ error }}</p>
            </div>
          </transition>

        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import axios from "axios";

const router = useRouter();
const showpassword = ref(false); // Gère l'affichage (true/false)
const password = ref('');
const nom = ref('');
const error = ref('');

const handleLogin = () => {
  error.value = ""; // Réinitialiser l'erreur

  if (!nom.value || !password.value) {
    error.value = "Veuillez remplir tous les champs";
    return;
  }

  // Vérification simple des identifiants
  if (nom.value === "Admin" && password.value === "password") {
    localStorage.setItem("token", "je_suis_connecter");
    router.push("/dashboard");
  } else {
    error.value = "Nom ou mot de passe incorrect";
  }
};

/*
// Version avec appel à la base de données PHP (à activer plus tard)
const handleLogin = async () => {
    error.value = ''; // On réinitialise l'erreur à chaque tentative
    
    if (!nom.value || !password.value) {
        error.value = 'Veuillez remplir tous les champs';
        return;
    }
    try {
        const datausers = {
            username: nom.value,
            password: password.value,
        };

        const res = await axios.post(
            'http://localhost/Delegg-Hub/SPAvisiteurVuejs/Backend/Login.php',
             datausers
        );
        
        if (res.data.status === "success") {
            localStorage.setItem('token', 'je_suis_connecter');
            router.push('/dashboard');
        } else {
            error.value = res.data.message; 
        }
    } catch (err) {
        console.log('error:', err);
        error.value = "Erreur de connexion au serveur";
    }
};
*/
</script>
