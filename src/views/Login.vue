<template>
  <div class="flex justify-center items-center h-screen w-full">
    <div
      class="bg-slate-200 p-6 rounded-lg w-[30%] flex justify-center items-center flex-col gap-7 shadow-lg"
    >
      <h1 class="text-3xl font-bold text-blue-950">Connexion</h1>
      <form
        action=""
        @submit.prevent="handleLogin"
        class="w-full h-full flex flex-col gap-5"
      >
        <div class="bg-white w-full px-2 py-2 rounded-lg shadow-lg">
          <input
            v-model="nom"
            type="text"
            placeholder="Votre Nom"
            class="w-full focus:outline-none"
          />
        </div>
        <div class="bg-white w-full px-2 py-2 rounded-lg shadow-lg">
          <input
            v-model="password"
            :type="showpassword ? 'text' : 'password'"
            placeholder="Votre Mot de passe"
            class="w-full focus:outline-none"
          />
        </div>
        <router-link to="/inscription" class="text-blue-500 hover:underline">
          Mot de passe oublié?
        </router-link>
        <div class="flex items-center gap-2">
          <input type="checkbox" v-model="showpassword" id="check" />
          <label for="check" class="cursor-pointer select-none">
            afficher les mots de passe
          </label>
        </div>
        <div class="flex justify-between">
          <button
            type="submit"
            class="bg-blue-500 text-white py-2 px-4 rounded-lg duration-500 hover:bg-blue-900 font-semibold shadow"
          >
            Login
          </button>
          <router-link
            to="/inscription"
            class="ml-4 text-blue-500 hover:underline"
          >
            S'inscrire
          </router-link>
        </div>
        <div>
          <p v-if="error" class="text-red-600">{{ error }}</p>
        </div>
      </form>
    </div>
  </div>
</template>

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
            nom: nom.value,
            password: password.value,
        };

        const res = await axios.post(
            'http://localhost/Delegg-Hub/SPAvisiteurVuejs/src/Backend/Login.php',
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
