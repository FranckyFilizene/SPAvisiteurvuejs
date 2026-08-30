<template>
  <div class="w-full flex items-center justify-center min-h-screen p-6">
    <!-- Section Illustration -->
    <div class="flex-1 hidden md:flex justify-center items-center">
      <img src="/Secure login-pana.svg" class="w-full max-w-lg" alt="Illustration de connexion" />
    </div>

    <!-- Section Formulaire -->
    <div class="flex-1 flex flex-col justify-center items-center md:items-start">
      <div class="mb-6 w-full max-w-md">
        <div class="badge badge-primary mb-2">visiteur.com</div>
        <h1 class="text-5xl font-bold">Connexion</h1>
      </div>

      <form
        @submit.prevent="handleSubmit"
        class="w-full max-w-md bg-base-100 p-6 rounded-box shadow-lg border border-base-200"
      >
        <!-- Alerte d'erreur -->
        <div v-if="errorMessage" role="alert" class="alert alert-error mb-4 py-2 text-sm">
          <v-icon name="fa-exclamation-circle" />
          <span>{{ errorMessage }}</span>
        </div>

        <!-- Champ Email / Téléphone -->
        <div class="mb-4">
          <label class="block text-sm font-semibold mb-1" for="identifier">
            Email ou téléphone
          </label>
          <input
            id="identifier"
            v-model="form.identifier"
            type="text"
            placeholder="Ex : admin@visiteur.com"
            class="input w-full"
            :disabled="isLoading"
            autocomplete="username"
          />
        </div>

        <!-- Champ Mot de passe -->
        <div class="mb-4">
          <label class="block text-sm font-semibold mb-1" for="password">Mot de passe</label>
          <div class="relative flex items-center">
            <input
              id="password"
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="••••••••"
              class="input w-full pr-10"
              :disabled="isLoading"
              autocomplete="current-password"
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
        </div>

        <!-- Options supplémentaires -->
        <div class="flex w-full justify-between items-center my-4 text-sm">
          <label class="label cursor-pointer gap-2 p-0">
            <input
              v-model="form.rememberMe"
              type="checkbox"
              class="checkbox checkbox-sm checkbox-primary"
              :disabled="isLoading"
            />
            <span>Se souvenir de moi</span>
          </label>
          <router-link to="/mot-de-passe-oublie" class="link link-hover link-primary">
            Mot de passe oublié ?
          </router-link>
        </div>

        <!-- Boutons d'action -->
        <div class="mt-6 flex flex-col sm:flex-row gap-3">
          <button type="submit" class="btn btn-primary flex-1" :disabled="isLoading">
            <span v-if="isLoading" class="loading loading-spinner loading-sm"></span>
            <span v-else>Se connecter</span>
          </button>
          <router-link to="/inscription" class="btn btn-outline flex-1">S'inscrire</router-link>
        </div>

        <div class="divider my-4 text-xs">OU</div>

        <!-- Info mode démo (backend absent) -->
        <div role="note" class="alert alert-info py-2 text-sm">
          <v-icon name="fa-info-circle" />
          <span>
            Mode démo — connectez-vous avec
            <b>admin@visiteur.com</b> / <b>admin123</b>
          </span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from "../util/api.js";
import { setSession, shouldUseDemo, demoLogin } from "../util/auth.js";

export default {
  name: "LoginView",
  data() {
    return {
      showPassword: false,
      isLoading: false,
      errorMessage: null,
      form: {
        identifier: "",
        password: "",
        rememberMe: false,
      },
    };
  },
  methods: {
    redirectAfterLogin() {
      const redirect = this.$route.query.redirect;
      this.$router.push(
        typeof redirect === "string" && redirect.startsWith("/")
          ? redirect
          : "/dashboard"
      );
    },

    async handleSubmit() {
      this.errorMessage = null;

      // Validation simple côté client
      if (!this.form.identifier.trim()) {
        this.errorMessage = "Veuillez saisir votre email ou votre téléphone.";
        return;
      }
      if (!this.form.password) {
        this.errorMessage = "Veuillez saisir votre mot de passe.";
        return;
      }

      this.isLoading = true;
      try {
        // 1) Tentative auprès du backend
        const response = await api.post("/login", {
          identifier: this.form.identifier,
          password: this.form.password,
          remember_me: this.form.rememberMe,
        });
        const { token, user } = response.data;
        setSession(token, user ?? { name: response.data.name }, this.form.rememberMe);
        this.redirectAfterLogin();
      } catch (error) {
        if (shouldUseDemo(error)) {
          // 2) Backend injoignable ou absent → mode démo (localStorage)
          console.info("[Démo] Backend injoignable, authentification en mode démo.");
          try {
            const { token, user } = await demoLogin(
              this.form.identifier,
              this.form.password
            );
            setSession(token, user, this.form.rememberMe);
            this.redirectAfterLogin();
          } catch (demoError) {
            this.errorMessage = demoError.message;
          }
        } else {
          this.errorMessage =
            (error.response && error.response.data && error.response.data.message) ||
            "Identifiants invalides.";
        }
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
