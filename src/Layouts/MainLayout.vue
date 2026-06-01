<template>
    <div
        class="w-full text-[10px] p-4 items-center flex justify-center text-slate-50 min-h-screen"
        :style="gridstylebg"
    >
        <div class="flex gap-5 flex-1 max-h-200 h-[95vh]">
            <div
                class="bg-amber-400 hidden lg:flex flex-col w-40 justify-between p-5 rounded-xl shadow-2xl"
            >
                <Aside />

                <div class="flex gap-2 flex-col">
                    <button
                        class="bg-blue-500/20 border text-slate-800 font-medium border-slate-800 gap-2 cursor-pointer rounded-xl flex items-center justify-center p-2 hover:bg-slate-500/30 transition-colors duration-300"
                        @click="$router.push('/parametre')"
                    >
                        <div class="scale-x-[-1]">
                            <v-icon name="fa-cog" />
                        </div>
                        Parametre
                    </button>
                    <button
                        class="bg-red-500/20 border text-red-600 font-medium border-red-500 gap-2 cursor-pointer rounded-xl flex items-center justify-center p-2 hover:bg-red-500/30 transition-colors duration-300"
                        @click="logout"
                    >
                        <div class="scale-x-[-1]">
                            <v-icon name="fa-sign-out-alt" />
                        </div>
                        Déconnexion
                    </button>
                </div>
            </div>

            <div
                v-if="mobileMenuOpen"
                class="lg:hidden fixed inset-0 z-50 bg-black/50"
                @click.self="mobileMenuOpen = false"
            >
                <div
                    class="w-[50%] h-full bg-amber-400 p-5 rounded-r-xl shadow-2xl flex flex-col justify-between"
                >
                    <div>
                        <div
                            class="flex justify-between items-center mb-5"
                        ></div>
                        <ul class="flex flex-col gap-2">
                            <li v-for="(item, index) in menuItems" :key="index">
                                <router-link
                                    :to="item.path"
                                    class="flex items-center gap-3 p-3 rounded-lg hover:bg-amber-600 transition-colors duration-300"
                                    @click="mobileMenuOpen = false"
                                >
                                    <v-icon :name="item.icon" />
                                    <span>{{ item.label }}</span>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                    <button
                        class="bg-red-500/20 border text-red-600 font-medium border-red-500 gap-2 cursor-pointer rounded-xl flex items-center justify-center p-3 hover:bg-red-500/30 transition-colors"
                        @click="logout"
                    >
                        <div class="scale-x-[-1]">
                            <v-icon name="fa-sign-out-alt" />
                        </div>
                        Déconnexion
                    </button>
                </div>
            </div>

            <div class="flex flex-1 flex-col gap-5">
                <div
                    class="w-full rounded-2xl flex gap-3 items-center p-3 bg-amber-400 shadow-2xl"
                >
                    <div class="flex-1">
                        <h1 class="text-2xl font-bold">
                            {{ date }}
                        </h1>
                    </div>
                    <div class="p-2 border rounded-full">
                        <button>
                            <v-icon name="fa-bell" />
                        </button>
                    </div>

                    <button
                        @click="mobileMenuOpen = !mobileMenuOpen"
                        class="lg:hidden block bg-amber-400 p-3 rounded-xl shadow-lg"
                    >
                        <v-icon name="fa-bars" />
                    </button>
                </div>
                <div
                    class="w-full bg-amber-400/10  overflow-auto rounded-xl p-2 shadow-2xl border border-amber-400"
                >
                  
                        <router-view />
                
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { gridstylebg } from "../Router/styledefault";
import Aside from "./aside.vue";

export default {
    data() {
        return {
            gridstylebg,
            mobileMenuOpen: false,
            date: new Date().toLocaleDateString("fr-FR", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
            }),
            menuItems: [
                {
                    label: "Dashboard",
                    path: "/dashboard",
                    icon: "fa-chart-line",
                },
                { label: "Explorer", path: "/explorer", icon: "fa-globe" },
                { label: "Ajouter", path: "/add", icon: "fa-user-plus" },
                { label: "Lister", path: "/list", icon: "fa-th-list" },
            ],
        };
    },
    components: {
        Aside,
    },
    methods: {
        logout() {
            localStorage.removeItem("token");
            this.$router.push("/login");
        },
    },
};
</script>