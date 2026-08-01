<template>
    <div class="w-full flex items-center justify-center  min-h-screen">
        <div class="flex-1">
            <img src="/public/Secure login-pana.svg" class="w-xl" alt="">
        </div>
        <div class="flex-1 ">
            <div class="mb-4">
                <div class="badge">visiteur.com</div>
                <h1 class="text-8xl font-bold">Login</h1>
            </div>
            <form action="" class=" w-full max-w-130 card">
                <div class=" card card-actions">
                    <label for="">Email ou telephone</label>
                    <input type="text" placeholder="Ex:Admin@gmail.com" class="input w-full">
                </div>
                <div class=" card card-actions">
                    <label for="">Mot de passe</label>
                    <div class="input relative flex w-full">
                        <input type="password">
                           <v-icon name="fa-eye"  />
                    </div>
                </div>
                <div class="flex w-full justify-between my-3">
                    <label for="check" class="label"><input id="check" class=" checkbox checkbox-sm" type="checkbox">Se
                        souvenir de moi</label>
                    <a href="">
                        Mot de passe oublier ?
                    </a>
                </div>
                <div class="mt-2  flex justify-between flex-wrap gap-3">
                    <button class="btn flex-1 ">login</button>
                    <router-link class="btn btn-outline flex-1" to="/inscription">Register</router-link>

                </div>
                <div class=" divider w-full h-px"></div>
            </form>
        </div>
    </div>
</template>
<script >
</script>