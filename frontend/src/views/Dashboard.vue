<template>
  <div class="min-h-screen bg-base-200">
    <!-- Barre de navigation -->
    <div class="navbar bg-base-100 shadow-sm sticky top-0 z-30">
      <div class="flex-1 px-2">
        <span class="badge badge-primary mr-2">visiteur.com</span>
        <span class="font-bold">Tableau de bord</span>
        <span v-if="isDemo" class="badge badge-warning badge-sm ml-2 hidden sm:inline-flex">
          Mode démo
        </span>
      </div>
      <div class="flex-none gap-2 px-2">
        <span class="hidden md:inline text-sm text-base-content/70">
          <v-icon name="fa-user" class="mr-1" />{{ userName }}
        </span>
        <button
          class="btn btn-ghost btn-sm text-error"
          @click="handleLogout"
          :disabled="isLoggingOut"
        >
          <span v-if="isLoggingOut" class="loading loading-spinner loading-xs"></span>
          <template v-else><v-icon name="fa-sign-out-alt" /> Déconnexion</template>
        </button>
      </div>
    </div>

    <main class="max-w-7xl mx-auto p-4 md:p-8 space-y-6">
      <!-- Alerte d'erreur -->
      <div v-if="errorMessage" role="alert" class="alert alert-error text-sm">
        <v-icon name="fa-exclamation-circle" />
        <span>{{ errorMessage }}</span>
        <button class="btn btn-sm btn-ghost" @click="loadData">Réessayer</button>
      </div>

      <!-- Statistiques -->
      <div class="stats stats-vertical lg:stats-horizontal w-full bg-base-100 shadow-sm">
        <div class="stat">
          <div class="stat-figure text-primary">
            <v-icon name="fa-users" class="text-3xl" />
          </div>
          <div class="stat-title">Visiteurs</div>
          <div class="stat-value text-primary">{{ stats.total }}</div>
          <div class="stat-desc">total enregistré</div>
        </div>
        <div class="stat">
          <div class="stat-figure text-secondary">
            <v-icon name="fa-calendar-day" class="text-3xl" />
          </div>
          <div class="stat-title">Aujourd'hui</div>
          <div class="stat-value text-secondary">{{ stats.today }}</div>
          <div class="stat-desc">visites du jour</div>
        </div>
        <div class="stat">
          <div class="stat-figure text-info">
            <v-icon name="fa-calendar-week" class="text-3xl" />
          </div>
          <div class="stat-title">Cette semaine</div>
          <div class="stat-value text-info">{{ stats.week }}</div>
          <div class="stat-desc">7 derniers jours</div>
        </div>
        <div class="stat">
          <div class="stat-figure text-warning">
            <v-icon name="fa-hourglass-half" class="text-3xl" />
          </div>
          <div class="stat-title">En attente</div>
          <div class="stat-value text-warning">{{ stats.pending }}</div>
          <div class="stat-desc">à valider</div>
        </div>
      </div>

      <!-- Graphique des visites -->
      <div class="card bg-base-100 shadow-sm">
        <div class="card-body">
          <h2 class="card-title">Visites des 7 derniers jours</h2>
          <div class="h-72 w-full">
            <canvas ref="chartCanvas"></canvas>
          </div>
        </div>
      </div>

      <!-- Liste des visiteurs -->
      <div class="card bg-base-100 shadow-sm">
        <div class="card-body">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <h2 class="card-title">Liste des visiteurs</h2>
            <div class="flex flex-wrap items-center gap-2">
              <input
                v-model="search"
                type="text"
                placeholder="Rechercher..."
                class="input input-sm w-48"
              />
              <button class="btn btn-primary btn-sm" @click="openAddModal">
                <v-icon name="fa-plus" /> Ajouter
              </button>
            </div>
          </div>

          <div class="overflow-x-auto mt-2">
            <table class="table table-sm table-zebra">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Contact</th>
                  <th>Motif</th>
                  <th>Date</th>
                  <th>Statut</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="isLoadingVisiteurs">
                  <td colspan="6" class="text-center py-6">
                    <span class="loading loading-spinner loading-md"></span>
                  </td>
                </tr>
                <tr v-else-if="filteredVisiteurs.length === 0">
                  <td colspan="6" class="text-center py-6 text-base-content/60">
                    Aucun visiteur trouvé.
                  </td>
                </tr>
                <tr v-for="visiteur in filteredVisiteurs" :key="visiteur.id">
                  <td>
                    <div class="font-semibold">{{ visiteur.nom }} {{ visiteur.prenom }}</div>
                    <div class="text-xs text-base-content/60">{{ visiteur.telephone }}</div>
                  </td>
                  <td class="text-sm">{{ visiteur.email }}</td>
                  <td class="text-sm">{{ visiteur.motif }}</td>
                  <td class="text-sm whitespace-nowrap">
                    {{ formatDate(visiteur.dateVisite) }}
                  </td>
                  <td>
                    <span class="badge badge-sm" :class="statutBadgeClass(visiteur.statut)">
                      {{ visiteur.statut }}
                    </span>
                  </td>
                  <td class="text-right">
                    <button
                      class="btn btn-ghost btn-xs text-error"
                      aria-label="Supprimer"
                      @click="handleDelete(visiteur)"
                    >
                      <v-icon name="fa-trash-alt" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>

    <!-- Modal d'ajout d'un visiteur -->
    <div v-if="isAddModalOpen" class="modal modal-open" @click.self="closeAddModal">
      <div class="modal-box">
        <h3 class="font-bold text-lg mb-4">Nouveau visiteur</h3>
        <form @submit.prevent="handleAdd" class="space-y-3">
          <div class="flex gap-3">
            <div class="flex-1">
              <label class="block text-sm font-semibold mb-1" for="v-nom">Nom</label>
              <input
                id="v-nom"
                v-model="newVisiteur.nom"
                type="text"
                class="input w-full"
                placeholder="Ex : Rakoto"
              />
            </div>
            <div class="flex-1">
              <label class="block text-sm font-semibold mb-1" for="v-prenom">Prénom</label>
              <input
                id="v-prenom"
                v-model="newVisiteur.prenom"
                type="text"
                class="input w-full"
                placeholder="Ex : Jean"
              />
            </div>
          </div>
          <div>
            <label class="block text-sm font-semibold mb-1" for="v-email">Email</label>
            <input
              id="v-email"
              v-model="newVisiteur.email"
              type="email"
              class="input w-full"
              placeholder="Ex : jean@mail.com"
            />
          </div>
          <div>
            <label class="block text-sm font-semibold mb-1" for="v-telephone">Téléphone</label>
            <input
              id="v-telephone"
              v-model="newVisiteur.telephone"
              type="tel"
              class="input w-full"
              placeholder="Ex : 034 12 345 67"
            />
          </div>
          <div>
            <label class="block text-sm font-semibold mb-1" for="v-motif">Motif de visite</label>
            <input
              id="v-motif"
              v-model="newVisiteur.motif"
              type="text"
              class="input w-full"
              placeholder="Ex : Réunion"
            />
          </div>
          <div>
            <label class="block text-sm font-semibold mb-1" for="v-statut">Statut</label>
            <select id="v-statut" v-model="newVisiteur.statut" class="select w-full">
              <option>En attente</option>
              <option>Valide</option>
              <option>Refusé</option>
            </select>
          </div>
          <div v-if="formError" class="alert alert-error py-2 text-sm">
            <span>{{ formError }}</span>
          </div>
          <div class="modal-action">
            <button type="button" class="btn btn-ghost" @click="closeAddModal">Annuler</button>
            <button type="submit" class="btn btn-primary" :disabled="isSaving">
              <span v-if="isSaving" class="loading loading-spinner loading-sm"></span>
              <span v-else>Enregistrer</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import api from "../util/api.js";
import {
  getUser,
  logout,
  shouldUseDemo,
  demoGetVisiteurs,
  demoAddVisiteur,
  demoDeleteVisiteur,
} from "../util/auth.js";

const STATUTS = ["En attente", "Valide", "Refusé"];

export default {
  name: "DashboardView",
  data() {
    return {
      userName: "",
      isDemo: false,
      errorMessage: null,
      isLoadingVisiteurs: false,
      isLoggingOut: false,
      visiteurs: [],
      search: "",
      isAddModalOpen: false,
      isSaving: false,
      formError: null,
      newVisiteur: {
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
        motif: "",
        statut: "En attente",
      },
      chart: null,
    };
  },

  computed: {
    stats() {
      const now = new Date();
      const todayStr = now.toDateString();
      const weekAgo = new Date(now);
      weekAgo.setDate(weekAgo.getDate() - 6);
      weekAgo.setHours(0, 0, 0, 0);

      let total = 0;
      let today = 0;
      let week = 0;
      let pending = 0;

      for (const visiteur of this.visiteurs) {
        total += 1;
        const date = new Date(visiteur.dateVisite);
        if (date.toDateString() === todayStr) today += 1;
        if (date >= weekAgo) week += 1;
        if (visiteur.statut === "En attente") pending += 1;
      }
      return { total, today, week, pending };
    },

    chartData() {
      const labels = [];
      const data = [];
      for (let i = 6; i >= 0; i -= 1) {
        const day = new Date();
        day.setDate(day.getDate() - i);
        labels.push(
          day.toLocaleDateString("fr-FR", { weekday: "short", day: "2-digit" })
        );
        const count = this.visiteurs.filter(
          (v) => new Date(v.dateVisite).toDateString() === day.toDateString()
        ).length;
        data.push(count);
      }
      return { labels, data };
    },

    filteredVisiteurs() {
      const query = this.search.trim().toLowerCase();
      const sorted = [...this.visiteurs].sort(
        (a, b) => new Date(b.dateVisite) - new Date(a.dateVisite)
      );
      if (!query) return sorted;
      return sorted.filter((v) =>
        [v.nom, v.prenom, v.email, v.telephone, v.motif, v.statut].some((field) =>
          String(field ?? "").toLowerCase().includes(query)
        )
      );
    },
  },

  watch: {
    chartData() {
      this.$nextTick(() => this.renderChart());
    },
  },

  async mounted() {
    const user = getUser();
    this.userName = (user && (user.name || user.username)) || "Visiteur";
    await this.loadData();
  },

  beforeUnmount() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  },

  methods: {
    emptyVisiteur() {
      return {
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
        motif: "",
        statut: "En attente",
      };
    },

    formatDate(value) {
      const date = new Date(value);
      return Number.isNaN(date.getTime())
        ? "—"
        : date.toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });
    },

    statutBadgeClass(statut) {
      if (statut === "Valide") return "badge-success";
      if (statut === "Refusé") return "badge-error";
      return "badge-warning";
    },

    /** Charge la liste des visiteurs : API réelle, sinon mode démo. */
    async loadData() {
      this.errorMessage = null;
      this.isLoadingVisiteurs = true;
      try {
        const response = await api.get("/visiteurs");
        const data = response.data;
        this.visiteurs = Array.isArray(data) ? data : (data && data.data) || [];
        this.isDemo = false;
      } catch (error) {
        if (shouldUseDemo(error)) {
          console.info("[Démo] Backend injoignable, données de démonstration.");
          this.isDemo = true;
          try {
            this.visiteurs = await demoGetVisiteurs();
          } catch {
            this.visiteurs = [];
          }
        } else {
          this.errorMessage =
            (error.response && error.response.data && error.response.data.message) ||
            "Impossible de charger les visiteurs.";
        }
      } finally {
        this.isLoadingVisiteurs = false;
      }
    },

    openAddModal() {
      this.newVisiteur = this.emptyVisiteur();
      this.formError = null;
      this.isAddModalOpen = true;
    },

    closeAddModal() {
      this.isAddModalOpen = false;
    },

    /** Ajoute un visiteur : API réelle, sinon mode démo. */
    async handleAdd() {
      const v = this.newVisiteur;
      if (!v.nom.trim() || !v.prenom.trim()) {
        this.formError = "Le nom et le prénom sont obligatoires.";
        return;
      }
      if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) {
        this.formError = "Adresse email invalide.";
        return;
      }

      this.isSaving = true;
      this.formError = null;
      try {
        const payload = {
          nom: v.nom.trim(),
          prenom: v.prenom.trim(),
          email: v.email.trim(),
          telephone: v.telephone.trim(),
          motif: v.motif.trim() || "Visite",
          statut: STATUTS.includes(v.statut) ? v.statut : "En attente",
          dateVisite: new Date().toISOString(),
        };
        try {
          const response = await api.post("/visiteurs", payload);
          const created = response.data && (response.data.visiteur || response.data);
          if (created && created.id) {
            this.visiteurs = [created, ...this.visiteurs];
          } else {
            await this.loadData();
          }
          this.isDemo = false;
        } catch (error) {
          if (shouldUseDemo(error)) {
            await demoAddVisiteur(payload);
            this.visiteurs = await demoGetVisiteurs();
            this.isDemo = true;
          } else {
            throw error;
          }
        }
        this.closeAddModal();
      } catch (error) {
        this.formError =
          (error.response && error.response.data && error.response.data.message) ||
          "Impossible d'enregistrer le visiteur.";
      } finally {
        this.isSaving = false;
      }
    },

    /** Supprime un visiteur : API réelle, sinon mode démo. */
    async handleDelete(visiteur) {
      if (
        !window.confirm(
          `Supprimer le visiteur ${visiteur.nom} ${visiteur.prenom} ?`
        )
      ) {
        return;
      }
      try {
        try {
          await api.delete(`/visiteurs/${visiteur.id}`);
          this.isDemo = false;
        } catch (error) {
          if (shouldUseDemo(error)) {
            await demoDeleteVisiteur(visiteur.id);
            this.isDemo = true;
          } else {
            throw error;
          }
        }
        this.visiteurs = this.visiteurs.filter((v) => v.id !== visiteur.id);
      } catch (error) {
        this.errorMessage =
          (error.response && error.response.data && error.response.data.message) ||
          "Impossible de supprimer le visiteur.";
      }
    },

    async handleLogout() {
      this.isLoggingOut = true;
      try {
        await api.post("/logout");
      } catch {
        // On se déconnecte localement même si l'API échoue.
      }
      logout();
      this.$router.push("/");
    },

    renderChart() {
      if (!this.$refs.chartCanvas) return;
      if (this.chart) {
        this.chart.destroy();
        this.chart = null;
      }
      this.chart = new Chart(this.$refs.chartCanvas, {
        type: "bar",
        data: {
          labels: this.chartData.labels,
          datasets: [
            {
              label: "Visiteurs",
              data: this.chartData.data,
              backgroundColor: "rgba(99, 102, 241, 0.7)",
              borderRadius: 6,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { beginAtZero: true, ticks: { precision: 0 } },
          },
        },
      });
    },
  },
};
</script>
