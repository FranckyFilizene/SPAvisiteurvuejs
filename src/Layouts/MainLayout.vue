<template>
    <div class="layout">
        
        <header class="header bg-gray-400 flex justify-between items-center px-4">
            <h1>header</h1>
            <h1>profil</h1>
        </header>

        <nav class= "nav text-gray-200 flex justify-between items-center gap-5 bg-blue-950 flex-col py-2">
            <h1>
                titre
            </h1>
            <div class="flex justify-center items-center flex-col">
                <router-link to="/dashboard" class="cursor-pointer">Dashboard</router-link>
                <router-link to="/add" class="cursor-pointer">Add</router-link>
                <router-link to="/list" class="cursor-pointer">List</router-link>
            </div>
           <div>
               <button @click="handlelogout" class="cursor-pointer">Logout</button>
           </div>
        </nav>
        <main class="content bg-slate-300 px-3 py-2">
            <router-view/>
        </main>
    </div>
</template>
<script setup>
 const handlelogout = () => {
    localStorage.removeItem('token');
    // On change l'URL de manière brute, ce qui réinitialise tout proprement
    window.location.href = '/login'; 
};
</script>
<style scoped>
.layout{
    display : grid;
    grid-template-areas: 
    "head head head"
    "nav content content";
    grid-template-columns: 200px 1fr 1fr;
    grid-template-rows:  45px 1fr;
    height: 100vh;
}

.header{
    grid-area: head;
}

.nav{
    grid-area: nav;
}

.content{
    grid-area: content;
}

</style>