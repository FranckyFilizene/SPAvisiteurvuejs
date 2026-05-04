<template>
  <div class="flex justify-center items-center min-h-screen w-full bg-slate-50 p-4">
    <div class="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-slate-100">
      <div class="bg-slate-800 p-8 text-center">
        <h1 class="text-3xl font-extrabold text-white tracking-tight">Créer un compte</h1>
        <p class="text-slate-400 mt-2">Rejoignez notre communauté en quelques secondes</p>
      </div>
      <div class="p-8">
        <form @submit.prevent="handleregistre" class="flex flex-col gap-5">

          <!-- Champ Nom -->
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-semibold text-slate-700 ml-1">Nom complet</label>
            <div
              class="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-transparent transition-all">
              <v-icon name="fa-user" class="text-slate-400 mr-3" />
              <input v-model="nom" type="text" placeholder="Ex: Jean Dupont"
                class="w-full bg-transparent focus:outline-none text-slate-800 placeholder:text-slate-300" />
            </div>
          </div>

          <!-- Champ Email -->
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-semibold text-slate-700 ml-1">Adresse Email</label>
            <div
              class="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-transparent transition-all">
              <v-icon name="md-email" class="text-slate-400 mr-3" />
              <input v-model="email" type="email" placeholder="exemple@mail.com"
                class="w-full bg-transparent focus:outline-none text-slate-800 placeholder:text-slate-300" />
            </div>
          </div>

          <!-- Grille pour les mots de passe (Responsive: 1 col sur mobile, 2 sur PC) -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Password -->
            <div class="flex flex-col gap-1.5">
              <label class="text-sm font-semibold text-slate-700 ml-1">Mot de passe</label>
              <div
                class="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-orange-500 transition-all">
                <input v-model="password" :type="showpassword ? 'text' : 'password'" placeholder="••••••••"
                  class="w-full bg-transparent focus:outline-none text-slate-800 placeholder:text-slate-300 text-sm" />
              </div>
            </div>
            <!-- Confirm Password -->
            <div class="flex flex-col gap-1.5">
              <label class="text-sm font-semibold text-slate-700 ml-1">Confirmation</label>
              <div
                class="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-orange-500 transition-all">
                <input v-model="confirmpassword" :type="showpassword ? 'text' : 'password'" placeholder="••••••••"
                  class="w-full bg-transparent focus:outline-none text-slate-800 placeholder:text-slate-300 text-sm" />
              </div>
            </div>
          </div>

          <!-- Afficher le mot de passe -->
          <div class="flex items-center gap-2 px-1">
            <input type="checkbox" v-model="showpassword" id="check"
              class="w-4 h-4 rounded border-slate-300 text-orange-600 focus:ring-orange-500" />
            <label for="check" class="text-sm text-slate-600 cursor-pointer select-none font-medium">
              Afficher les mots de passe
            </label>
          </div>

          <!-- Bouton Inscrire -->
          <div class="mt-2 flex flex-col gap-4">
            <button type="submit"
              class="w-full bg-slate-800 text-white py-3.5 rounded-xl font-bold text-lg hover:bg-slate-900 hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-lg shadow-slate-200">
              Créer mon compte
            </button>

            <p class="text-center text-slate-600 text-sm">
              Déjà un compte ?
              <router-link to="/login" class="text-orange-600 font-bold hover:underline">
                Se connecter
              </router-link>
            </p>
          </div>

          <!-- Message d'erreur -->
          <transition name="slide-up">
            <div v-if="error" class="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl flex items-center gap-3">
              <v-icon name="bi-exclamation-octagon-fill" class="text-red-500" />
              <p class="text-red-800 text-sm font-medium">{{ error }}</p>
            </div>
          </transition>

        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.slide-up-leave-to {
  opacity: 0;
}
</style>
<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const nom = ref("");
const email = ref("");
const password = ref("");
const confirmpassword = ref("");
const error = ref("");
const showpassword = ref(false);

const router = useRouter();

const handleregistre = () => {
  if (!nom.value || !password.value || !email.value) {
    error.value = "Veuillez remplir tout les champs !!!";
    return;
  }

  if (password.value !== confirmpassword.value) {
    error.value = "Veuillez verifier votre mots de passe";
    return;
  }

  // Inscription simple - juste afficher un message de succès
  error.value = ""; // Réinitialiser l'erreur
  alert("Inscription réussie !!!");
  router.push("/login");
};

/*
    // Version avec appel PHP (à activer plus tard)
    try{
        const dataUsers = {
           nom :nom.value,
           email : email.value,
           password : password.value
        };


        const res = await axios.post('http://localhost/Delegg-Hub/SPAvisiteurVuejs/Backend/Inscription.php',dataUsers);

        if(res.data.status === 'success'){
            alert('Inscription réussie !!!');
            router.push('/login');
        }else {
            console.log(res.data.message);
        }
    }catch(err){
        console.log('error lors de l\'inscription', err);
    }
    */
</script>
