<template>
    <div class="flex flex-col gap-2">
        <div
            class="w-full z-10 bg-amber-400 sticky rounded-2xl shadow-2xl top-0 flex flex-col gap-3 p-3"
        >
         
            <div class="flex items-center gap-3">
                <div
                    class="flex flex-1 items-center gap-2 bg-white/90 rounded-xl px-3 py-2"
                >
                    <v-icon
                        name="fa-search"
                        class="text-slate-400"
                        scale="0.9"
                    />
                    <input
                        v-model="recherche"
                        type="text"
                        placeholder="Rechercher un endroit..."
                        class="flex-1 outline-none text-xs text-slate-700 bg-transparent placeholder:text-slate-400"
                    />
                </div>

               
                <button
                    class="lg:hidden btn btn-accent text-slate-50 flex items-center gap-1"
                    @click="showFiltres = !showFiltres"
                >
                    <v-icon name="fa-filter" scale="0.8" />
                    <span class="text-xs">Filtres</span>
                </button>
            </div>

            <div
                :class="[
                    'flex flex-wrap gap-2 transition-all duration-300 overflow-hidden',
                    showFiltres ? 'max-h-40' : 'max-h-0 lg:max-h-40',
                ]"
            >
                <button
                    @click="filtre = 'all'"
                    :class="[
                        'btn text-slate-50 text-xs',
                        filtre === 'all' ? 'bg-slate-800' : 'btn-accent',
                    ]"
                >
                    all
                </button>
                <button
                    @click="filtre = 'visited'"
                    :class="[
                        'btn text-slate-50 text-xs',
                        filtre === 'visited' ? 'bg-slate-800' : 'btn-accent',
                    ]"
                >
                    visited
                </button>
                <button
                    v-for="continent in continents"
                    :key="continent"
                    @click="
                        filtre = continent;
                        showFiltres = false;
                    "
                    :class="[
                        'btn text-slate-50 capitalize text-xs',
                        filtre === continent ? 'bg-slate-800' : 'btn-accent',
                    ]"
                >
                    {{ continent }}
                </button>
            </div>
        </div>

        <div class="w-full p-3 overflow-auto h-130">
            <div
                v-if="lieuxFiltres.length === 0"
                class="flex justify-center items-center h-40"
            >
                <p class="text-slate-400 italic text-sm">
                    Aucun résultat pour "{{ recherche }}"
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div
                    v-for="(lieu, index) in lieuxFiltres"
                    :key="index"
                    class="flex gap-2 rounded-2xl flex-col w-full transition-all p-2 hover:-translate-y-2 shadow-2xl max-w-100 bg-amber-400"
                >
                    <div class="flex gap-2 justify-between items-center">
                        <h1 class="card-title text-slate-50 truncate">
                            {{ lieu.nom }}
                        </h1>
                        <h2
                            class="card-subtitle text-slate-50 text-sm whitespace-nowrap flex items-center gap-1"
                        >
                            <v-icon name="fa-eye" scale="0.8" />
                            {{ lieu.visiteurs }}
                        </h2>
                    </div>

                    <div class="overflow-hidden rounded-xl h-36 bg-slate-200">
                        <img
                            :src="lieu.image"
                            :alt="lieu.nom"
                            class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                        />
                    </div>

                    <div
                        class="flex gap-2 text-slate-50 text-xs px-1 items-center"
                    >
                        <v-icon name="fa-map-marker-alt" scale="0.8" />
                        <span>{{ lieu.pays }}</span>
                        <span class="text-slate-200">·</span>
                        <v-icon name="fa-globe" scale="0.8" />
                        <span>{{ lieu.continent }}</span>
                    </div>

                    <div class="w-full">
                        <button
                            class="btn text-slate-50 btn-accent w-full flex items-center justify-center gap-2"
                            @click="toggleVisited(lieu.nom)"
                        >
                            <v-icon
                                :name="
                                    visites.includes(lieu.nom)
                                        ? 'fa-check-circle'
                                        : 'fa-plane'
                                "
                                scale="0.9"
                            />
                            {{
                                visites.includes(lieu.nom)
                                    ? "visité"
                                    : "visiter"
                            }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            recherche: "",
            filtre: "all",
            visites: [],
            showFiltres: false,

            lieux: [
                {
                    nom: "Tour Eiffel",
                    pays: "France",
                    continent: "Europe",
                    visiteurs: "7M/an",
                    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80",
                },
                {
                    nom: "Colisée",
                    pays: "Italie",
                    continent: "Europe",
                    visiteurs: "7.5M/an",
                    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80",
                },
                {
                    nom: "Sagrada Família",
                    pays: "Espagne",
                    continent: "Europe",
                    visiteurs: "4.5M/an",
                    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&q=80",
                },
                {
                    nom: "Big Ben",
                    pays: "Royaume-Uni",
                    continent: "Europe",
                    visiteurs: "6M/an",
                    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80",
                },
                {
                    nom: "Acropole",
                    pays: "Grèce",
                    continent: "Europe",
                    visiteurs: "3.2M/an",
                    image: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=600&q=80",
                },
                {
                    nom: "Santorini",
                    pays: "Grèce",
                    continent: "Europe",
                    visiteurs: "2M/an",
                    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=80",
                },
                {
                    nom: "Taj Mahal",
                    pays: "Inde",
                    continent: "Asie",
                    visiteurs: "8M/an",
                    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&q=80",
                },
                {
                    nom: "Tokyo",
                    pays: "Japon",
                    continent: "Asie",
                    visiteurs: "12M/an",
                    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80",
                },
                {
                    nom: "Grande Muraille",
                    pays: "Chine",
                    continent: "Asie",
                    visiteurs: "10M/an",
                    image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=600&q=80",
                },
                {
                    nom: "Angkor Wat",
                    pays: "Cambodge",
                    continent: "Asie",
                    visiteurs: "2.6M/an",
                    image: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=600&q=80",
                },
                {
                    nom: "Petra",
                    pays: "Jordanie",
                    continent: "Asie",
                    visiteurs: "1.1M/an",
                    image: "https://images.unsplash.com/photo-1579606032821-4e6161c81bd3?w=600&q=80",
                },
                {
                    nom: "Burj Khalifa",
                    pays: "Émirats Arabes",
                    continent: "Asie",
                    visiteurs: "2M/an",
                    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
                },
                {
                    nom: "Times Square",
                    pays: "États-Unis",
                    continent: "Amérique",
                    visiteurs: "50M/an",
                    image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&q=80",
                },
                {
                    nom: "Grand Canyon",
                    pays: "États-Unis",
                    continent: "Amérique",
                    visiteurs: "6M/an",
                    image: "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=600&q=80",
                },
                {
                    nom: "Machu Picchu",
                    pays: "Pérou",
                    continent: "Amérique",
                    visiteurs: "1.5M/an",
                    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=600&q=80",
                },
                {
                    nom: "Christ Rédempteur",
                    pays: "Brésil",
                    continent: "Amérique",
                    visiteurs: "2M/an",
                    image: "https://images.unsplash.com/photo-1543059080-f9b1272213d5?w=600&q=80",
                },
                {
                    nom: "Chutes du Niagara",
                    pays: "Canada",
                    continent: "Amérique",
                    visiteurs: "14M/an",
                    image: "https://images.unsplash.com/photo-1489447068241-b3490214e879?w=600&q=80",
                },
                {
                    nom: "Pyramides de Gizeh",
                    pays: "Égypte",
                    continent: "Afrique",
                    visiteurs: "14M/an",
                    image: "https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=600&q=80",
                },
                {
                    nom: "Serengeti",
                    pays: "Tanzanie",
                    continent: "Afrique",
                    visiteurs: "350k/an",
                    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=80",
                },
                {
                    nom: "Victoria Falls",
                    pays: "Zimbabwe",
                    continent: "Afrique",
                    visiteurs: "300k/an",
                    image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=600&q=80",
                },
                {
                    nom: "Maki de Madagascar",
                    pays: "Madagascar",
                    continent: "Afrique",
                    visiteurs: "255k/an",
                    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_bdFPfZd6UXBvMTcq0G52HyndeA9YI-LSnQ&s",
                },
                {
                    nom: "Parc Isalo",
                    pays: "Madagascar",
                    continent: "Afrique",
                    visiteurs: "80k/an",
                    image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&q=80",
                },
                {
                    nom: "Nosy Be",
                    pays: "Madagascar",
                    continent: "Afrique",
                    visiteurs: "120k/an",
                    image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=600&q=80",
                },
                {
                    nom: "Plage de Belle Mare",
                    pays: "Maurice",
                    continent: "Afrique",
                    visiteurs: "1.4M/an",
                    image: "https://images.unsplash.com/photo-1571406252241-db0280bd36cd?w=600&q=80",
                },
                {
                    nom: "Piton de la Fournaise",
                    pays: "Réunion",
                    continent: "Afrique",
                    visiteurs: "500k/an",
                    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
                },
                {
                    nom: "Anse Source d'Argent",
                    pays: "Seychelles",
                    continent: "Afrique",
                    visiteurs: "400k/an",
                    image: "https://images.unsplash.com/photo-1548407260-da850faa41e3?w=600&q=80",
                },
                {
                    nom: "Îles Comores",
                    pays: "Comores",
                    continent: "Afrique",
                    visiteurs: "50k/an",
                    image: "https://images.unsplash.com/photo-1559825481-12a05cc00344?w=600&q=80",
                },
                {
                    nom: "Lagon de Mayotte",
                    pays: "Mayotte",
                    continent: "Afrique",
                    visiteurs: "55k/an",
                    image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=600&q=80",
                },
                {
                    nom: "Opéra de Sydney",
                    pays: "Australie",
                    continent: "Océanie",
                    visiteurs: "10M/an",
                    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&q=80",
                },
                {
                    nom: "Uluru",
                    pays: "Australie",
                    continent: "Océanie",
                    visiteurs: "250k/an",
                    image: "https://images.unsplash.com/photo-1529108190281-9a4f620bc2d8?w=600&q=80",
                },
                {
                    nom: "Bora Bora",
                    pays: "Polynésie Fr.",
                    continent: "Océanie",
                    visiteurs: "280k/an",
                    image: "https://images.unsplash.com/photo-1589979481223-deb893043163?w=600&q=80",
                },
                {
                    nom: "Mont-Saint-Michel",
                    pays: "France",
                    continent: "Europe",
                    visiteurs: "3M/an",
                    image: "https://images.unsplash.com/photo-1596394723269-b2cbca4e6313?w=600&q=80",
                },
            ],
        };
    },

    computed: {
        continents() {
            return [...new Set(this.lieux.map((l) => l.continent))].sort();
        },

        lieuxFiltres() {
            return this.lieux.filter((l) => {
                const matchRecherche =
                    l.nom
                        .toLowerCase()
                        .includes(this.recherche.toLowerCase().trim()) ||
                    l.pays
                        .toLowerCase()
                        .includes(this.recherche.toLowerCase().trim());

                const matchFiltre =
                    this.filtre === "all" ||
                    (this.filtre === "visited" &&
                        this.visites.includes(l.nom)) ||
                    l.continent === this.filtre;

                return matchRecherche && matchFiltre;
            });
        },
    },

    methods: {
        toggleVisited(nom) {
            if (this.visites.includes(nom)) {
                this.visites = this.visites.filter((v) => v !== nom);
            } else {
                this.visites.push(nom);
            }
        },
    },
};
</script>
