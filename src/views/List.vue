<template>
  <div class="flex flex-col gap-2 text-slate-800 w-full min-h-screen p-2">
    <div class="w-full p-3 gap-3 flex-wrap flex items-center justify-evenly">
      <h1 class="text-4xl font-bold">List des visiteurs </h1>
      <div class="flex items-center max-w-100 w-full gap-2 ">
        <input type="text" class="border-3 w-full p-2 border-slate-800 rounded-lg" placeholder="rechercher par nom">
      </div>
      <div class="flex gap-2 max-w-80 w-full items-center">
        <select
          id="combobox"
          class="bg-slate-800 flex-1  border-3  outline-none p-4 rounded-lg text-slate-50 cursor-pointer"
        >
          <option value="all">tout</option>
          <option value="days">dernier jour</option>
          <option value="weeks">dernier semaine</option>
          <option value="months">dernier mois</option>
        </select>
      </div>
    </div>
    <div class="h-full overflow-auto">
      <div class="w-full h-screen"></div>
    </div>
  </div>
</template>

<script></script>
