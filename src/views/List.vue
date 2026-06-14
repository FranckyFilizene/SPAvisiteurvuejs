<template>
  <div class="flex flex-col text-[10px] gap-2 text-slate-800 w-full min-h-screen">
    <div class="h-full overflow-auto">
      <div class="w-full h-screen ">
        <div
          class="w-full p-4 gap-3 z-10 sticky top-0 bg-amber-400 rounded-2xl flex items-center flex-wrap justify-evenly">
          <h1 className='text-[15px] font-bold text-white'>Liste des Visiteurs</h1>
          <div class="flex items-center max-w-100 w-full gap-2">
            <input type="text" class="outline-none w-full p-2 bg-slate-50 rounded-lg"
              placeholder="rechercher par nom" v-model="searchQuery" />
          </div>
          <div class="flex gap-2 text-slate-50 max-w-50 w-full items-center">
            <select id="combobox"
              class="bg-slate-800 capitalize flex-1 border-2 outline-none p-2 rounded-lg cursor-pointer">
              <option class="capitalize text-[12px]" v-for="day in dayslist" :key="day" :value="day">
                {{ day }}
              </option>
            </select>
          </div>
        </div>
        <div class="p-3 w-full ">
          <div class="rounded overflow-hidden">
            <div class="bg-slate-800 p-2 flex justify-between items-center">
              <button v-on:click="handleact"
                className='bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-400 duration-300 transition-colors'>
                Actualiser
              </button>
            </div>
            <div className='overflow-x-auto h-150'>
              <table className='w-full text-left border-collapse'>
                <thead>
                  <td className='bg-slate-300 sticky top-0 text-[10px] text-slate-700 uppercase text-sm leading-normal'>
                    <th className='py-3 px-6 border-b border-gray-400'>Nom</th>
                    <th className='py-3 px-6 border-b border-gray-400'>Numéro</th>
                    <th className='py-3 px-6 border-b border-gray-400'>Jours</th>
                    <th className='py-3 px-6 border-b border-gray-400'>Tarif (Ar)</th>
                    <th className='py-3 px-6 border-b border-gray-400 font-bold'>Total (Ar)</th>
                    <th className='py-3 px-6 border-b border-gray-400'>Action</th>
                  </td>
                </thead>
                <tbody class="text-slate-700 text-sm font-light overflow-auto">
                  <tr v-if="filteredVisiteurs.length === 0">
                    <td colspan="6" class="py-10 text-center text-slate-500 italic">
                      Aucun visiteur trouvé pour "{{ searchQuery }}"
                    </td>
                  </tr>
                  <tr v-for="visiteur in filteredVisiteurs" :key="visiteur.id"
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
                      <v-icon name="fa-edit" fill="green" scale="1.5" class="hover:scale-[1.2] duration-500"
                        @click="openEditModal(visiteur)" />
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
        <!-- Overlay avec flou d'arrière-plan -->
        <transition name="modal-fade">
          <div v-if="isEditModalOpen"
            class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            @click.self="isEditModalOpen = false">
            <!-- Conteneur du Modal -->
            <div class="bg-slate-50 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-white">

              <!-- Header -->
              <div class="bg-slate-900 p-4 flex justify-between items-center">
                <h2 class="text-xl font-bold text-white">Modifier le visiteur</h2>
                <button @click="isEditModalOpen = false" class="text-slate-400 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <!-- Corps du formulaire -->
              <div class="p-6 space-y-5">

                <!-- Nom -->
                <div class="space-y-1">
                  <label class="text-sm font-semibold text-slate-700 ml-1">Nom du visiteur</label>
                  <input v-model="formEdit.Nom" type="text"
                    class="w-full bg-white border border-slate-300 rounded-xl p-3 text-slate-900 outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all shadow-sm"
                    placeholder="Ex: Jean Dupont" />
                </div>

                <!-- Numéro -->
                <div class="space-y-1">
                  <label class="text-sm font-semibold text-slate-700 ml-1">Numéro de téléphone</label>
                  <input v-model="formEdit.Numero" type="text"
                    class="w-full bg-white border border-slate-300 rounded-xl p-3 text-slate-900 outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all shadow-sm"
                    placeholder="034 XX XXX XX" />
                </div>

                <!-- Grille Jours/Tarif (Responsive: 1 col sur mobile, 2 sur tablette+) -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div class="space-y-1">
                    <label class="text-sm font-semibold text-slate-700 ml-1">Nombre de jours</label>
                    <input v-model.number="formEdit.Jours" type="number"
                      class="w-full bg-white border border-slate-300 rounded-xl p-3 text-slate-900 outline-none focus:ring-2 focus:ring-orange-500 transition-all shadow-sm" />
                  </div>
                  <div class="space-y-1">
                    <label class="text-sm font-semibold text-slate-700 ml-1">Tarif Journalier (Ar)</label>
                    <input v-model.number="formEdit.Tarif" type="number"
                      class="w-full bg-white border border-slate-300 rounded-xl p-3 text-slate-900 outline-none focus:ring-2 focus:ring-orange-500 transition-all shadow-sm" />
                  </div>
                </div>
              </div>

              <!-- Footer / Actions -->
              <div class="p-6 bg-slate-100 flex flex-col sm:flex-row gap-3">
                <button @click="isEditModalOpen = false"
                  class="w-full sm:w-1/2 px-4 py-3 text-slate-700 font-bold hover:bg-slate-200 rounded-xl transition-colors order-2 sm:order-1">
                  Annuler
                </button>
                <button @click="handleUpdate"
                  class="w-full sm:w-1/2 px-4 py-3 bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-200 hover:bg-orange-500 hover:-translate-y-0.5 active:translate-y-0 transition-all order-1 sm:order-2">
                  Sauvegarder
                </button>
              </div>
            </div>
          </div>
        </transition>

      </div>
    </div>

  </div>
</template>

<style scoped>
/* Animation d'entrée/sortie */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

div::-webkit-scrollbar {
  width: 0;
}
</style>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import axios from "axios";

const erreur = ref('');
const succes = ref('');
const visiteurs = ref([]);
const searchQuery = ref("");

// debut recherche
const filteredVisiteurs = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return visiteurs.value.filter((v) => {
    return v.Nom.toLowerCase().includes(query);
  });
});
// fin recherche

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
    if (response.data.status === "success") {
      succes.value = response.data.message;
      fetchdata(); // Rafraîchir après suppression
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
  formEdit.value = { ...visiteur };
  isEditModalOpen.value = true;
};

const handleUpdate = async () => {
  try {
    const response = await axios.post('http://localhost/Delegg-Hub/SPAvisiteurVuejs/src/Backend/Update_visiteurs.php', formEdit.value);
    if (response.data.status === "success") {
      succes.value = response.data.message;
      isEditModalOpen.value = false;
      fetchdata();
    } else {
      erreur.value = response.data.message;
    }
  } catch (err) {
    console.error(err);
  }
};

const handleact = async () => {
    succes.value = "";
    erreur.value = "";
    await fetchdata();
};

onMounted(() => fetchdata());
</script>