<template>
    <div class="w-full flex items-center justify-center  min-h-screen">
        <div class="flex-1">
            <img src="/public/Filing system-pana.svg" class="w-xl" alt="">
        </div>
        <div class="flex-1 ">
            <div class="mb-4">
                <div class="badge">visiteur.com</div>
                <h1 class="text-8xl font-bold">Register</h1>
            </div>
            <form action="" class=" w-full max-w-150 card">
                <div class="flex gap-2 w-full">
                    <div class=" card flex-1 card-actions">
                        <label for="">Name</label>
                        <input type="text" placeholder="Ex:Admin" class="input w-full">
                    </div>
                    <div class=" card flex-1 card-actions">
                        <label for="">User name</label>
                        <input type="text" placeholder="Ex:Admin0000" class="input w-full">
                    </div>
                </div>
                <div class=" card card-actions">
                    <label for="">telephone</label>
                    <input type="tel" placeholder="Ex:034 XX XXX XX" class="input w-full">
                </div>
                <div class=" card card-actions">
                    <label for="">Email</label>
                    <input type="email" placeholder="Ex:Admin@gmail.com" class="input w-full">
                </div>
                <div class=" card card-actions">
                    <label for="">Mot de passe</label>
                    <div class="input flex w-full">
                        <input type="password">
                        <v-icon name="fa-eye" />
                    </div>
                </div>
                <div class=" card card-actions">
                    <label for="">Confirmer le mot de passe</label>
                    <div class="input  flex w-full">
                        <input type="password">
                        <v-icon name="fa-eye" />
                    </div>
                </div>
                <div class="flex w-full justify-between my-3">
                    <label for="check" class="label"><input id="check" class=" checkbox checkbox-sm" type="checkbox">
                        Accepte terms and conditions</label>

                </div>
                <div class="mt-2  flex justify-between flex-wrap gap-3">
                    <button class="btn flex-1 ">Register</button>
                    <router-link class="btn btn-outline flex-1" to="/">login</router-link>

                </div>
                <div class=" divider w-full h-px"></div>
            </form>
        </div>
    </div>
</template>

<script lang="typescript">
</script>