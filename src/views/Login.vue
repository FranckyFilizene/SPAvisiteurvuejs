<template>
    <div
        class="w-full text-[10px] min-h-screen flex justify-center items-center bg-slate-50"
    >
        <div
            :class="[
                'top-0 left-0 w-full h-screen z-50 backdrop-blur-xl bg-black/40',
                'flex flex-col justify-center items-center gap-4',
                'transition-opacity duration-500',
                success ? 'fixed opacity-100' : 'hidden opacity-0',
            ]"
        >
            <div class="w-full h-full flex justify-center items-center">
                <div class="p-5 rounded-2xl bg-sky-50">
                    <Loading />
                </div>
            </div>
        </div>
        <div
            id="box"
            class="flex-1 flex justify-center items-center rounded-2xl shadow-2xl max-w-4xl bg-amber-400 p-5 w-[95%] mx-auto"
        >
            <div class="w-[50%] overflow-hidden lg:block hidden">
                <img
                    src="/login.png"
                    class="drop-shadow-slate-800/30 drop-shadow-2xl"
                    id="img"
                    alt=""
                />
            </div>
            <div
                id="box2"
                class="w-full flex flex-col justify-center gap-3 items-center max-w-120 border border-slate-800/20 rounded-2xl shadow-2xl p-6 bg-slate-50"
            >
                <h1 class="text-center text-4xl text-slate-700 font-bold">
                    <span class="text-amber-400">S</span>PAvisiteur
                </h1>

                <form
                    @submit.prevent="Valider"
                    class="w-full flex flex-col max-w-100 gap-3"
                >
                    <div class="flex flex-col gap-1">
                        <div
                            :class="[
                                'w-full border rounded-2xl p-3 shadow transition-colors duration-300',
                                ErrorNom
                                    ? 'border-red-500 '
                                    : Nom && !ErrorNom
                                      ? 'border-green-500 '
                                      : 'border-slate-300',
                            ]"
                        >
                            <input
                                type="text"
                                @input="valideNom"
                                placeholder="Entrer votre nom"
                                class="outline-none text-slate-800 text-xs w-full bg-transparent placeholder:text-slate-400"
                                v-model="Nom"
                            />
                        </div>
                        <span v-if="ErrorNom" class="ml-3 text-red-500 text-xs">
                            {{ ErrorNom }}
                        </span>
                    </div>

                    <div class="flex flex-col gap-1">
                        <div
                            :class="[
                                'w-full border rounded-2xl p-3 shadow transition-colors duration-300',
                                ErrorPwd
                                    ? 'border-red-500 '
                                    : Pwd && !ErrorPwd
                                      ? 'border-green-500 '
                                      : 'border-slate-300',
                            ]"
                        >
                            <input
                                @input="validePwd"
                                :type="viewPwd ? 'text' : 'password'"
                                placeholder="Entrer votre mot de passe"
                                class="outline-none text-slate-800 text-xs w-full bg-transparent placeholder:text-slate-400"
                                v-model="Pwd"
                            />
                        </div>
                        <span v-if="ErrorPwd" class="ml-3 text-red-500 text-xs">
                            {{ ErrorPwd }}
                        </span>
                    </div>

       
                    <div class="flex items-center gap-2 ml-1">
                        <input
                            id="check"
                            v-model="viewPwd"
                            type="checkbox"
                            class="checkbox w-4 h-4 checkbox-sm checkbox-warning"
                        />
                        <label
                            for="check"
                            class="text-xs text-slate-500 cursor-pointer select-none"
                        >
                            Afficher le mot de passe
                        </label>
                    </div>

                    <div class="w-full flex gap-3 mt-2">
                        <button
                            type="submit"
                            :class="[
                                'flex-1 p-3 rounded-2xl text-white text-xs font-semibold shadow-md transition-all duration-300',
                                disable
                                    ? 'bg-slate-700 hover:bg-slate-800 cursor-pointer'
                                    : 'bg-slate-300 cursor-not-allowed',
                            ]"
                            :disabled="!disable"
                        >
                            Connexion
                        </button>
                        <button
                            type="button"
                            @click="$router.push('/inscription')"
                            class="flex-1 p-3 rounded-2xl text-xs font-semibold text-amber-500 border-2 border-amber-400 hover:bg-amber-400 hover:text-white transition-all duration-300 cursor-pointer"
                        >
                            S'inscrire
                        </button>
                    </div>
                </form>
                <div class="border-t-2 border-slate-500/30 w-full p-2">
                    <p
                        @click="forgotPassword"
                        class="text-blue-400 text-right cursor-pointer hover:underline"
                    >
                        Mot de passe oublié ?
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import gsap from "gsap";
import Loading from "../Layouts/loading.vue";
export default {
    data() {
        return {
            viewPwd: false,
            Nom: "",
            Pwd: "",
            ErrorNom: "",
            ErrorPwd: "",
            disable: false,
            success: false,
            errorMessage: "",
        };
    },

    computed: {
        validationForm() {
            return (
                this.Nom.trim().length >= 3 &&
                this.Pwd.length >= 6 &&
                !this.ErrorNom &&
                !this.ErrorPwd
            );
        },
    },

    watch: {
        validationForm(val) {
            this.disable = val;
        },
    },

    components: {
        Loading,
    },

    mounted() {
        gsap.from("#box", { duration: 1, opacity: 0, y: 50 });
        gsap.from("#img", { duration: 1, x: 500, delay: 0.8 });
        gsap.from("#box2", { duration: 1, y: 50, delay: 0.3 });
    },

    methods: {
        forgotPassword() {
            this.$router.push("/forgot");
        },

        valideNom() {
            if (!this.Nom) {
                this.ErrorNom = "Champ obligatoire";
            } else if (this.Nom.trim().length < 3) {
                this.ErrorNom = "Le nom doit contenir au moins 3 caractères";
            } else {
                this.ErrorNom = "";
            }
        },

        validePwd() {
            if (!this.Pwd) {
                this.ErrorPwd = "Champ obligatoire";
            } else if (this.Pwd.length < 6) {
                this.ErrorPwd = "Mot de passe invalide (6 caractères minimum)";
            } else {
                this.ErrorPwd = "";
            }
        },

        Valider() {
            if (!this.validationForm) {
                this.errorMessage = "Veuillez vérifier vos informations.";
                if (!this.Nom) this.ErrorNom = "Champ obligatoire";
                if (!this.Pwd) this.ErrorPwd = "Champ obligatoire";
                return;
            }

            this.success = true;

            setTimeout(() => {
                localStorage.setItem("token", "authenticated_token_example");
                this.$router.push("/dashboard");
            }, 2000);
        },
    },
};
</script>
