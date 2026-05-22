<template>
  <div class="flex justify-center text-[10px] items-center h-full w-full flex-col gap-2">
    <div class="flex w-full max-w-280 flex-col shadow-lg gap-1 rounded-lg">
      <h1 class="text-[20px] font-bold text-amber-50 bg-amber-400  p-5">
        Ajouter un visiteur
      </h1>
      <div class="flex flex-col w-full p-4">
        <form action="" @submit.prevent="handlAdd" class="flex gap-4 flex-col">
          <div class="grid md:grid-cols-2 grid-cols-1">
            <div class="text-slate-800 p-4 flex flex-col gap-2">
              <label for="name" class="font-semibold">Nom du visiteur </label>
              <div
                class="flex items-center gap-2 shadow-2xl border-2 border-dashed p-2 rounded-xl"
              >
                <v-icon name="fa-user" />
                <input
                  type="text"
                  v-model="nom"
                  placeholder="Entrez votre nom"
                  class="w-full focus:outline-none placeholder:text-gray-300 p-1"
                />
              </div>
            </div>

            <div class="text-slate-800 p-4 flex flex-col gap-2">
              <label for="number" class="font-semibold"
                >Numero du visiteur
              </label>
              <div
                class="flex items-center gap-2 shadow-2xl border-2 border-dashed p-2 rounded-xl"
              >
                <v-icon name="fa-phone-alt" />
                <input
                  type="text"
                  v-model="numero"
                  placeholder="Entrer votre numero"
                  class="w-full focus:outline-none p-1 placeholder:text-gray-300"
                />
              </div>
            </div>

            <div class="text-slate-800 p-4 flex flex-col gap-2">
              <label for="Jours" class="font-semibold">Nombre du Jour </label>
              <div
                class="flex items-center gap-2 shadow-2xl border-2 border-dashed p-2 rounded-xl"
              >
                <v-icon name="fa-calendar-day" />
                <input
                  type="number"
                  v-model="nbrjours"
                  placeholder="Nombre du jour"
                  class="w-full focus:outline-none p-1 placeholder:text-gray-300"
                />
              </div>
            </div>

            <div class="text-slate-800 p-4 flex flex-col gap-2">
              <label for="Tarif" class="font-semibold">Tarif journalier </label>
              <div
                class="flex items-center gap-2 shadow-2xl border-2 border-dashed p-2 rounded-xl"
              >
                <v-icon name="fa-dollar-sign" />
                <input
                  type="number"
                  v-model="tarifjournalier"
                  placeholder="Tarif journalier"
                  class="w-full focus:outline-none p-1 placeholder:text-gray-300"
                />
              </div>
            </div>
          </div>

          <div class="flex w-full gap-3 p-2 flex-wrap justify-evenly">
            <button
              type="submit"
              class="bg-orange-600 w-full max-w-80 text-white p-3 rounded-lg font-semibold cursor-pointer hover:bg-orange-500 duration-500"
            >
              <v-icon name="fa-regular-save" />
              Enregistrer
            </button>
            <button
              type="button"
              @click="handlevider"
              class="bg-slate-950 text-white w-full max-w-80 p-3 font-semibold rounded-lg cursor-pointer hover:bg-slate-800 duration-500"
            >
              <v-icon name="fa-regular-sticky-note" />
              Vider
            </button>
          </div>
        </form>
      </div>
    </div>

    <div class="w-96 h-10 flex justify-center items-center rounded-lg mt-5">
      <p v-if="error" class="bg-red-300 px-4 py-2 rounded-lg text-red-600">
        {{ error }}
      </p>
      <p
        v-if="success"
        class="bg-green-300 px-4 py-2 rounded-lg text-green-600"
      >
        {{ success }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>

<script setup>
import axios from "axios";
import { ref } from "vue";
const nom = ref("");
const numero = ref("");
const nbrjours = ref("");
const tarifjournalier = ref("");
const error = ref("");
const success = ref("");

const handlAdd = async () => {
  success.value = "";
  error.value = "";

  if (
    !nom.value ||
    !numero.value ||
    !nbrjours.value ||
    !tarifjournalier.value
  ) {
    error.value = "Veuillez remplir le champs ";
    return;
  }
  try {
    const datavisiteur = {
      Nom: nom.value,
      Numero: numero.value,
      Jours: nbrjours.value,
      Tarif: tarifjournalier.value,
    };
    const res = await axios.post(
      "http://localhost/Delegg-Hub/SPAvisiteurVuejs/src/Backend/Add_liste_visiteurs.php",
      datavisiteur,
    );
    if (res.data.status === "success") {
      success.value = res.data.message;
      nom.value = "";
      numero.value = "";
      nbrjours.value = "";
      tarifjournalier.value = "";
    } else {
      error.value = res.data.message;
    }
  } catch (err) {
    console.log("Erreur lors de l'enregistrement", err);
  }
};

const handlevider = () => {
  nom.value = "";
  numero.value = "";
  nbrjours.value = "";
  tarifjournalier.value = "";
  error.value = "";
  success.value = "";
};
</script>
