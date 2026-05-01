<template>
  <div class="flex flex-col gap-2 text-slate-800 w-full min-h-screen p-2">
    <div
      class="w-full p-2 gap-3 sticky top-0 z-1 bg-slate-800 border-b-2 border-slate-800 flex-wrap flex items-center justify-evenly"
    >
      <img
        src="/public/listLogo.png"
        class="max-w-30 w-full h-full max-h-30"
        alt=""
      />
      <div class="flex items-center max-w-100 w-full gap-2">
        <input
          type="text"
          class="border-3 outline-none w-full p-2 bg-slate-50 border-slate-800 rounded-lg"
          placeholder="rechercher par nom"
        />
      </div>
      <div class="flex gap-2 text-slate-50  max-w-80 w-full items-center">
        <label for="combobox">
          filtre par  :
        </label>
        <select
          id="combobox"
          class="bg-slate-800  capitalize flex-1 border-3 outline-none p-2 rounded-lg cursor-pointer"
        >
          <option class="capitalize text-[12px]" v-for="day in dayslist" :key="day" :value="day">
            {{ day }}
          </option>
        </select>
      </div>
    </div>
    <div class="h-full overflow-auto">
      <div class="w-full h-screen"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dayslist: [
        "tout",
        "dernier jour",
        "dernier semaine",
        "dernier mois",
      ],
      selectedDay: "",
    };
  },
};
</script>
