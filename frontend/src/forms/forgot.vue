<template>
  <div class="w-full flex items-center justify-center min-h-screen p-6">
    <!-- Section Illustration -->
    <div class="flex-1 hidden md:flex justify-center items-center">
      <img src="/Secure login-pana.svg" class="w-full max-w-lg" alt="Illustration mot de passe oublié" />
    </div>

    <!-- Section Formulaire -->
    <div class="flex-1 flex flex-col justify-center items-center md:items-start">
      <div class="mb-6 w-full max-w-md">
        <div class="badge badge-primary mb-2">visiteur.com</div>
        <h1 class="text-5xl font-bold">Mot de passe oublié</h1>
      </div>

      <form
        @submit.prevent="handleSubmit"
        class="w-full max-w-md bg-base-100 p-6 rounded-box shadow-lg border border-base-200"
      >
        <!-- Message de succès -->
        <div v-if="successMessage" role="status" class="alert alert-success mb-4 py-2 text-sm">
          <v-icon name="fa-check-circle" />
          <span>{{ successMessage }}</span>
        </div>

        <!-- Alerte d'erreur -->
        <div v-if="errorMessage" role="alert" class="alert alert-error mb-4 py-2 text-sm">
          <v-icon name="fa-exclamation-circle" />
          <span>{{ errorMessage }}</span>
        </div>

        <p class="text-sm text-base-content/70 mb-4">
          Saisissez l'adresse email associée à votre compte :
          un lien de réinitialisation vous sera envoyé.
        </p>

        <!-- Champ Email -->
        <div class="mb-4">
          <label class="block text-sm font-semibold mb-1" for="email">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="Ex : admin@gmail.com"
            class="input w-full"
            :disabled="isLoading || successMessage !== null"
          />
        </div>

        <!-- Boutons d'action -->
        <div class="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            class="btn btn-primary flex-1"
            :disabled="isLoading || successMessage !== null"
          >
            <span v-if="isLoading" class="loading loading-spinner loading-sm"></span>
            <span v-else>Envoyer le lien</span>
          </button>
          <router-link to="/" class="btn btn-outline flex-1">Retour à la connexion</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from "../util/api.js";
import { shouldUseDemo, demoForgotPassword } from "../util/auth.js";

export default {
  name: "ForgotPasswordView",
  data() {
    return {
      isLoading: false,
      errorMessage: null,
      successMessage: null,
      form: {
        email: "",
      },
    };
  },
  methods: {
    async handleSubmit() {
      this.errorMessage = null;
      this.successMessage = null;

      // Validation côté client
      if (!this.form.email.trim()) {
        this.errorMessage = "Veuillez saisir votre adresse email.";
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(this.form.email.trim())) {
        this.errorMessage = "Adresse email invalide.";
        return;
      }

      this.isLoading = true;
      try {
        // 1) Tentative auprès du backend
        const response = await api.post("/forgot-password", {
          email: this.form.email,
        });
        this.successMessage =
          (response.data && response.data.message) ||
          `Un lien de réinitialisation a été envoyé à ${this.form.email}.`;
      } catch (error) {
        if (shouldUseDemo(error)) {
          // 2) Backend injoignable ou absent → mode démo
          const result = await demoForgotPassword(this.form.email);
          this.successMessage = result.message;
        } else {
          this.errorMessage =
            (error.response && error.response.data && error.response.data.message) ||
            "Une erreur est survenue. Réessayez plus tard.";
        }
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
