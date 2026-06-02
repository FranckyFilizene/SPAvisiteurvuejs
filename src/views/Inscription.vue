<template>
    <div
        class="w-full text-[10px] min-h-screen flex justify-center items-center bg-slate-50"
    >
        <div
            :class="[
                'top-0 left-0 w-full h-screen backdrop-blur-xl flex flex-col justify-center items-center gap-4 z-50 transition-all duration-500',
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
            <div
                id="box2"
                class="w-full flex flex-col justify-center gap-3 items-center max-w-120 border border-slate-800/20 rounded-2xl shadow-2xl p-6 bg-slate-50"
            >
                <h1 class="text-center text-4xl text-slate-700 font-bold">
                    <span class="text-amber-400">S</span>'inscrire
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
                                    ? 'border-red-500'
                                    : Nom && !ErrorNom
                                      ? 'border-green-500'
                                      : 'border-slate-300',
                            ]"
                        >
                            <input
                                type="text"
                                @input="valideNom"
                                placeholder="Entrer votre nom"
                                class="outline-none w-full bg-transparent"
                                v-model="Nom"
                            />
                        </div>
                        <span
                            v-if="ErrorNom"
                            class="ml-3 text-red-500 text-xs"
                            >{{ ErrorNom }}</span
                        >
                    </div>

                    <div class="flex flex-col gap-1">
                        <div
                            :class="[
                                'w-full border rounded-2xl p-3 shadow transition-colors duration-300',
                                ErrorPrenom
                                    ? 'border-red-500'
                                    : Prenom && !ErrorPrenom
                                      ? 'border-green-500'
                                      : 'border-slate-300',
                            ]"
                        >
                            <input
                                type="text"
                                @input="validePrenom"
                                placeholder="Entrer votre prénom"
                                class="outline-none w-full bg-transparent"
                                v-model="Prenom"
                            />
                        </div>
                        <span
                            v-if="ErrorPrenom"
                            class="ml-3 text-red-500 text-xs"
                            >{{ ErrorPrenom }}</span
                        >
                    </div>

                    <div class="flex flex-col gap-1">
                        <div
                            :class="[
                                'w-full border rounded-2xl p-3 shadow transition-colors duration-300',
                                ErrorEmail
                                    ? 'border-red-500'
                                    : Email && !ErrorEmail
                                      ? 'border-green-500'
                                      : 'border-slate-300',
                            ]"
                        >
                            <input
                                type="email"
                                @input="valideEmail"
                                placeholder="Entrer votre email"
                                class="outline-none w-full bg-transparent"
                                v-model="Email"
                            />
                        </div>
                        <span
                            v-if="ErrorEmail"
                            class="ml-3 text-red-500 text-xs"
                            >{{ ErrorEmail }}</span
                        >
                    </div>

                    <div class="flex flex-col gap-1">
                        <div
                            :class="[
                                'w-full border rounded-2xl p-3 shadow transition-colors duration-300',
                                ErrorPwd
                                    ? 'border-red-500'
                                    : Pwd && !ErrorPwd
                                      ? 'border-green-500'
                                      : 'border-slate-300',
                            ]"
                        >
                            <input
                                @input="validePwd"
                                :type="viewPwd ? 'text' : 'password'"
                                placeholder="Créer votre mot de passe"
                                class="outline-none w-full bg-transparent"
                                v-model="Pwd"
                            />
                        </div>
                        <span
                            v-if="ErrorPwd"
                            class="ml-3 text-red-500 text-xs"
                            >{{ ErrorPwd }}</span
                        >
                    </div>

                    <div class="flex flex-col gap-1">
                        <div
                            :class="[
                                'w-full border rounded-2xl p-3 shadow transition-colors duration-300',
                                ErrorConfirmPwd
                                    ? 'border-red-500'
                                    : ConfirmPwd && !ErrorConfirmPwd
                                      ? 'border-green-500'
                                      : 'border-slate-300',
                            ]"
                        >
                            <input
                                @input="valideConfirmPwd"
                                :type="viewPwd ? 'text' : 'password'"
                                placeholder="Confirmer votre mot de passe"
                                class="outline-none w-full bg-transparent"
                                v-model="ConfirmPwd"
                            />
                        </div>
                        <span
                            v-if="ErrorConfirmPwd"
                            class="ml-3 text-red-500 text-xs"
                            >{{ ErrorConfirmPwd }}</span
                        >
                    </div>

                    <div class="flex items-center gap-2 ml-3">
                        <input
                            id="check"
                            v-model="viewPwd"
                            class="cursor-pointer accent-slate-700"
                            type="checkbox"
                        />
                        <label
                            for="check"
                            class="text-xs text-slate-500 cursor-pointer"
                            >Afficher le mot de passe</label
                        >
                    </div>

                    <div class="w-full flex justify-around gap-3 mt-2">
                        <button
                            type="submit"
                            :class="[
                                'p-3 rounded-2xl w-full text-white shadow-2xl transition-all duration-300 font-medium',
                                disable
                                    ? 'bg-amber-500 cursor-pointer hover:bg-amber-600 active:scale-95'
                                    : 'bg-slate-400 cursor-not-allowed',
                            ]"
                            :disabled="!disable"
                        >
                            S'inscrire
                        </button>
                    </div>

                    <p
                        v-if="errorMessage"
                        class="rounded-xl bg-red-100 px-3 py-2 text-sm text-red-600"
                    >
                        {{ errorMessage }}
                    </p>
                </form>

                <div class="border-t-2 border-slate-500/30 w-full p-2">
                    <p class="text-xs text-slate-600">
                        J'ai déjà un compte ?
                        <router-link
                            class="text-blue-400 cursor-pointer hover:underline"
                            to="/login"
                            >Se connecter</router-link
                        >
                    </p>
                </div>
            </div>

            <div class="w-[50%] lg:block overflow-hidden hidden">
                <img
                    src="/register.png"
                    class="drop-shadow-slate-800/30 drop-shadow-2xl"
                    id="img"
                    alt="Illustration"
                />
            </div>
        </div>
    </div>
</template>

<script>
import Loading from "../Layouts/loading.vue";

export default {
    components: {
        Loading,
    },
    data() {
        return {
            viewPwd: false,
            Nom: "",
            Prenom: "",
            Email: "",
            Pwd: "",
            ConfirmPwd: "",
            ErrorNom: "",
            ErrorPrenom: "",
            ErrorEmail: "",
            ErrorPwd: "",
            ErrorConfirmPwd: "",
            disable: false,
            success: false,
            errorMessage: "",
        };
    },

    computed: {
        validationForm() {
            return (
                this.Nom &&
                this.Prenom &&
                this.Email &&
                this.Pwd &&
                this.ConfirmPwd &&
                !this.ErrorNom &&
                !this.ErrorPrenom &&
                !this.ErrorEmail &&
                !this.ErrorPwd &&
                !this.ErrorConfirmPwd
            );
        },
    },

    watch: {
        validationForm(val) {
            this.disable = val;
        },

        Pwd() {
            if (this.ConfirmPwd) this.valideConfirmPwd();
        },
    },

    mounted() {
        gsap.from("#box", { duration: 1, opacity: 0, y: 50 });
        gsap.from("#img", { duration: 1, x: -500, delay: 0.8 });
        gsap.from("#box2", { duration: 1, y: 50, delay: 0.3 });
    },

    methods: {
        valideNom() {
            if (!this.Nom) this.ErrorNom = "Champ obligatoire";
            else if (this.Nom.trim().length < 2)
                this.ErrorNom = "Le nom doit contenir au moins 2 caractères";
            else this.ErrorNom = "";
        },

        validePrenom() {
            if (!this.Prenom) this.ErrorPrenom = "Champ obligatoire";
            else if (this.Prenom.trim().length < 2)
                this.ErrorPrenom =
                    "Le prénom doit contenir au moins 2 caractères";
            else this.ErrorPrenom = "";
        },

        valideEmail() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!this.Email) this.ErrorEmail = "Champ obligatoire";
            else if (!emailRegex.test(this.Email))
                this.ErrorEmail = "Email invalide";
            else this.ErrorEmail = "";
        },

        validePwd() {
            if (!this.Pwd) this.ErrorPwd = "Champ obligatoire";
            else if (this.Pwd.length < 6)
                this.ErrorPwd = "Mot de passe invalide (6 caractères minimum)";
            else this.ErrorPwd = "";
        },

        valideConfirmPwd() {
            if (!this.ConfirmPwd) this.ErrorConfirmPwd = "Champ obligatoire";
            else if (this.ConfirmPwd !== this.Pwd)
                this.ErrorConfirmPwd = "Les mots de passe ne correspondent pas";
            else this.ErrorConfirmPwd = "";
        },

        Valider() {
            this.valideNom();
            this.validePrenom();
            this.valideEmail();
            this.validePwd();
            this.valideConfirmPwd();

            if (
                this.ErrorNom ||
                this.ErrorPrenom ||
                this.ErrorEmail ||
                this.ErrorPwd ||
                this.ErrorConfirmPwd
            )
                return;

            localStorage.setItem("token", "authenticated_token_example");
            this.errorMessage = "";
            this.success = true;

            setTimeout(() => {
                this.$router.push("/login");
            }, 2000);
        },
    },
};
</script>