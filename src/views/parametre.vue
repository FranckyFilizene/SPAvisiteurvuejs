<template>
    <div class="flex flex-col gap-4 w-full p-1">
        <div
            class="bg-amber-400 rounded-2xl shadow-md p-3 flex items-center gap-3"
        >
            <div
                class="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0"
            >
                <v-icon name="fa-cog" class="text-white" scale="1" />
            </div>
            <div>
                <h1 class="text-sm font-bold text-white">Paramètres</h1>
                <p class="text-[10px] text-white/70">
                    Gérez votre compte et vos préférences
                </p>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-5 gap-4">
            <div class="lg:col-span-2 flex flex-col gap-4">
                <div
                    class="rounded-2xl border border-slate-200/60 shadow-sm bg-white/60 overflow-hidden"
                >
                    <div
                        class="bg-linear-to-br from-amber-400 to-amber-500 p-6 flex flex-col items-center gap-3"
                    >
                        <!-- Avatar -->
                        <div class="relative">
                            <div
                                class="w-20 h-20 rounded-full bg-white/30 border-4 border-white flex items-center justify-center shadow-lg"
                            >
                                <span class="text-3xl font-bold text-white">
                                    {{
                                        profil.nom?.charAt(0).toUpperCase() ??
                                        "A"
                                    }}
                                </span>
                            </div>
                            <button
                                class="absolute bottom-0 right-0 w-7 h-7 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors shadow"
                            >
                                <v-icon
                                    name="fa-edit"
                                    class="text-white"
                                    scale="0.7"
                                />
                            </button>
                        </div>
                        <div class="text-center">
                            <p class="font-bold text-white text-sm">
                                {{ profil.nom }}
                            </p>
                            <p class="text-white/70 text-[10px]">
                                {{ profil.email }}
                            </p>
                        </div>
                    </div>

                    <div class="p-4 flex flex-col gap-3">
                        <div
                            class="flex items-center gap-3 p-3 bg-slate-50 rounded-xl"
                        >
                            <div
                                class="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center shrink-0"
                            >
                                <v-icon
                                    name="fa-user"
                                    class="text-amber-500"
                                    scale="0.8"
                                />
                            </div>
                            <div>
                                <p class="text-[10px] text-slate-400">
                                    Nom complet
                                </p>
                                <p class="text-xs font-semibold text-slate-700">
                                    {{ profil.nom }}
                                </p>
                            </div>
                        </div>
                        <div
                            class="flex items-center gap-3 p-3 bg-slate-50 rounded-xl"
                        >
                            <div
                                class="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center shrink-0"
                            >
                                <v-icon
                                    name="fa-envelope"
                                    class="text-blue-500"
                                    scale="0.8"
                                />
                            </div>
                            <div>
                                <p class="text-[10px] text-slate-400">Email</p>
                                <p class="text-xs font-semibold text-slate-700">
                                    {{ profil.email }}
                                </p>
                            </div>
                        </div>
                        <div
                            class="flex items-center gap-3 p-3 bg-slate-50 rounded-xl"
                        >
                            <div
                                class="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0"
                            >
                                <v-icon
                                    name="fa-phone-alt"
                                    class="text-emerald-500"
                                    scale="0.8"
                                />
                            </div>
                            <div>
                                <p class="text-[10px] text-slate-400">
                                    Téléphone
                                </p>
                                <p class="text-xs font-semibold text-slate-700">
                                    {{ profil.telephone }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="lg:col-span-3 flex flex-col gap-4">
                <div
                    class="rounded-2xl border border-slate-200/60 shadow-sm bg-white/60 overflow-hidden"
                >
                    <div
                        class="px-5 py-3 border-b border-slate-100 flex items-center gap-2"
                    >
                        <v-icon
                            name="fa-user-edit"
                            class="text-amber-400"
                            scale="0.9"
                        />
                        <h2
                            class="text-xs font-bold text-slate-700 uppercase tracking-wide"
                        >
                            Modifier le profil
                        </h2>
                    </div>
                    <div class="p-5 flex flex-col gap-4">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div class="flex flex-col gap-1">
                                <label
                                    class="text-[10px] font-semibold text-slate-500 flex items-center gap-1 uppercase tracking-wide"
                                >
                                    <v-icon
                                        name="fa-user"
                                        scale="0.75"
                                        class="text-amber-400"
                                    />
                                    Nom
                                </label>
                                <div
                                    :class="[
                                        'flex items-center gap-2 border rounded-xl px-3 py-2.5 transition-all duration-200',
                                        profil.nom
                                            ? 'border-amber-400 bg-amber-50/40'
                                            : 'border-slate-200 bg-slate-50/50',
                                    ]"
                                >
                                    <input
                                        v-model="profil.nom"
                                        type="text"
                                        placeholder="Votre nom"
                                        class="flex-1 outline-none text-xs bg-transparent text-slate-700 placeholder:text-slate-300"
                                    />
                                </div>
                            </div>
                            <div class="flex flex-col gap-1">
                                <label
                                    class="text-[10px] font-semibold text-slate-500 flex items-center gap-1 uppercase tracking-wide"
                                >
                                    <v-icon
                                        name="fa-envelope"
                                        scale="0.75"
                                        class="text-amber-400"
                                    />
                                    Email
                                </label>
                                <div
                                    :class="[
                                        'flex items-center gap-2 border rounded-xl px-3 py-2.5 transition-all duration-200',
                                        profil.email
                                            ? 'border-amber-400 bg-amber-50/40'
                                            : 'border-slate-200 bg-slate-50/50',
                                    ]"
                                >
                                    <input
                                        v-model="profil.email"
                                        type="email"
                                        placeholder="Votre email"
                                        class="flex-1 outline-none text-xs bg-transparent text-slate-700 placeholder:text-slate-300"
                                    />
                                </div>
                            </div>
                            <div class="flex flex-col gap-1">
                                <label
                                    class="text-[10px] font-semibold text-slate-500 flex items-center gap-1 uppercase tracking-wide"
                                >
                                    <v-icon
                                        name="fa-phone-alt"
                                        scale="0.75"
                                        class="text-amber-400"
                                    />
                                    Téléphone
                                </label>
                                <div
                                    :class="[
                                        'flex items-center gap-2 border rounded-xl px-3 py-2.5 transition-all duration-200',
                                        profil.telephone
                                            ? 'border-amber-400 bg-amber-50/40'
                                            : 'border-slate-200 bg-slate-50/50',
                                    ]"
                                >
                                    <input
                                        v-model="profil.telephone"
                                        type="text"
                                        placeholder="034 XX XXX XX"
                                        class="flex-1 outline-none text-xs bg-transparent text-slate-700 placeholder:text-slate-300"
                                    />
                                </div>
                            </div>
                            <div class="flex flex-col gap-1">
                                <label
                                    class="text-[10px] font-semibold text-slate-500 flex items-center gap-1 uppercase tracking-wide"
                                >
                                    <v-icon
                                        name="fa-map-marker-alt"
                                        scale="0.75"
                                        class="text-amber-400"
                                    />
                                    Adresse
                                </label>
                                <div
                                    :class="[
                                        'flex items-center gap-2 border rounded-xl px-3 py-2.5 transition-all duration-200',
                                        profil.adresse
                                            ? 'border-amber-400 bg-amber-50/40'
                                            : 'border-slate-200 bg-slate-50/50',
                                    ]"
                                >
                                    <input
                                        v-model="profil.adresse"
                                        type="text"
                                        placeholder="Votre adresse"
                                        class="flex-1 outline-none text-xs bg-transparent text-slate-700 placeholder:text-slate-300"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="flex justify-end">
                            <button
                                @click="sauvegarderProfil"
                                class="flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-all shadow-md shadow-amber-400/20 hover:scale-105 active:scale-95"
                            >
                                <v-icon name="fa-save" scale="0.85" />
                                Sauvegarder
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    class="rounded-2xl border border-slate-200/60 shadow-sm bg-white/60 overflow-hidden"
                >
                    <div
                        class="px-5 py-3 border-b border-slate-100 flex items-center gap-2"
                    >
                        <v-icon
                            name="fa-lock"
                            class="text-amber-400"
                            scale="0.9"
                        />
                        <h2
                            class="text-xs font-bold text-slate-700 uppercase tracking-wide"
                        >
                            Changer le mot de passe
                        </h2>
                    </div>
                    <div class="p-5 flex flex-col gap-4">
                        <div class="flex flex-col gap-1">
                            <label
                                class="text-[10px] font-semibold text-slate-500 uppercase tracking-wide"
                                >Mot de passe actuel</label
                            >
                            <div
                                :class="[
                                    'flex items-center gap-2 border rounded-xl px-3 py-2.5 transition-all',
                                    mdp.actuel
                                        ? 'border-amber-400 bg-amber-50/40'
                                        : 'border-slate-200 bg-slate-50/50',
                                ]"
                            >
                                <v-icon
                                    name="fa-lock"
                                    class="text-slate-300"
                                    scale="0.8"
                                />
                                <input
                                    v-model="mdp.actuel"
                                    :type="showMdp ? 'text' : 'password'"
                                    placeholder="••••••••"
                                    class="flex-1 outline-none text-xs bg-transparent text-slate-700 placeholder:text-slate-300"
                                />
                            </div>
                        </div>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div class="flex flex-col gap-1">
                                <label
                                    class="text-[10px] font-semibold text-slate-500 uppercase tracking-wide"
                                    >Nouveau mot de passe</label
                                >
                                <div
                                    :class="[
                                        'flex items-center gap-2 border rounded-xl px-3 py-2.5 transition-all',
                                        mdp.nouveau
                                            ? 'border-amber-400 bg-amber-50/40'
                                            : 'border-slate-200 bg-slate-50/50',
                                    ]"
                                >
                                    <v-icon
                                        name="fa-lock"
                                        class="text-slate-300"
                                        scale="0.8"
                                    />
                                    <input
                                        v-model="mdp.nouveau"
                                        :type="showMdp ? 'text' : 'password'"
                                        placeholder="••••••••"
                                        class="flex-1 outline-none text-xs bg-transparent text-slate-700 placeholder:text-slate-300"
                                    />
                                </div>
                            </div>
                            <div class="flex flex-col gap-1">
                                <label
                                    class="text-[10px] font-semibold text-slate-500 uppercase tracking-wide"
                                    >Confirmer</label
                                >
                                <div
                                    :class="[
                                        'flex items-center gap-2 border rounded-xl px-3 py-2.5 transition-all',
                                        mdp.confirmer
                                            ? mdp.confirmer === mdp.nouveau
                                                ? 'border-green-400 bg-green-50/40'
                                                : 'border-red-400 bg-red-50/40'
                                            : 'border-slate-200 bg-slate-50/50',
                                    ]"
                                >
                                    <v-icon
                                        name="fa-lock"
                                        class="text-slate-300"
                                        scale="0.8"
                                    />
                                    <input
                                        v-model="mdp.confirmer"
                                        :type="showMdp ? 'text' : 'password'"
                                        placeholder="••••••••"
                                        class="flex-1 outline-none text-xs bg-transparent text-slate-700 placeholder:text-slate-300"
                                    />
                                </div>
                                <p
                                    v-if="
                                        mdp.confirmer &&
                                        mdp.confirmer !== mdp.nouveau
                                    "
                                    class="text-[10px] text-red-500 ml-1"
                                >
                                    Les mots de passe ne correspondent pas
                                </p>
                            </div>
                        </div>

                        <div class="flex items-center justify-between">
                            <label
                                class="flex items-center gap-2 cursor-pointer select-none"
                            >
                                <input
                                    v-model="showMdp"
                                    type="checkbox"
                                    class="checkbox checkbox-sm checkbox-warning"
                                />
                                <span class="text-xs text-slate-500"
                                    >Afficher les mots de passe</span
                                >
                            </label>
                            <button
                                @click="changerMotDePasse"
                                :disabled="
                                    !mdp.actuel ||
                                    !mdp.nouveau ||
                                    mdp.nouveau !== mdp.confirmer
                                "
                                :class="[
                                    'flex items-center gap-2 text-xs font-semibold px-5 py-2.5 rounded-xl transition-all',
                                    mdp.actuel &&
                                    mdp.nouveau &&
                                    mdp.nouveau === mdp.confirmer
                                        ? 'bg-slate-800 hover:bg-slate-700 text-white shadow-md cursor-pointer hover:scale-105'
                                        : 'bg-slate-200 text-slate-400 cursor-not-allowed',
                                ]"
                            >
                                <v-icon name="fa-lock" scale="0.85" /> Changer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <transition name="modal-fade">
            <div
                v-if="showLogoutConfirm"
                class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                @click.self="showLogoutConfirm = false"
            >
                <div
                    class="w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl bg-slate-900 border border-slate-700/50"
                >
                    <div class="bg-red-500 p-4 flex items-center gap-3">
                        <v-icon
                            name="fa-sign-out-alt"
                            class="text-white"
                            scale="1.1"
                        />
                        <h2 class="text-sm font-bold text-white">
                            Se déconnecter ?
                        </h2>
                    </div>
                    <div class="p-5">
                        <p class="text-sm text-slate-300">
                            Vous allez être redirigé vers la page de connexion.
                        </p>
                    </div>
                    <div class="px-5 pb-5 flex gap-3">
                        <button
                            @click="showLogoutConfirm = false"
                            class="flex-1 py-2.5 rounded-xl text-xs font-semibold text-slate-400 border border-slate-700 hover:bg-slate-800 transition-colors"
                        >
                            Annuler
                        </button>
                        <button
                            @click="logout"
                            class="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-red-500 hover:bg-red-600 text-white flex items-center justify-center gap-2 transition-colors"
                        >
                            <v-icon name="fa-sign-out-alt" scale="0.85" />
                            Déconnecter
                        </button>
                    </div>
                </div>
            </div>
        </transition>

        <transition name="slide-fade">
            <div
                v-if="toast.message"
                :class="[
                    'fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl text-xs font-medium text-white transition-all',
                    toast.type === 'success' ? 'bg-emerald-500' : 'bg-red-500',
                ]"
            >
                <v-icon
                    :name="
                        toast.type === 'success'
                            ? 'fa-check-circle'
                            : 'fa-times-circle'
                    "
                    scale="1"
                />
                {{ toast.message }}
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showLogoutConfirm: false,
            showMdp: false,

            profil: {
                nom: "Admin",
                email: "admin@spavisiteur.mg",
                telephone: "034 00 000 00",
                adresse: "Antananarivo, Madagascar",
            },

            mdp: {
                actuel: "",
                nouveau: "",
                confirmer: "",
            },

            toast: { message: "", type: "success" },
        };
    },

    methods: {
        sauvegarderProfil() {
            this.afficherToast("Profil mis à jour avec succès !", "success");
        },

        changerMotDePasse() {
            if (this.mdp.nouveau !== this.mdp.confirmer) return;
            this.mdp = { actuel: "", nouveau: "", confirmer: "" };
            this.afficherToast("Mot de passe changé avec succès !", "success");
        },

        logout() {
            localStorage.removeItem("token");
            this.$router.push("/login");
        },

        afficherToast(message, type = "success") {
            this.toast = { message, type };
            setTimeout(() => {
                this.toast.message = "";
            }, 3000);
        },
    },
};
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: all 0.25s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
    transform: scale(0.96) translateY(8px);
}

.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.35s ease;
}
.slide-fade-enter-from {
    opacity: 0;
    transform: translateY(12px);
}
.slide-fade-leave-to {
    opacity: 0;
    transform: translateY(8px);
}
</style>
