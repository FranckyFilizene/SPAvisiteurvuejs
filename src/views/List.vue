<template>
  <div class="flex flex-col gap-2 text-slate-800 w-full min-h-screen p-2">
    <div class="w-full p-3 border-b-2 border-slate-800 flex justify-between">
      <h1 class="text-4xl">List des visiteurs</h1>
      <div class="flex gap-2 items-center">
        <label for="combobox" class="font-bold">filtrer par :</label>
        <select
          id="combobox"
          class="bg-slate-800 p-4 rounded-lg text-slate-50 cursor-pointer"
        >
          <option value="all">tout</option>
          <option value="days">dernier jour</option>
          <option value="weeks">dernier semaine</option>
          <option value="months">dernier mois</option>
        </select>
      </div>
    </div>
    <div class="flex-1 overflow-y-scroll">
      <div class="w-full h-screen bg-amber-300"></div>
    </div>
  </div>
</template>

<script></script>
