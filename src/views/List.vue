<template>
  <div class="flex flex-col gap-2 text-slate-800 w-full min-h-screen px-3">
    <div class="h-full overflow-auto">
      <div class="w-full h-screen pt-22.5">
        <div
          class="w-[80%] p-2 gap-3 fixed top-[5.8rem] z-1 bg-slate-800 border-b-2 border-slate-800 flex items-center justify-center">
          <img src="/public/listLogo.png" class="max-w-30 w-full h-full max-h-30" alt="" />
          <div class="flex items-center max-w-100 w-full gap-2">
            <input type="text" class="border-3 outline-none w-full p-2 bg-slate-50 border-slate-800 rounded-lg"
              placeholder="rechercher par nom" />
          </div>
          <div class="flex gap-2 text-slate-50  max-w-80 w-full items-center">
            <label for="combobox">
              filtre par :
            </label>
            <select id="combobox"
              class="bg-slate-800  capitalize flex-1 border-3 outline-none p-2 rounded-lg cursor-pointer">
              <option class="capitalize text-[12px]" v-for="day in dayslist" :key="day" :value="day">
                {{ day }}
              </option>
            </select>
          </div>
        </div>
        <div class="p-8 w-full h-full">
          <div class="bg-slate-200 rounded-xl shadow-2xl overflow-hidden">
            <div class="bg-slate-800 p-6 flex justify-between items-center">
              <h1 className='text-2xl font-bold text-white'>Liste des Visiteurs</h1>
              <button v-on:click="handleact"
                className='bg-orange-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors'>
                Actualiser
              </button>
            </div>
            <div className='overflow-x-auto'>
              <table className='w-full text-left border-collapse'>
                <thead>
                  <tr className='bg-slate-300 text-slate-700 uppercase text-sm leading-normal'>
                    <th className='py-3 px-6 border-b border-gray-400'>Nom</th>
                    <th className='py-3 px-6 border-b border-gray-400'>Numéro</th>
                    <th className='py-3 px-6 border-b border-gray-400'>Jours</th>
                    <th className='py-3 px-6 border-b border-gray-400'>Tarif (Ar)</th>
                    <th className='py-3 px-6 border-b border-gray-400 font-bold'>Total (Ar)</th>
                    <th className='py-3 px-6 border-b border-gray-400'>Action</th>
                  </tr>
                </thead>
                <tbody class="text-slate-700 text-sm font-light overflow-auto">
                  <tr v-for="visiteur in visiteurs" :key="visiteur.id"
                    class="border-b border-gray-300 hover:bg-slate-100 transition-colors">
                    <td class="py-3 px-6 flex items-center gap-2">
                      {{ visiteur.Nom }}
                    </td>
                    <td class="py-3 px-6">
                      {{ visiteur.Numero }}
                    </td>
                    <td class="py-3 px-6 font-medium">{{ visiteur.Jours }}</td>
                    <td class="py-3 px-6">{{ visiteur.Tarif }} Ar</td>
                    <td class="py-3 px-6 font-bold text-blue-900">{{ visiteur.Total }} Ar</td>
                    <td class="py-3 px-6 flex justify-start items-center gap-10">
                      <v-icon name="fa-edit" fill="green" scale="1.5" class="hover:scale-[1.2] duration-500
                      " @click="openEditModal(visiteur)" />
                      <v-icon name="fa-trash" fill="red" scale="1.5" class="hover:scale-[1.2] duration-500"
                        @click="handledelet(visiteur.id)" />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="">
                <p v-if="succes" class="bg-green-200 text-green-600 px-3 py-2">{{ succes }}</p>
                <p v-if="erreur" class="bg-red-300 text-red-600 px-3 py-2">{{ erreur }}</p>
              </div>
            </div>
          </div>
        </div>
        {/*edit */}
        <div v-if="isEditModalOpen" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div class="bg-white p-6 rounded-lg w-96">
            <h2 class="text-xl font-bold mb-4">Modifier le visiteur</h2>
            <input v-model="formEdit.Nom" class="w-full border p-2 mb-2" placeholder="Nom" />
            <input v-model="formEdit.Numero" class="w-full border p-2 mb-2" placeholder="Numéro" />
            <input v-model.number="formEdit.Jours" type="number" class="w-full border p-2 mb-2" />
            <input v-model.number="formEdit.Tarif" type="number" class="w-full border p-2 mb-4" />

            <div class="flex justify-end gap-2">
              <button @click="isEditModalOpen = false" class="bg-gray-400 px-4 py-2 rounded">Annuler</button>
              <button @click="handleUpdate" class="bg-blue-600 text-white px-4 py-2 rounded">Sauvegarder</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
const erreur = ref('');
const succes = ref('');
const visiteurs = ref([]);

const fetchdata = async () => {
  try {
    const res = await axios.get('http://localhost/Delegg-Hub/SPAvisiteurVuejs/src/Backend/Liste_visiteurs.php');
    visiteurs.value = res.data;
    console.log("visiteur recupéré avec succée :", visiteurs.value);

  } catch (err) {
    console.log("error :", err);
  }
}

const handledelet = async (id) => {
  erreur.value = '';
  succes.value = '';
  try {
    const response = await axios.post(`http://localhost/Delegg-Hub/SPAvisiteurVuejs/src/Backend/Delete_visiteurs.php?id=${id}`);
    if (response.data.status = "success") {
      succes.value = response.data.message
    } else {
      erreur.value = response.data.message;
    }
  } catch (err) {
    console.log(err);
  }
}

const isEditModalOpen = ref(false);
const formEdit = ref({
  id: '',
  Nom: '',
  Numero: '',
  Jours: 0,
  Tarif: 0
});

// Remplir le formulaire et ouvrir la modale
const openEditModal = (visiteur) => {
  formEdit.value = { ...visiteur }; // On fait une copie pour ne pas modifier la liste en direct
  isEditModalOpen.value = true;
};

const handleUpdate = async () => {
  try {
    const response = await axios.post('http://localhost/Delegg-Hub/SPAvisiteurVuejs/src/Backend/Update_visiteurs.php', formEdit.value);
    if (response.data.status === "success") {
      succes.value = response.data.message;
      isEditModalOpen.value = false; // Fermer la modale
      fetchdata(); // Rafraîchir la table
    } else {
      erreur.value = response.data.message;
    }
  } catch (err) {
    console.error(err);
  }
};

const handleact = () => {
  fetchdata();
  succes.value = '';
  erreur.value = '';
}

const dayslist = ref([
  "tout",
  "dernier jour",
  "dernier semaine",
  "dernier mois",
]);

const selectedDay = ref("");

onMounted(() => {
  fetchdata();
})
</script>
