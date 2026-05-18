<template>
    <div class="text-[10px] text-white">
        <ul class="flex flex-col gap-2">
            <li v-for="(item, index) in menuItems" :key="index">
                <router-link
                    :to="item.path"
                    class="flex items-center gap-3 p-3 rounded-lg hover:bg-amber-600 transition-colors duration-300"
                >
                    <v-icon :name="item.icon" />
                    <span>{{ item.label }}</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            menuItems: [
                { label: "Dashboard", path: "/", icon: "fa-chart-line" },
                { label: "Explorer", path: "/explorer", icon: "fa-globe" },

                { label: "Ajouter", path: "add", icon: "fa-user-plus" },
                { label: "Lister", path: "list", icon: "fa-th-list" },
            ],
        };
    },
};
</script>
