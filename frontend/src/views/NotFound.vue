<template>
  <div class="min-h-screen flex flex-col items-center justify-center gap-6 p-6 text-center">
    <div class="badge badge-primary">visiteur.com</div>
    <h1 class="text-8xl font-bold text-primary">404</h1>
    <p class="text-xl font-semibold">Oups ! Cette page n'existe pas.</p>
    <p class="text-base-content/70 max-w-md">
      La page que vous recherchez a peut-être été déplacée,
      supprimée ou n'a jamais existé.
    </p>
    <div class="flex gap-3">
      <router-link to="/" class="btn btn-outline">Retour à la connexion</router-link>
      <router-link to="/dashboard" class="btn btn-primary">Tableau de bord</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFoundView",
};
</script>
