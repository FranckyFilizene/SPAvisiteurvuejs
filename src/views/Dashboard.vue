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
          <v-icon name="fa-plus" />
          <router-link to="add">

            Ajouter visiteur
          </router-link>
        </button>
      </div>
    </div>
    <div class="w-full min-h-10 rounded-2xl shadow-2xl bg-amber-400"></div>
    <div class="flex w-full items-center p-4 gap-4">
      <div
        class="flex flex-col justify-between col-span-2 min-h-50 bg-white rounded-2xl p-5 shadow-sm border border-slate-100 w-full">
       <div class="flex justify-between">
         <div>
          <h1 class="text-sm font-bold text-slate-900">Bilan des paiements</h1>
          <p class="text-xs text-slate-400 mt-0.5">Total, minimal et maximal payés par les visiteurs</p>
        </div>
        <select class="select w-30 cursor-pointer text-amber-400 select-warning">
          <option disabled selected>Par jours</option>
          <option>Par Semaine</option>
          <option>Par Mois</option>
        </select>
       </div>
        <div class="w-full">
          <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
        </div>

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
        labels: ['January', 'February', 'March'],
        datasets: [{ data: [40, 20, 12] }]
      },
      chartOptions: {
        responsive: true
      }
    }
  },
  // methods:{
  //   add() {
  //     this.$router.push("add")
     
  //   }
  // }
}
</script>
