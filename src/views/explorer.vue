<template>
    <div class="flex flex-col gap-2">
        <div
            class="w-full z-100 p-4 bg-amber-400 sticky flex gap-4 rounded-2xl shadow-2xl top-0"
        >
            <button class="btn text-slate-50 btn-accent">all</button>
            <button class="btn text-slate-50 btn-accent">visited</button>
        </div>
        <div class="w-full p-3 overflow-auto h-130">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div
                    class="flex gap-2 rounded-2xl flex-col w-full transition-all p-2 hover:-translate-y-2 shadow-2xl max-w-100 bg-amber-400"
                >
                    <div class="flex gap-2 justify-between items-center">
                        <h1 class="card-title text-slate-50">Paris</h1>
                        <h2 class="card-subtitle text-slate-50 text-sm">visiteur 22 prs</h2>
                    </div>
                    <div class="">
                        <img
                            src="/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques,_Paris_août_2014_(2).jpg"
                            alt="Paris"
                        />
                    </div>
                    <div class="w-full">
                        <button class="btn text-slate-50 btn-accent w-full">
                            visiter
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <pre class="text-slate-900">{{ data }}</pre>
</template>

<script>
export default {
    data() {
        return {
            data: null,
        };
    },

    mounted() {
        const response = fetch("https://api.escuelajs.co/api/v1/locations", {
            method: "GET",
            headers: {
                Authorization: "Bearer /* YOUR_ACCESS_TOKEN_HERE */",
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then(console.log);

        this.data = response.name;
    },
};
</script>
