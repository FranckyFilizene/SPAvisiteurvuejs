<template>
      <main class="flex-col min-h-screen w-full flex p-5 gap-5">
            <div class="w-full flex justify-between h-22">
                  <div>
                        <div>
                              <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">
                                    Dashboard
                              </h1>
                        </div>
                        <p class="text-sm text-slate-400 mt-0.5">
                              Vue d'ensemble des visites et statistiques
                        </p>
                  </div>
                  <div>
                        <div class="flex gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm shadow-sm">
                              <button
                                    class="flex justify-between gap-2 bg-blue-600 hover:bg-blue-700 transition text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-md shadow-blue-200 active:scale-95">
                                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                                                d="M12 4v16m8-8H4" />
                                    </svg>
                                    Ajouter visiteur
                              </button>
                        </div>
                  </div>
            </div>
            <div class="flex w-full gap-8 h-80">
                  <div class="flex flex-col w-[50%] bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                        <div class="flex flex-col h-[25%] items-start justify-between mb-4">
                              <div>
                                    <h1 class="text-sm font-bold text-slate-900">
                                          Bilan des paiements
                                    </h1>
                                    <p class="text-xs text-slate-400 mt-0.5">
                                          Total, minimal et maximal payés par les visiteurs
                                    </p>
                              </div>
                              <select v-model="chartFilter"
                                    class="text-xs border border-slate-200 rounded-lg px-3 py-1.5 text-slate-600 bg-white outline-none cursor-pointer">
                                    <option>Par jour</option>
                                    <option>Par semaine</option>
                                    <option>Par mois</option>
                              </select>
                              <div class="flex gap-5 mt-3 text-xs text-slate-500">
                                    <span class="flex items-center gap-1.5"><span
                                                class="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span>Total
                                          payé</span>
                                    <span class="flex items-center gap-1.5"><span
                                                class="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>Tarif
                                          minimal</span>
                                    <span class="flex items-center gap-1.5"><span
                                                class="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block"></span>Tarif
                                          maximal</span>
                              </div>
                        </div>
                  </div>
                  <div class="bg-white w-[50%] rounded-2xl p-5 shadow-sm border border-slate-100">
                        <h1 class="text-sm font-bold text-slate-900">Répartition des tarifs</h1>
                        <p class="text-xs text-slate-400 mt-0.5 mb-4">Distribution des paiements par tranche
                        </p>
                  </div>

            </div>
      </main>
</template>

<script></script>
