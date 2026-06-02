<template>
    <div class="flex flex-col gap-4 w-full p-1">
        <div
            class="bg-amber-400 rounded-2xl shadow-md p-3 flex items-center gap-3"
        >
            <div
                class="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0"
            >
                <v-icon name="fa-user-plus" class="text-white" scale="1" />
            </div>
            <div>
                <h1 class="text-sm font-bold text-white">
                    Ajouter un visiteur
                </h1>
                <p class="text-[10px] text-white/70">
                    Remplissez les informations ci-dessous
                </p>
            </div>
        </div>

        <transition name="slide-fade">
            <div
                v-if="success"
                class="flex items-center gap-3 bg-emerald-500/10 border border-emerald-400/40 text-emerald-700 rounded-xl px-4 py-3 text-xs font-medium"
            >
                <v-icon name="fa-check-circle" scale="1" class="shrink-0" />
                {{ success }}
                <button
                    @click="success = ''"
                    class="ml-auto text-emerald-500/60 hover:text-emerald-600"
                >
                    <v-icon name="fa-times-circle" scale="0.8" />
                </button>
            </div>
        </transition>
        <transition name="slide-fade">
            <div
                v-if="error"
                class="flex items-center gap-3 bg-red-500/10 border border-red-400/40 text-red-600 rounded-xl px-4 py-3 text-xs font-medium"
            >
                <v-icon name="fa-times-circle" scale="1" class="shrink-0" />
                {{ error }}
                <button
                    @click="error = ''"
                    class="ml-auto text-red-400/60 hover:text-red-500"
                >
                    <v-icon name="fa-times-circle" scale="0.8" />
                </button>
            </div>
        </transition>

        <form @submit.prevent="handlAdd">
            <div
                class="rounded-2xl overflow-hidden border border-slate-200/60 shadow-sm bg-white/60"
            >
                <div
                    class="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100"
                >
                    <!-- Nom -->
                    <div class="p-5 flex flex-col gap-2">
                        <label
                            class="text-[10px] font-semibold text-slate-500 flex items-center gap-1 uppercase tracking-wide"
                        >
                            <v-icon
                                name="fa-user"
                                scale="0.8"
                                class="text-amber-400"
                            />
                            Nom du visiteur
                        </label>
                        <div
                            :class="[
                                'flex items-center gap-2 border rounded-xl px-3 py-2.5 transition-all duration-200',
                                nom
                                    ? 'border-amber-400 bg-amber-50/40'
                                    : 'border-slate-200 bg-slate-50/50 hover:border-slate-300',
                            ]"
                        >
                            <v-icon
                                name="fa-user"
                                class="text-slate-300 shrink-0"
                                scale="0.85"
                            />
                            <input
                                type="text"
                                v-model="nom"
                                placeholder="Ex: Jean Dupont"
                                class="flex-1 outline-none text-xs bg-transparent text-slate-700 placeholder:text-slate-300"
                            />
                            <transition name="fade">
                                <v-icon
                                    v-if="nom"
                                    name="fa-check-circle"
                                    class="text-amber-400 shrink-0"
                                    scale="0.85"
                                />
                            </transition>
                        </div>
                    </div>

                    <div class="p-5 flex flex-col gap-2">
                        <label
                            class="text-[10px] font-semibold text-slate-500 flex items-center gap-1 uppercase tracking-wide"
                        >
                            <v-icon
                                name="fa-phone-alt"
                                scale="0.8"
                                class="text-amber-400"
                            />
                            Numéro du visiteur
                        </label>
                        <div
                            :class="[
                                'flex items-center gap-2 border rounded-xl px-3 py-2.5 transition-all duration-200',
                                numero
                                    ? 'border-amber-400 bg-amber-50/40'
                                    : 'border-slate-200 bg-slate-50/50 hover:border-slate-300',
                            ]"
                        >
                            <v-icon
                                name="fa-phone-alt"
                                class="text-slate-300 shrink-0"
                                scale="0.85"
                            />
                            <input
                                type="text"
                                v-model="numero"
                                placeholder="034 XX XXX XX"
                                class="flex-1 outline-none text-xs bg-transparent text-slate-700 placeholder:text-slate-300"
                            />
                            <transition name="fade">
                                <v-icon
                                    v-if="numero"
                                    name="fa-check-circle"
                                    class="text-amber-400 shrink-0"
                                    scale="0.85"
                                />
                            </transition>
                        </div>
                    </div>

                    <div
                        class="p-5 flex flex-col gap-2 md:border-t border-slate-100"
                    >
                        <label
                            class="text-[10px] font-semibold text-slate-500 flex items-center gap-1 uppercase tracking-wide"
                        >
                            <v-icon
                                name="fa-calendar-day"
                                scale="0.8"
                                class="text-amber-400"
                            />
                            Nombre de jours
                        </label>
                        <div
                            :class="[
                                'flex items-center gap-2 border rounded-xl px-3 py-2.5 transition-all duration-200',
                                nbrjours
                                    ? 'border-amber-400 bg-amber-50/40'
                                    : 'border-slate-200 bg-slate-50/50 hover:border-slate-300',
                            ]"
                        >
                            <v-icon
                                name="fa-calendar-day"
                                class="text-slate-300 shrink-0"
                                scale="0.85"
                            />
                            <input
                                type="number"
                                v-model="nbrjours"
                                min="1"
                                placeholder="Ex: 3"
                                class="flex-1 outline-none text-xs bg-transparent text-slate-700 placeholder:text-slate-300"
                            />
                            <transition name="fade">
                                <v-icon
                                    v-if="nbrjours"
                                    name="fa-check-circle"
                                    class="text-amber-400 shrink-0"
                                    scale="0.85"
                                />
                            </transition>
                        </div>
                    </div>

                    <div
                        class="p-5 flex flex-col gap-2 md:border-t border-slate-100"
                    >
                        <label
                            class="text-[10px] font-semibold text-slate-500 flex items-center gap-1 uppercase tracking-wide"
                        >
                            <v-icon
                                name="fa-dollar-sign"
                                scale="0.8"
                                class="text-amber-400"
                            />
                            Tarif journalier (Ar)
                        </label>
                        <div
                            :class="[
                                'flex items-center gap-2 border rounded-xl px-3 py-2.5 transition-all duration-200',
                                tarifjournalier
                                    ? 'border-amber-400 bg-amber-50/40'
                                    : 'border-slate-200 bg-slate-50/50 hover:border-slate-300',
                            ]"
                        >
                            <v-icon
                                name="fa-dollar-sign"
                                class="text-slate-300 shrink-0"
                                scale="0.85"
                            />
                            <input
                                type="number"
                                v-model="tarifjournalier"
                                min="0"
                                placeholder="Ex: 50000"
                                class="flex-1 outline-none text-xs bg-transparent text-slate-700 placeholder:text-slate-300"
                            />
                            <transition name="fade">
                                <v-icon
                                    v-if="tarifjournalier"
                                    name="fa-check-circle"
                                    class="text-amber-400 shrink-0"
                                    scale="0.85"
                                />
                            </transition>
                        </div>
                    </div>
                </div>

                <div
                    v-if="nbrjours && tarifjournalier"
                    class="mx-5 mb-5 mt-2 flex justify-between items-center bg-amber-400/10 border border-amber-400/25 rounded-xl px-4 py-3"
                >
                    <div class="text-xs text-slate-500">
                        <p class="font-medium">Total estimé</p>
                        <p class="text-[10px] opacity-60">
                            {{ nbrjours }}j ×
                            {{ Number(tarifjournalier).toLocaleString() }} Ar
                        </p>
                    </div>
                    <span class="text-base font-bold text-amber-400">
                        {{ (nbrjours * tarifjournalier).toLocaleString() }} Ar
                    </span>
                </div>

           
                <div
                    class="border-t border-slate-100 px-5 py-4 flex flex-wrap gap-3 justify-end bg-slate-50/40"
                >
                    <button
                        type="button"
                        @click="handlevider"
                        class="flex items-center gap-2 text-slate-500 border border-slate-200 hover:bg-slate-100 hover:border-slate-300 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all"
                    >
                        <v-icon name="fa-sticky-note" scale="0.85" />
                        Vider
                    </button>
                    <button
                        type="submit"
                        :disabled="!formValide"
                        :class="[
                            'flex items-center gap-2 text-xs font-semibold px-5 py-2.5 rounded-xl transition-all',
                            formValide
                                ? 'bg-amber-400 hover:bg-amber-500 text-white shadow-md shadow-amber-400/30 hover:scale-105 active:scale-95'
                                : 'bg-slate-200 text-slate-400 cursor-not-allowed',
                        ]"
                    >
                        <v-icon name="fa-save" scale="0.85" />
                        Enregistrer
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import axios from "axios";
import { ref, computed } from "vue";

const nom = ref("");
const numero = ref("");
const nbrjours = ref("");
const tarifjournalier = ref("");
const error = ref("");
const success = ref("");

const formValide = computed(
    () => nom.value && numero.value && nbrjours.value && tarifjournalier.value,
);

const handlAdd = async () => {
    success.value = "";
    error.value = "";

    if (!formValide.value) {
        error.value = "Veuillez remplir tous les champs.";
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
            handlevider();
        } else {
            error.value = res.data.message;
        }
    } catch (err) {
        error.value = "Erreur lors de l'enregistrement.";
        console.error(err);
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

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.3s ease;
}
.slide-fade-enter-from {
    opacity: 0;
    transform: translateY(-6px);
}
.slide-fade-leave-to {
    opacity: 0;
    transform: translateY(-3px);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
