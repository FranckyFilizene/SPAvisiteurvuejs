<template>
    <div class="flex flex-col gap-4 w-full p-1">
        <div class="bg-amber-400 rounded-2xl shadow-md p-3 flex flex-col gap-3">
            <div class="flex items-center justify-between">
                <div
                    class="flex items-center gap-2 text-white font-bold text-sm"
                >
                    <v-icon name="fa-th-list" scale="1" />
                    Liste des visiteurs
                    <span
                        class="bg-slate-800 text-white text-[10px] font-bold px-2 py-0.5 rounded-full"
                    >
                        {{ filteredVisiteurs.length }}
                    </span>
                </div>
                <button
                    @click="handleact"
                    :disabled="loading"
                    class="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-60 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-all shadow-sm"
                >
                    <v-icon
                        name="fa-sync-alt"
                        scale="0.85"
                        :class="{ 'animate-spin': loading }"
                    />
                    <span class="hidden sm:inline">Actualiser</span>
                </button>
            </div>

            
            <div class="flex flex-wrap gap-2">
                <div
                    class="flex flex-1 min-w-36 items-center gap-2 bg-white/90 hover:bg-white transition-colors rounded-xl px-3 py-2"
                >
                    <v-icon
                        name="fa-search"
                        class="text-slate-400"
                        scale="0.85"
                    />
                    <input
                        v-model="searchQuery"
                        type="text"
                        placeholder="Rechercher par nom..."
                        class="flex-1 outline-none text-xs bg-transparent text-slate-700 placeholder:text-slate-40"
                    />
                    <transition name="fade">
                        <button
                            v-if="searchQuery"
                            @click="searchQuery = ''"
                            class="text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            <v-icon name="fa-times-circle" scale="0.8" />
                        </button>
                    </transition>
                </div>

                <div
                    class="flex items-center gap-2 bg-black/15 rounded-xl px-3 py-2"
                >
                    <v-icon
                        name="fa-filter"
                        class="text-white/70"
                        scale="0.8"
                    />
                    <select
                        v-model="selectedDay"
                        class="bg-transparent text-white text-xs outline-none cursor-pointer"
                    >
                        <option
                            v-for="day in dayslist"
                            :key="day"
                            :value="day"
                            class="text-slate-800 bg-white capitalize"
                        >
                            {{ day }}
                        </option>
                    </select>
                </div>
            </div>
        </div>

        <transition name="slide-fade">
            <div
                v-if="succes"
                class="flex items-center gap-3 bg-emerald-500/10 border border-emerald-400/40 text-emerald-700 rounded-xl px-4 py-3 text-xs font-medium"
            >
                <v-icon name="fa-check-circle" scale="1" class="shrink-0" />
                {{ succes }}
                <button
                    @click="succes = ''"
                    class="ml-auto text-emerald-500/60 hover:text-emerald-600"
                >
                    <v-icon name="fa-times-circle" scale="0.8" />
                </button>
            </div>
        </transition>
        <transition name="slide-fade">
            <div
                v-if="erreur"
                class="flex items-center gap-3 bg-red-500/10 border border-red-400/40 text-red-600 rounded-xl px-4 py-3 text-xs font-medium"
            >
                <v-icon name="fa-times-circle" scale="1" class="shrink-0" />
                {{ erreur }}
                <button
                    @click="erreur = ''"
                    class="ml-auto text-red-400/60 hover:text-red-500"
                >
                    <v-icon name="fa-times-circle" scale="0.8" />
                </button>
            </div>
        </transition>

        <div
            class="rounded-2xl overflow-hidden border border-slate-200/60 shadow-sm"
        >
            <div v-if="loading" class="p-6 flex flex-col gap-3">
                <div
                    v-for="i in 5"
                    :key="i"
                    class="h-10 bg-slate-100 rounded-xl animate-pulse"
                ></div>
            </div>

           
            <template v-else>
              
                <div class="md:hidden flex flex-col divide-y divide-slate-100">
                    <div
                        v-if="paginatedVisiteurs.length === 0"
                        class="py-16 text-center text-slate-400"
                    >
                        <v-icon
                            name="fa-users"
                            scale="2.5"
                            class="opacity-10 mb-2"
                        />
                        <p class="text-sm">
                            {{
                                searchQuery
                                    ? `Aucun résultat pour "${searchQuery}"`
                                    : "Aucun visiteur"
                            }}
                        </p>
                    </div>
                    <div
                        v-for="(visiteur, index) in paginatedVisiteurs"
                        :key="visiteur.id"
                        class="p-4 flex flex-col gap-3"
                        :class="
                            index % 2 === 0 ? 'bg-white/60' : 'bg-slate-50/40'
                        "
                    >
                       
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <div
                                    class="w-8 h-8 rounded-full bg-linear-to-br from-amber-400 to-amber-500 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-sm"
                                >
                                    {{
                                        visiteur.Nom?.charAt(0).toUpperCase() ??
                                        "?"
                                    }}
                                </div>
                                <div>
                                    <p class="font-bold text-slate-700 text-xs">
                                        {{ visiteur.Nom }}
                                    </p>
                                    <p
                                        class="text-[10px] text-slate-400 flex items-center gap-1"
                                    >
                                        <v-icon
                                            name="fa-phone-alt"
                                            scale="0.7"
                                            class="text-slate-300"
                                        />
                                        {{ visiteur.Numero }}
                                    </p>
                                </div>
                            </div>
                            <span
                                class="bg-amber-100 text-amber-700 font-bold px-2.5 py-0.5 rounded-full text-[10px]"
                            >
                                {{ visiteur.Jours }}j
                            </span>
                        </div>
                      
                        <div class="grid grid-cols-2 gap-2">
                            <div class="bg-slate-50 rounded-xl px-3 py-2">
                                <p
                                    class="text-[9px] text-slate-400 uppercase tracking-wide"
                                >
                                    Tarif/jour
                                </p>
                                <p class="text-xs font-semibold text-slate-600">
                                    {{
                                        Number(visiteur.Tarif).toLocaleString()
                                    }}
                                    Ar
                                </p>
                            </div>
                            <div class="bg-amber-50 rounded-xl px-3 py-2">
                                <p
                                    class="text-[9px] text-slate-400 uppercase tracking-wide"
                                >
                                    Total
                                </p>
                                <p class="text-xs font-bold text-amber-600">
                                    {{
                                        Number(visiteur.Total).toLocaleString()
                                    }}
                                    Ar
                                </p>
                            </div>
                        </div>
                       
                        <div class="flex gap-2">
                            <button
                                @click="openEditModal(visiteur)"
                                class="flex-1 flex items-center justify-center gap-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 border border-emerald-300/50 text-[10px] font-semibold py-2 rounded-lg transition-all"
                            >
                                <v-icon name="fa-edit" scale="0.75" /> Modifier
                            </button>
                            <button
                                @click="confirmDelete(visiteur)"
                                class="flex-1 flex items-center justify-center gap-1 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-300/50 text-[10px] font-semibold py-2 rounded-lg transition-all"
                            >
                                <v-icon name="fa-trash" scale="0.75" />
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>

                
                <div class="hidden md:block overflow-x-auto">
                    <table class="w-full text-xs text-left border-collapse">
                        <thead>
                            <tr
                                class="bg-slate-800 text-white text-[10px] uppercase tracking-wider"
                            >
                                <th class="py-3 px-4 font-semibold w-10">#</th>
                                <th
                                    class="py-3 px-4 font-semibold cursor-pointer hover:text-amber-300 transition-colors"
                                    @click="sortBy('Nom')"
                                >
                                    <div class="flex items-center gap-1">
                                        <v-icon name="fa-user" scale="0.75" />
                                        Nom
                                        <v-icon
                                            name="fa-sort"
                                            scale="0.6"
                                            class="opacity-40"
                                        />
                                    </div>
                                </th>
                                <th class="py-3 px-4 font-semibold">
                                    <div class="flex items-center gap-1">
                                        <v-icon
                                            name="fa-phone-alt"
                                            scale="0.75"
                                        />
                                        Numéro
                                    </div>
                                </th>
                                <th
                                    class="py-3 px-4 font-semibold cursor-pointer hover:text-amber-300 transition-colors"
                                    @click="sortBy('Jours')"
                                >
                                    <div class="flex items-center gap-1">
                                        <v-icon
                                            name="fa-calendar-day"
                                            scale="0.75"
                                        />
                                        Jours
                                    </div>
                                </th>
                                <th
                                    class="py-3 px-4 font-semibold cursor-pointer hover:text-amber-300 transition-colors"
                                    @click="sortBy('Tarif')"
                                >
                                    <div class="flex items-center gap-1">
                                        <v-icon
                                            name="fa-dollar-sign"
                                            scale="0.75"
                                        />
                                        Tarif
                                    </div>
                                </th>
                                <th
                                    class="py-3 px-4 font-semibold text-amber-400 cursor-pointer hover:text-amber-300 transition-colors"
                                    @click="sortBy('Total')"
                                >
                                    <div class="flex items-center gap-1">
                                        <v-icon
                                            name="fa-dollar-sign"
                                            scale="0.75"
                                        />
                                        Total
                                    </div>
                                </th>
                                <th class="py-3 px-4 font-semibold text-center">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-if="paginatedVisiteurs.length === 0">
                                <td
                                    colspan="7"
                                    class="py-20 text-center bg-slate-50/30"
                                >
                                    <div
                                        class="flex flex-col items-center gap-3 text-slate-400"
                                    >
                                        <v-icon
                                            name="fa-users"
                                            scale="3"
                                            class="opacity-10"
                                        />
                                        <p class="text-sm font-medium">
                                            {{
                                                searchQuery
                                                    ? `Aucun résultat pour "${searchQuery}"`
                                                    : "Aucun visiteur enregistré"
                                            }}
                                        </p>
                                        <p
                                            v-if="searchQuery"
                                            class="text-xs opacity-60"
                                        >
                                            Essayez un autre nom
                                        </p>
                                    </div>
                                </td>
                            </tr>

                            <tr
                                v-for="(visiteur, index) in paginatedVisiteurs"
                                :key="visiteur.id"
                                class="border-b border-slate-100/80 transition-all duration-150 hover:bg-amber-50/70 group"
                                :class="
                                    index % 2 === 0
                                        ? 'bg-white/60'
                                        : 'bg-slate-50/40'
                                "
                            >
                                <td
                                    class="py-3 px-4 text-slate-400 font-medium text-[10px]"
                                >
                                    {{
                                        (currentPage - 1) * perPage + index + 1
                                    }}
                                </td>

                                <td class="py-3 px-4">
                                    <div class="flex items-center gap-2">
                                        <div
                                            class="w-7 h-7 rounded-full bg-linear-to-br from-amber-400 to-amber-500 flex items-center justify-center text-white font-bold text-[11px] shrink-0 shadow-sm"
                                        >
                                            {{
                                                visiteur.Nom?.charAt(
                                                    0,
                                                ).toUpperCase() ?? "?"
                                            }}
                                        </div>
                                        <span
                                            class="font-semibold text-slate-700"
                                            >{{ visiteur.Nom }}</span
                                        >
                                    </div>
                                </td>

                                <td class="py-3 px-4 text-slate-500">
                                    <div class="flex items-center gap-1">
                                        <v-icon
                                            name="fa-phone-alt"
                                            scale="0.7"
                                            class="text-slate-300"
                                        />
                                        {{ visiteur.Numero }}
                                    </div>
                                </td>

                                <td class="py-3 px-4">
                                    <span
                                        class="bg-amber-100 text-amber-700 font-bold px-2.5 py-0.5 rounded-full text-[10px]"
                                    >
                                        {{ visiteur.Jours }}j
                                    </span>
                                </td>

                                <td
                                    class="py-3 px-4 text-slate-500 font-medium"
                                >
                                    {{
                                        Number(visiteur.Tarif).toLocaleString()
                                    }}
                                    Ar
                                </td>

                                <td class="py-3 px-4">
                                    <span class="font-bold text-slate-800">
                                        {{
                                            Number(
                                                visiteur.Total,
                                            ).toLocaleString()
                                        }}
                                        Ar
                                    </span>
                                </td>

                                <td class="py-3 px-4">
                                    <div
                                        class="flex items-center justify-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity"
                                    >
                                        <button
                                            @click="openEditModal(visiteur)"
                                            class="flex items-center gap-1 bg-emerald-500/10 hover:bg-emerald-500/25 text-emerald-600 border border-emerald-300/50 text-[10px] font-semibold px-2.5 py-1.5 rounded-lg transition-all hover:scale-105"
                                        >
                                            <v-icon
                                                name="fa-edit"
                                                scale="0.75"
                                            />
                                            <span class="hidden sm:inline"
                                                >Modifier</span
                                            >
                                        </button>
                                        <button
                                            @click="confirmDelete(visiteur)"
                                            class="flex items-center gap-1 bg-red-500/10 hover:bg-red-500/25 text-red-500 border border-red-300/50 text-[10px] font-semibold px-2.5 py-1.5 rounded-lg transition-all hover:scale-105"
                                        >
                                            <v-icon
                                                name="fa-trash"
                                                scale="0.75"
                                            />
                                            <span class="hidden sm:inline"
                                                >Supprimer</span
                                            >
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </template>

            <div
                v-if="!loading && totalPages > 1"
                class="flex items-center justify-between px-4 py-3 border-t border-slate-100 bg-slate-50/30"
            >
                <p class="text-[10px] text-slate-400">
                    {{ (currentPage - 1) * perPage + 1 }}–{{
                        Math.min(
                            currentPage * perPage,
                            filteredVisiteurs.length,
                        )
                    }}
                    sur {{ filteredVisiteurs.length }}
                </p>
                <div class="flex items-center gap-1">
                    <button
                        @click="currentPage--"
                        :disabled="currentPage === 1"
                        class="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-amber-50 hover:border-amber-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-xs font-bold"
                    >
                        «
                    </button>
                    <button
                        v-for="p in totalPages"
                        :key="p"
                        @click="currentPage = p"
                        :class="[
                            'w-7 h-7 flex items-center justify-center rounded-lg text-[10px] font-semibold transition-all',
                            currentPage === p
                                ? 'bg-amber-400 text-white shadow-sm'
                                : 'border border-slate-200 text-slate-500 hover:bg-amber-50 hover:border-amber-300',
                        ]"
                    >
                        {{ p }}
                    </button>
                    <button
                        @click="currentPage++"
                        :disabled="currentPage === totalPages"
                        class="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-amber-50 hover:border-amber-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-xs font-bold"
                    >
                        »
                    </button>
                </div>
            </div>
        </div>

        <transition name="modal-fade">
            <div
                v-if="deleteConfirm"
                class="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                @click.self="deleteConfirm = null"
            >
                <div
                    class="w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl bg-slate-900 border border-slate-700/50"
                >
                    <div class="bg-red-500 p-4 flex items-center gap-3">
                        <v-icon
                            name="fa-trash"
                            class="text-white"
                            scale="1.1"
                        />
                        <h2 class="text-sm font-bold text-white">
                            Confirmer la suppression
                        </h2>
                    </div>
                    <div class="p-5">
                        <p class="text-sm text-slate-300">
                            Supprimer
                            <span class="font-bold text-white">{{
                                deleteConfirm?.Nom
                            }}</span>
                            ?
                        </p>
                        <p class="text-xs text-slate-500 mt-1">
                            Cette action est irréversible.
                        </p>
                    </div>
                    <div class="px-5 pb-5 flex gap-3">
                        <button
                            @click="deleteConfirm = null"
                            class="flex-1 py-2.5 rounded-xl text-xs font-semibold text-slate-400 border border-slate-700 hover:bg-slate-800 transition-colors"
                        >
                            Annuler
                        </button>
                        <button
                            @click="handledelet(deleteConfirm.id)"
                            class="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-red-500 hover:bg-red-600 text-white flex items-center justify-center gap-2 transition-colors"
                        >
                            <v-icon name="fa-trash" scale="0.85" /> Supprimer
                        </button>
                    </div>
                </div>
            </div>
        </transition>

        <transition name="modal-fade">
            <div
                v-if="isEditModalOpen"
                class="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                @click.self="isEditModalOpen = false"
            >
                <div
                    class="w-full max-w-md rounded-2xl shadow-2xl overflow-hidden bg-slate-900 border border-slate-700/50"
                >
                    <div
                        class="bg-amber-400 p-4 flex justify-between items-center"
                    >
                        <div class="flex items-center gap-2 text-white">
                            <v-icon name="fa-edit" scale="1" />
                            <h2 class="text-sm font-bold">
                                Modifier — {{ formEdit.Nom }}
                            </h2>
                        </div>
                        <button
                            @click="isEditModalOpen = false"
                            class="w-7 h-7 flex items-center justify-center bg-black/20 hover:bg-black/35 text-white rounded-full transition-colors text-xs font-bold"
                        >
                            ✕
                        </button>
                    </div>

                    <div class="p-5 flex flex-col gap-4">
                        <div class="flex flex-col gap-1">
                            <label
                                class="text-[10px] font-semibold text-slate-400 flex items-center gap-1"
                            >
                                <v-icon name="fa-user" scale="0.75" /> Nom du
                                visiteur
                            </label>
                            <input
                                v-model="formEdit.Nom"
                                type="text"
                                placeholder="Ex: Jean Dupont"
                                class="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white placeholder:text-slate-600 outline-none focus:border-amber-400 transition-colors"
                            />
                        </div>

                        <div class="flex flex-col gap-1">
                            <label
                                class="text-[10px] font-semibold text-slate-400 flex items-center gap-1"
                            >
                                <v-icon name="fa-phone-alt" scale="0.75" />
                                Numéro
                            </label>
                            <input
                                v-model="formEdit.Numero"
                                type="text"
                                placeholder="034 XX XXX XX"
                                class="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white placeholder:text-slate-600 outline-none focus:border-amber-400 transition-colors"
                            />
                        </div>

                        <div class="grid grid-cols-2 gap-3">
                            <div class="flex flex-col gap-1">
                                <label
                                    class="text-[10px] font-semibold text-slate-400 flex items-center gap-1"
                                >
                                    <v-icon
                                        name="fa-calendar-day"
                                        scale="0.75"
                                    />
                                    Jours
                                </label>
                                <input
                                    v-model.number="formEdit.Jours"
                                    type="number"
                                    min="0"
                                    class="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white outline-none focus:border-amber-400 transition-colors"
                                />
                            </div>
                            <div class="flex flex-col gap-1">
                                <label
                                    class="text-[10px] font-semibold text-slate-400 flex items-center gap-1"
                                >
                                    <v-icon
                                        name="fa-dollar-sign"
                                        scale="0.75"
                                    />
                                    Tarif (Ar)
                                </label>
                                <input
                                    v-model.number="formEdit.Tarif"
                                    type="number"
                                    min="0"
                                    class="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white outline-none focus:border-amber-400 transition-colors"
                                />
                            </div>
                        </div>

                      
                        <div
                            class="flex justify-between items-center bg-amber-400/10 border border-amber-400/25 rounded-xl px-4 py-3"
                        >
                            <div class="text-xs text-slate-400">
                                <p class="font-medium">Total estimé</p>
                                <p class="text-[10px] opacity-60">
                                    {{ formEdit.Jours }}j ×
                                    {{
                                        Number(formEdit.Tarif).toLocaleString()
                                    }}
                                    Ar
                                </p>
                            </div>
                            <span class="text-base font-bold text-amber-400">
                                {{
                                    (
                                        formEdit.Jours * formEdit.Tarif || 0
                                    ).toLocaleString()
                                }}
                                Ar
                            </span>
                        </div>
                    </div>

                    <div class="px-5 pb-5 flex gap-3">
                        <button
                            @click="isEditModalOpen = false"
                            class="flex-1 py-2.5 rounded-xl text-xs font-semibold text-slate-400 border border-slate-700 hover:bg-slate-800 transition-colors"
                        >
                            Annuler
                        </button>
                        <button
                            @click="handleUpdate"
                            class="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-amber-400 hover:bg-amber-500 text-white flex items-center justify-center gap-2 transition-colors shadow-lg shadow-amber-400/20"
                        >
                            <v-icon name="fa-save" scale="0.85" /> Sauvegarder
                        </button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import axios from "axios";

const erreur = ref("");
const succes = ref("");
const loading = ref(false);
const visiteurs = ref([]);
const searchQuery = ref("");
const selectedDay = ref("tout");
const isEditModalOpen = ref(false);
const deleteConfirm = ref(null);
const formEdit = ref({ id: "", Nom: "", Numero: "", Jours: 0, Tarif: 0 });
const sortKey = ref("Nom");
const sortAsc = ref(true);
const currentPage = ref(1);
const perPage = 8;

const dayslist = ["tout", "dernier jour", "dernière semaine", "dernier mois"];

const filteredVisiteurs = computed(() => {
    const query = searchQuery.value.toLowerCase();
    const list = visiteurs.value.filter((v) =>
        String(v.Nom || "")
            .toLowerCase()
            .includes(query),
    );
    return [...list].sort((a, b) => {
        const va = a[sortKey.value] ?? "";
        const vb = b[sortKey.value] ?? "";
        if (typeof va === "number") return sortAsc.value ? va - vb : vb - va;
        return sortAsc.value
            ? String(va).localeCompare(String(vb))
            : String(vb).localeCompare(String(va));
    });
});

const totalPages = computed(() =>
    Math.ceil(filteredVisiteurs.value.length / perPage),
);

const paginatedVisiteurs = computed(() => {
    const start = (currentPage.value - 1) * perPage;
    return filteredVisiteurs.value.slice(start, start + perPage);
});

const totalRecettes = computed(() =>
    visiteurs.value.reduce((sum, v) => sum + (Number(v.Total) || 0), 0),
);

const moyJours = computed(() => {
    if (!visiteurs.value.length) return 0;
    const total = visiteurs.value.reduce(
        (s, v) => s + (Number(v.Jours) || 0),
        0,
    );
    return (total / visiteurs.value.length).toFixed(1);
});

watch(searchQuery, () => {
    currentPage.value = 1;
});

const sortBy = (key) => {
    if (sortKey.value === key) sortAsc.value = !sortAsc.value;
    else {
        sortKey.value = key;
        sortAsc.value = true;
    }
};

const fetchdata = async () => {
    loading.value = true;
    erreur.value = "";
    try {
        const res = await axios.get(
            "http://localhost/Delegg-Hub/SPAvisiteurVuejs/src/Backend/Liste_visiteurs.php",
        );
        visiteurs.value = Array.isArray(res.data) ? res.data : [];
    } catch {
        erreur.value = "Erreur lors du chargement.";
    } finally {
        loading.value = false;
    }
};

const confirmDelete = (v) => {
    deleteConfirm.value = v;
};

const handledelet = async (id) => {
    deleteConfirm.value = null;
    erreur.value = "";
    succes.value = "";
    try {
        const res = await axios.post(
            `http://localhost/Delegg-Hub/SPAvisiteurVuejs/src/Backend/Delete_visiteurs.php?id=${id}`,
        );
        if (res.data.status === "success") {
            succes.value = res.data.message;
            await fetchdata();
        } else erreur.value = res.data.message;
    } catch {
        erreur.value = "Erreur lors de la suppression.";
    }
};

const openEditModal = (v) => {
    formEdit.value = { ...v };
    isEditModalOpen.value = true;
};

const handleUpdate = async () => {
    erreur.value = "";
    succes.value = "";
    try {
        const res = await axios.post(
            "http://localhost/Delegg-Hub/SPAvisiteurVuejs/src/Backend/Update_visiteurs.php",
            formEdit.value,
        );
        if (res.data.status === "success") {
            succes.value = res.data.message;
            isEditModalOpen.value = false;
            await fetchdata();
        } else erreur.value = res.data.message;
    } catch {
        erreur.value = "Erreur lors de la mise à jour.";
    }
};

const handleact = async () => {
    succes.value = "";
    erreur.value = "";
    await fetchdata();
};

onMounted(() => fetchdata());
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: all 0.25s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
    transform: scale(0.96) translateY(10px);
}

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

div::-webkit-scrollbar {
    width: 0;
}
</style>
