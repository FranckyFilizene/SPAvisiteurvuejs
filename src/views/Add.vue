<template>
    <div class="flex flex-col justify-center items-center min-h-full w-full p-4 md:p-10">
        <!-- Conteneur Principal -->
        <div class="flex flex-col shadow-2xl w-full max-w-4xl rounded-xl overflow-hidden bg-white">

            <!-- Header -->
            <div class="bg-slate-900 p-6">
                <h1 class="text-2xl font-bold text-amber-50 flex items-center gap-3">
                    <v-icon name="fa-user-plus" scale="1.2" />
                    Ajouter un nouveau visiteur
                </h1>
            </div>

            <!-- Formulaire -->
            <div class="p-6 md:p-10">
                <form @submit.prevent="handlAdd" class="space-y-8">

                    <!-- Grille des champs -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <!-- Nom -->
                        <div class="flex flex-col gap-2">
                            <label for="name" class="font-semibold text-slate-700">Nom du visiteur</label>
                            <div
                                class="group flex items-center px-4 gap-3 bg-slate-50 border border-slate-300 h-12 rounded-lg focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-transparent transition-all">
                                <v-icon name="fa-user" class="text-slate-400 group-focus-within:text-orange-500" />
                                <input id="name" type="text" v-model="nom" placeholder="Ex: Jean Dupont"
                                    class="w-full bg-transparent focus:outline-none text-slate-800 placeholder:text-slate-300">
                            </div>
                        </div>

                        <!-- Numéro -->
                        <div class="flex flex-col gap-2">
                            <label for="number" class="font-semibold text-slate-700">Numéro de téléphone</label>
                            <div
                                class="group flex items-center px-4 gap-3 bg-slate-50 border border-slate-300 h-12 rounded-lg focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-transparent transition-all">
                                <v-icon name="fa-phone-alt" class="text-slate-400 group-focus-within:text-orange-500" />
                                <input id="number" type="text" v-model="numero" placeholder="034 00 000 00"
                                    class="w-full bg-transparent focus:outline-none text-slate-800 placeholder:text-slate-300">
                            </div>
                        </div>

                        <!-- Jours -->
                        <div class="flex flex-col gap-2">
                            <label for="Jours" class="font-semibold text-slate-700">Nombre de jours</label>
                            <div
                                class="group flex items-center px-4 gap-3 bg-slate-50 border border-slate-300 h-12 rounded-lg focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-transparent transition-all">
                                <v-icon name="fa-calendar-day"
                                    class="text-slate-400 group-focus-within:text-orange-500" />
                                <input id="Jours" type="number" v-model="nbrjours" placeholder="0"
                                    class="w-full bg-transparent focus:outline-none text-slate-800 placeholder:text-slate-300">
                            </div>
                        </div>

                        <!-- Tarif -->
                        <div class="flex flex-col gap-2">
                            <label for="Tarif" class="font-semibold text-slate-700">Tarif journalier (Ar)</label>
                            <div
                                class="group flex items-center px-4 gap-3 bg-slate-50 border border-slate-300 h-12 rounded-lg focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-transparent transition-all">
                                <v-icon name="fa-dollar-sign"
                                    class="text-slate-400 group-focus-within:text-orange-500" />
                                <input id="Tarif" type="number" v-model="tarifjournalier" placeholder="0.00"
                                    class="w-full bg-transparent focus:outline-none text-slate-800 placeholder:text-slate-300">
                            </div>
                        </div>
                    </div>

                    <!-- Boutons d'action -->
                    <div class="flex flex-col sm:flex-row justify-center items-center mt-10 gap-4">
                        <button type="submit" :disabled="loading"
                            class="w-full sm:w-auto bg-orange-600 text-white px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-orange-500 hover:scale-105 active:scale-95 duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-200">
                            <v-icon :name="loading ? 'fa-spinner' : 'fa-regular-save'"
                                :animation="loading ? 'spin' : ''" />
                            {{ loading ? 'Enregistrement...' : 'Enregistrer le visiteur' }}
                        </button>

                        <button type="button" @click="handlevider"
                            class="w-full sm:w-auto bg-slate-100 text-slate-600 px-8 py-3 font-bold rounded-xl hover:bg-slate-200 active:scale-95 duration-200">
                            <v-icon name="fa-trash-alt" class="mr-2" />
                            Vider les champs
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Notifications de statut -->
        <div class="mt-6 min-h-[50px]">
            <transition name="fade" mode="out-in"> <!-- mode="out-in" pour une transition fluide -->
                <p v-if="error" key="error"
                    class="bg-red-50 border border-red-200 px-6 py-2 rounded-full text-red-600 font-medium flex items-center gap-2">
                    <v-icon name="fa-exclamation-circle" /> {{ error }}
                </p>
                <p v-else-if="success" key="success"
                    class="bg-green-50 border border-green-200 px-6 py-2 rounded-full text-green-600 font-medium flex items-center gap-2">
                    <v-icon name="fa-check-circle" /> {{ success }}
                </p>
            </transition>
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
import axios from 'axios';
import { ref } from 'vue';
const nom = ref('');
const numero = ref('');
const nbrjours = ref('');
const tarifjournalier = ref('');
const error = ref('');
const success = ref('');

const handlAdd = async () => {
    success.value = '';
    error.value = '';

    if (!nom.value || !numero.value || !nbrjours.value || !tarifjournalier.value) {
        error.value = 'Veuillez remplir le champs ';
        return;
    }
    try {
        const datavisiteur = {
            Nom: nom.value,
            Numero: numero.value,
            Jours: nbrjours.value,
            Tarif: tarifjournalier.value
        }
        const res = await axios.post(
            'http://localhost/Delegg-Hub/SPAvisiteurVuejs/src/Backend/Add_liste_visiteurs.php',
            datavisiteur
        );
        if (res.data.status === 'success') {
            success.value = res.data.message;
            nom.value = '';
            numero.value = '';
            nbrjours.value = '';
            tarifjournalier.value = '';
        } else {
            error.value = res.data.message;
        }
    } catch (err) {
        console.log("Erreur lors de l'enregistrement", err);
    }
}

const handlevider = () => {
    nom.value = '';
    numero.value = '';
    nbrjours.value = '';
    tarifjournalier.value = '';
    error.value = '';
    success.value = '';
}
</script>