<template>
    <div class="flex justify-center items-center h-full w-full flex-col gap-2">
        <div class="flex flex-col shadow-lg gap-1 w-[90%] rounded-lg">
            <div class="text-2xl font-bold text-amber-50 bg-slate-800 p-5 rounded-t-lg">
                <h1>Ajouter un visiteur</h1>
            </div>
            <div class="flex flex-col w-full gap-2 p-3">
                <form action="" @submit.prevent="handlAdd">
                    <div class="flex justify-between items-center gap-1 p-2">
                        <div class="flex flex-col justify-start items-start gap-2">
                            <div class="text-gray-400">
                                <label for="name">Nom du visiteur</label>
                            </div>
                            <div
                                class="bg-white w-96 h-12 flex justify-start items-center px-2 gap-2 rounded-lg border border-gray-500">
                                <span
                                    class="bg-gray-300 w-7 h-7 rounded-3xl text-amber-50 flex justify-center items-center">N</span>
                                <input type="text" v-model="nom" placeholder="Entrez votre nom"
                                    class="w-full focus:outline-none">
                            </div>
                        </div>
                        <div class="flex flex-col justify-start items-start gap-2">
                            <div class="text-gray-600">
                                <label for="number">Numero du visiteur</label>
                            </div>
                            <div
                                class="bg-white w-96 h-12 border border-gray-500 flex justify-start items-center px-2 gap-2 rounded-lg">
                                <span
                                    class="bg-gray-300 w-7 h-7 rounded-3xl text-amber-50 flex justify-center items-center">N</span>
                                <input type="text" v-model="numero" placeholder="Entrer votre numero"
                                    class="w-full focus:outline-none">
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-between items-center gap-1 p-2">
                        <div class="flex flex-col justify-start items-start gap-2">
                            <div class="text-gray-500">
                                <label for="Jours">Nombre du Jour</label>
                            </div>
                            <div
                                class="bg-white w-96 h-12 border border-gray-500 flex justify-start items-center px-2 gap-2 rounded-lg">
                                <span
                                    class="bg-gray-300 w-7 h-7 rounded-3xl text-amber-50 flex justify-center items-center">N</span>
                                <input type="number" v-model="nbrjours" placeholder="Nombre du jour"
                                    class="w-full focus:outline-none">
                            </div>
                        </div>
                        <div class="flex flex-col justify-start items-start gap-2">
                            <div class="text-gray-500">
                                <label for="Tarif">Tarif journalier</label>
                            </div>
                            <div class="bg-white w-96 h-12 border border-gray-500 flex justify-start items-center px-2 gap-2 rounded-lg">
                                <span
                                    class="bg-gray-300 w-7 h-7 rounded-3xl text-amber-50 flex justify-center items-center">N</span>
                                <input type="number" v-model="tarifjournalier" placeholder="Tarif journalier"
                                    class="w-full focus:outline-none">
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-center items-center mt-16 gap-10">
                        <button type="submit"
                            class="bg-green-700 text-white px-3 py-2 rounded-lg font-semibold cursor-pointer hover:bg-green-500 duration-500">Enregistrer</button>
                        <button type="button" @click="handlevider"
                            class="bg-blue-800 text-white px-8 py-2 font-semibold rounded-lg cursor-pointer hover:bg-blue-500 duration-500">Vider</button>
                    </div>
                </form>
            </div>
        </div>
        <div class="w-96 h-10 flex justify-center items-center rounded-lg mt-5">
            <p v-if="error" class="bg-red-300 px-4 py-2 rounded-lg text-red-600">{{ error }}</p>
            <p v-if="success" class="bg-green-300 px-4 py-2 rounded-lg text-green-600">{{ success }}</p>
        </div>
    </div>
</template>

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
            Nom : nom.value,
            Numero: numero.value,
            Jours: nbrjours.value,
            Tarif: tarifjournalier.value
        }
        const res = await axios.post(
            'http://localhost/Delegg-Hub/SPAvisiteurVuejs/Backend/Add_liste_visiteurs.php',
             datavisiteur
        );
        if (res.data.status === 'success') {
            success.value = res.data.message;
            nom.value='';
            numero.value='';
            nbrjours.value='';
            tarifjournalier.value='';
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