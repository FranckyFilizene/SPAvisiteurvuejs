<template>
    <div class="flex justify-center items-center h-screen w-full">
       <div class="bg-slate-200 p-6 rounded-lg w-[30%] flex justify-center items-center flex-col gap-7 shadow-lg">
            <h1 class="text-3xl font-bold text-blue-950">Inscription</h1>
            <form action="" @submit.prevent="handleregistre" class="w-full h-full flex flex-col gap-5">
                <div class="bg-white w-full px-2 py-2 rounded-lg shadow-lg">
                    <input 
                    type="text" 
                    v-model="nom" 
                    placeholder="Votre Nom" 
                    class="w-full focus:outline-none">
                </div>
                <div class="bg-white w-full px-2 py-2 rounded-lg shadow-lg">
                    <input 
                    v-model="email"
                    type="email" 
                    placeholder="Votre Email" 
                    class="w-full focus:outline-none">
                </div>
                <div class="bg-white w-full px-2 py-2 rounded-lg shadow-lg">
                    <input 
                    v-model="password"
                    placeholder="Votre Mot de passe" 
                    :type="showpassword ? 'text' : 'password'"
                    class="w-full focus:outline-none">
                </div>
                <div class="bg-white w-full px-2 py-2 rounded-lg shadow-lg">
                    <input 
                    v-model="confirmpassword"
                    :type="showpassword ? 'text' : 'password'"
                    placeholder="Confirmer votre Mot de passe" 
                    class="w-full focus:outline-none">
                </div>
                <div>
                    <input 
                    type="checkbox" 
                    name="check" 
                    v-model="showpassword"
                    id="check">
                    <span>Afficher le mot de passe</span>
                </div>
                <div class="flex justify-center items-center w-full flex-col gap-1">
                    <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-900 duration-700 w-full">Inscrire</button>
                    <router-link to="/login" class="text-[13px] text-blue-500 hover:underline">j'ai deja un compte? se connecter</router-link>
                </div>
                <div>
                    <p v-if="error" class="text-red-600">{{ error }}</p>
                </div>
            </form>
       </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const nom = ref('');
const email = ref('');
const password = ref('');
const confirmpassword = ref('');
const error = ref('');
const showpassword = ref(false);

const router = useRouter();

const handleregistre = () => {
    if(!nom.value || !password.value || !email.value){
        error.value ='Veuillez remplir tout les champs !!!';
        return;
    }

    if(password.value !== confirmpassword.value){
        error.value='Veuillez verifier votre mots de passe';
        return;
    }
    
    // Inscription simple - juste afficher un message de succès
    error.value = ''; // Réinitialiser l'erreur
    alert('Inscription réussie !!!');
    router.push('/login');
}

/*
    // Version avec appel PHP (à activer plus tard)
    try{
        const dataUsers = {
           nom :nom.value,
           email : email.value,
           password : password.value
        };


        const res = await axios.post('http://localhost/Delegg-Hub/SPAvisiteurVuejs/src/Backend/Inscription.php',dataUsers);

        if(res.data.status === 'success'){
            alert('Inscription réussie !!!');
            router.push('/login');
        }else {
            console.log(res.data.message);
        }
    }catch(err){
        console.log('error lors de l\'inscription', err);
    }
    */
</script>