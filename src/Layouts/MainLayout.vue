<template>
  <div class="flex h-screen w-full">
    <header
      class="flex z-30 fixed top-0 justify-around xl:justify-between p-2 gap-5 items-center w-full h-[14vh]"
    >
      <div class="flex flex-col text-slate-800">
        <div class="flex items-center gap-3">
          <div
            class="h-15 w-15 rounded-full text-slate-50 flex justify-center items-center bg-slate-800"
          >
            <v-icon name="fa-users" class="scale-[3]" />
          </div>
          <div>
            <h1 class="text-2xl text-slate-800 font-bold">SPAvisiteur</h1>
            <h2 class="text-[13px]">Gestion des visiteurs</h2>
          </div>
        </div>
      </div>
      <div @click="toggle" class="xl:hidden flex">
        <v-icon
          name="fa-bars"
          scale="1.5"
          class="text-slate-800 cursor-pointer"
        />
      </div>
      <div class="bg-slate-800 hidden xl:flex rounded-2xl w-60">
        <usercontrol />
      </div>
    </header>
    <aside
      :class="[
        'flex fixed top-[14vh] z-10 w-full left-0 h-dvh gap-5 md:w-65 text-slate-800 bg-slate-800 shadow-2xl shadow-slate-800 flex-col transition-transform duration-300',
        isOpen ? 'translate-x-0' : '-translate-x-full',
      ]"
    >
      <div class="bg-slate-800 p-4 flex xl:hidden rounded-2xl w-full">
        <usercontrol />
      </div>

      <div class="flex justify-around p-5 gap-5 h-50 flex-col">
        <router-link
          v-for="section in sectionrouters"
          :key="section.path"
          :to="section.path"
          class="flex gap-2 items-center transition-all border-b-4 border-slate-600 active:scale-[0.9] bg-slate-100 rounded-[10px] shadow-2xs shadow-slate-50/10 p-3"
        >
          <v-icon :name="section.icon" scale="1.2" class="text-slate-700" />
          <span>{{ section.label }}</span>
        </router-link>
      </div>
      <div class="flex text-slate-50 justify-center p-5 gap-5 h-50 flex-col">
        <button
          @click="handlelogout"
          class="bg-blue-400 rounded-[10px] transition-all shadow-2xs shadow-slate-50/10 p-3 cursor-pointer border-b-4 border-slate-600"
        >
          se deconnecter
          <v-icon
            name="fa-sign-out-alt"
            scale="1.2"
            class="scale-x-[-1]"
          />
        </button>
      </div>
    </aside>
    <main class="content xl:ml-65 overflow-auto ml-0 mt-[14vh] w-full">
      <div>
        <router-view />
      </div>
    </main>
  </div>
</template>

<script>
import usercontrol from "./usercontrol.vue";

export default {
  components: {
    usercontrol,
  },
  data() {
    return {
      isOpen: true,
      sectionrouters: [
        { path: "/dashboard", label: "Dashboard", icon: "fa-chart-bar" },
        { path: "/add", label: "Ajouter", icon: "fa-address-book" },
        { path: "/list", label: "Liste", icon: "fa-th-list" },
      ],
    };
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
    handlelogout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
};
</script>
<style scoped>
main::-webkit-scrollbar {
  width: 0;
}
</style>
