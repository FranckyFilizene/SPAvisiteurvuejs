<template>
    <div
        class="w-full text-[10px] min-h-screen flex justify-center items-center bg-slate-50"
    >
        <div
            :class="[
                'top-0 w-full h-screen backdrop-blur-[7px]',
                success ? 'fixed' : 'hidden',
            ]"
        ></div>
        <div
            class="flex-1 flex justify-center items-center rounded-2xl shadow-2xl max-w-250 bg-amber-400 p-5"
        >
            <div class="w-[50%] lg:block hidden">
                <img src="/login.png" alt="" />
            </div>
            <div
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
                                class="outline-none w-full bg-transparent"
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
                                class="outline-none w-full bg-transparent"
                                v-model="Pwd"
                            />
                        </div>
                        <span v-if="ErrorPwd" class="ml-3 text-red-500 text-xs">
                            {{ ErrorPwd }}
                        </span>
                    </div>

                    <!-- Checkbox -->
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
                        >
                            Afficher le mot de passe
                        </label>
                    </div>

                    <div class="w-full flex justify-around gap-3 mt-2">
                        <button
                            type="submit"
                            :class="[
                                'p-3 rounded-2xl w-full text-white shadow-2xl transition-all duration-300 font-medium',
                                disable
                                    ? ' bg-slate-600 cursor-pointer'
                                    : 'bg-slate-400 cursor-not-allowed',
                            ]"
                            :disabled="!disable"
                        >
                            Connexion
                        </button>
                        <button
                            type="button"
                            @click="$router.push('/inscription')"
                            class="border-2 p-3 w-full rounded-2xl border-slate-600/30 cursor-pointer duration-300 font-medium"
                        >
                            S'inscrire
                        </button>
                    </div>
                </form>
                <div class="border-t-2 border-slate-500/30 w-full p-3">
                    <p
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
                this.Nom === "Admin" &&
                this.Pwd === "password" &&
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

    methods: {
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
            if (!this.Nom || !this.Pwd) {
                this.errorMessage = "Veuillez remplir tous les champs.";
                if (!this.Nom) this.ErrorNom = "Champ obligatoire";
                if (!this.Pwd) this.ErrorPwd = "Champ obligatoire";
                return;
            }

            localStorage.setItem("token", "authenticated_token_example");
            this.errorMessage = "";
            this.success = true;

            setTimeout(() => {
                this.$router.push("/dashboard");
            }, 1000);
        },
    },
};
</script>
