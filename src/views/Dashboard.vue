<template>
  <main class="w-full h-screen">
    <div class="flex w-full justify-between p-2">
      <div>
        <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">Tableau de bord</h1>
        <p class="text-sm text-slate-400 mt-0.5">Vue d'ensemble des visites et statistiques</p>
      </div>
      <div>
        <button
          class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-md shadow-blue-200 active:scale-95 cursor-pointer">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
          </svg>
          Ajouter visiteur
        </button>
      </div>
    </div>
    <div class="flex w-full items-center p-4 gap-4">
      <div
        class="flex justify-between col-span-2 min-h-50 bg-white rounded-2xl p-5 shadow-sm border border-slate-100 w-full">
        <div>
          <h1 class="text-sm font-bold text-slate-900">Bilan des paiements</h1>
          <p class="text-xs text-slate-400 mt-0.5">Total, minimal et maximal payés par les visiteurs</p>
        </div>
        <select class="select w-30 cursor-pointer text-amber-400 select-warning">
          <option disabled selected>Par jours</option>
          <option>Par Semaine</option>
          <option>Par Mois</option>
        </select>
          <Bar
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  />
      </div>
      <div class="flex justify-between bg-white min-h-50 rounded-2xl p-5 shadow-sm border border-slate-100 w-full"> 
          <div>
            <h1 class="text-sm font-bold text-slate-900">Répartition des tarifs</h1>
            <p class="text-xs text-slate-400 mt-0.5 ">Distribution des paiements par tranche</p>
          </div>
      </div>
      </div>
  </main>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: [ 'January', 'February', 'March' ],
        datasets: [ { data: [40, 20, 12] } ]
      },
      chartOptions: {
        responsive: true
      }
    }
  }
}
</script>
