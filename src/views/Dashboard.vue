<template>
      <main class="  flex-col min-h-screen w-full flex p-5 gap-5">
            <div class="w-full flex justify-between">
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
            <div>
                  <div class="flex flex-col bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                        <div class="flex items-start justify-between mb-4">
                              <div>
                                    <div class="text-sm font-bold text-slate-900">Bilan des paiements</div>
                                    <div class="text-xs text-slate-400 mt-0.5">Total, minimal et maximal payés par les
                                          visiteurs</div>
                              </div>
                              <select v-model="chartFilter"
                                    class="text-xs border border-slate-200 rounded-lg px-3 py-1.5 text-slate-600 bg-white outline-none cursor-pointer">
                                    <option>Par jour</option>
                                    <option>Par semaine</option>
                                    <option>Par mois</option>
                              </select>
                        </div>
                  </div>
                  <svg viewBox="0 0 700 200" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                  <linearGradient id="blueArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.12"/>
                  <stop offset="100%" stop-color="#3b82f6" stop-opacity="0"/>
                  </linearGradient>
                  </defs>
                  <g>
                  <line v-for="y in gridYs" :key="y.val" x1="44" :y1="y.pos" x2="692" :y2="y.pos" stroke="#f1f5f9" stroke-width="1"/>
                  <text v-for="y in gridYs" :key="'l'+y.val" x="36" :y="y.pos+4" text-anchor="end" font-size="9" fill="#94a3b8">{{ y.label }}</text>
                  </g>
                  <g>
                  <text v-for="(lbl, i) in xLabels" :key="lbl" :x="44 + i*(648/6)" y="196" text-anchor="middle" font-size="9" fill="#94a3b8">{{ lbl }}</text>
                  </g>
                  <polygon :points="totalAreaPoints" fill="url(#blueArea)"/>
                  <polyline :points="totalPoints" fill="none" stroke="#3b82f6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <polyline :points="minPoints"   fill="none" stroke="#22c55e" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="5 3"/>
                  <polyline :points="maxPoints"   fill="none" stroke="#a855f7" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <div class="flex items-center justify-center gap-5 mt-3 text-xs text-slate-500">
                  <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span>Total payé</span>
                  <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>Tarif minimal</span>
                  <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block"></span>Tarif maximal</span>
                  </div>
            </div>
            

            



            <!-- 
          </div> -->



      </main>
</template>

<script></script>
