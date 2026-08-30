<template>
  <div class="w-full flex items-center justify-center min-h-screen p-6">
    <!-- Section Illustration -->
    <div class="flex-1 hidden md:flex justify-center items-center">
      <img src="/Filing system-pana.svg" class="w-full max-w-lg" alt="Illustration d'inscription" />
    </div>

    <!-- Section Formulaire -->
    <div class="flex-1 flex flex-col justify-center items-center md:items-start">
      <div class="mb-6 w-full max-w-md">
        <div class="badge badge-primary mb-2">visiteur.com</div>
        <h1 class="text-5xl font-bold">Inscription</h1>
      </div>

      <form
        @submit.prevent="handleSubmit"
        class="w-full max-w-md bg-base-100 p-6 rounded-box shadow-lg border border-base-200"
      >
        <!-- Alerte globale d'erreur -->
        <div v-if="errorMessage" role="alert" class="alert alert-error mb-4 py-2 text-sm">
          <v-icon name="fa-exclamation-circle" />
          <span>{{ errorMessage }}</span>
        </div>

        <!-- Nom + Nom d'utilisateur -->
        <div class="flex gap-3 w-full">
          <div class="flex-1 mb-4">
            <label class="block text-sm font-semibold mb-1" for="name">Nom</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              placeholder="Ex : Admin"
              class="input w-full"
              :class="{ 'input-error': errors.name }"
              :disabled="isLoading"
            />
            <span v-if="errors.name" class="text-error text-xs">{{ errors.name }}</span>
          </div>
          <div class="flex-1 mb-4">
            <label class="block text-sm font-semibold mb-1" for="username">Nom d'utilisateur</label>
            <input
              id="username"
              v-model="form.username"
              type="text"
              placeholder="Ex : admin0000"
              class="input w-full"
              :class="{ 'input-error': errors.username }"
              :disabled="isLoading"
            />
            <span v-if="errors.username" class="text-error text-xs">{{ errors.username }}</span>
          </div>
        </div>

        <!-- Téléphone -->
        <div class="mb-4">
          <label class="block text-sm font-semibold mb-1" for="telephone">Téléphone</label>
          <input
            id="telephone"
            v-model="form.telephone"
            type="tel"
            placeholder="Ex : 034 12 345 67"
            class="input w-full"
            :class="{ 'input-error': errors.telephone }"
            :disabled="isLoading"
          />
          <span v-if="errors.telephone" class="text-error text-xs">{{ errors.telephone }}</span>
        </div>

        <!-- Email -->
        <div class="mb-4">
          <label class="block text-sm font-semibold mb-1" for="email">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="Ex : admin@gmail.com"
            class="input w-full"
            :class="{ 'input-error': errors.email }"
            :disabled="isLoading"
          />
          <span v-if="errors.email" class="text-error text-xs">{{ errors.email }}</span>
        </div>

        <!-- Mot de passe -->
        <div class="mb-4">
          <label class="block text-sm font-semibold mb-1" for="password">Mot de passe</label>
          <div class="relative flex items-center">
            <input
              id="password"
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="8 caractères minimum"
              class="input w-full pr-10"
              :class="{ 'input-error': errors.password }"
              :disabled="isLoading"
              autocomplete="new-password"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 text-base-content/60 hover:text-base-content transition-colors"
              aria-label="Afficher ou masquer le mot de passe"
            >
              <v-icon :name="showPassword ? 'fa-eye-slash' : 'fa-eye'" />
            </button>
          </div>
          <span v-if="errors.password" class="text-error text-xs">{{ errors.password }}</span>
        </div>

        <!-- Confirmation du mot de passe -->
        <div class="mb-4">
          <label class="block text-sm font-semibold mb-1" for="confirmPassword">
            Confirmer le mot de passe
          </label>
          <div class="relative flex items-center">
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="Répétez le mot de passe"
              class="input w-full pr-10"
              :class="{ 'input-error': errors.confirmPassword }"
              :disabled="isLoading"
              autocomplete="new-password"
            />
            <button
              type="button"
              @click="showConfirmPassword = !showConfirmPassword"
              class="absolute right-3 text-base-content/60 hover:text-base-content transition-colors"
              aria-label="Afficher ou masquer la confirmation"
            >
              <v-icon :name="showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'" />
            </button>
          </div>
          <span v-if="errors.confirmPassword" class="text-error text-xs">
            {{ errors.confirmPassword }}
          </span>
        </div>

        <!-- Conditions d'utilisation -->
        <div class="flex flex-col my-3 text-sm">
          <label class="label cursor-pointer gap-2 p-0">
            <input
              id="terms"
              v-model="form.acceptTerms"
              type="checkbox"
              class="checkbox checkbox-sm checkbox-primary"
              :disabled="isLoading"
            />
            <span>J'accepte les termes et conditions</span>
          </label>
          <span v-if="errors.acceptTerms" class="text-error text-xs mt-1">
            {{ errors.acceptTerms }}
          </span>
        </div>

        <!-- Boutons d'action -->
        <div class="mt-4 flex flex-col sm:flex-row gap-3">
          <button type="submit" class="btn btn-primary flex-1" :disabled="isLoading">
            <span v-if="isLoading" class="loading loading-spinner loading-sm"></span>
            <span v-else>S'inscrire</span>
          </button>
          <router-link to="/" class="btn btn-outline flex-1">Connexion</router-link>
        </div>

        <div class="divider my-4 text-xs">DÉJÀ INSCRIT ?</div>
        <p class="text-sm text-base-content/70 text-center">
          Vous avez déjà un compte ?
          <router-link to="/" class="link link-primary link-hover">Connectez-vous</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import api from "../util/api.js";
import { setSession, shouldUseDemo, demoRegister } from "../util/auth.js";

export default {
  name: "InscriptionView",
  data() {
    return {
      showPassword: false,
      showConfirmPassword: false,
      isLoading: false,
      errorMessage: null,
      form: {
        name: "",
        username: "",
        telephone: "",
        email: "",
        password: "",
        confirmPassword: "",
        acceptTerms: false,
      },
      errors: {},
    };
  },
  methods: {
    validate() {
      const errors = {};

      if (!this.form.name.trim()) {
        errors.name = "Le nom est obligatoire.";
      }
      if (!this.form.username.trim()) {
        errors.username = "Le nom d'utilisateur est obligatoire.";
      }
      if (!this.form.telephone.trim()) {
        errors.telephone = "Le téléphone est obligatoire.";
      } else if (!/^[+0-9][0-9\s().-]{7,}$/.test(this.form.telephone.trim())) {
        errors.telephone = "Numéro de téléphone invalide.";
      }
      if (!this.form.email.trim()) {
        errors.email = "L'email est obligatoire.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(this.form.email.trim())) {
        errors.email = "Adresse email invalide.";
      }
      if (!this.form.password) {
        errors.password = "Le mot de passe est obligatoire.";
      } else if (this.form.password.length < 8) {
        errors.password = "8 caractères minimum.";
      }
      if (this.form.confirmPassword !== this.form.password) {
        errors.confirmPassword = "Les mots de passe ne correspondent pas.";
      }
      if (!this.form.acceptTerms) {
        errors.acceptTerms = "Vous devez accepter les termes et conditions.";
      }

      this.errors = errors;
      return Object.keys(errors).length === 0;
    },

    async handleSubmit() {
      this.errorMessage = null;
      if (!this.validate()) return;

      this.isLoading = true;
      try {
        // 1) Tentative auprès du backend
        const response = await api.post("/register", {
          name: this.form.name,
          username: this.form.username,
          telephone: this.form.telephone,
          email: this.form.email,
          password: this.form.password,
        });
        const { token, user } = response.data;
        setSession(
          token,
          user ?? { name: this.form.name, email: this.form.email },
          true
        );
        this.$router.push("/dashboard");
      } catch (error) {
        if (shouldUseDemo(error)) {
          // 2) Backend injoignable ou absent → mode démo (localStorage)
          console.info("[Démo] Backend injoignable, inscription en mode démo.");
          try {
            const { token, user } = await demoRegister({
              name: this.form.name.trim(),
              username: this.form.username.trim(),
              telephone: this.form.telephone.trim(),
              email: this.form.email.trim(),
              password: this.form.password,
            });
            setSession(token, user, true);
            this.$router.push("/dashboard");
          } catch (demoError) {
            this.errorMessage = demoError.message;
          }
        } else {
          this.errorMessage =
            (error.response && error.response.data && error.response.data.message) ||
            "Impossible de créer le compte. Vérifiez vos informations.";
        }
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

