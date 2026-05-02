<template>
  <div class="flex flex-col gap-2 text-slate-800 w-full min-h-screen p-2">
    <div class="w-full p-3 gap-3 flex-wrap flex items-center justify-evenly">
      <h1 class="text-4xl font-bold">List des visiteurs </h1>
      <div class="flex items-center max-w-100 w-full gap-2 ">
        <input type="text" class="border-3 w-full p-2 border-slate-800 rounded-lg" placeholder="rechercher par nom">
      </div>
      <div class="flex gap-2 max-w-80 w-full items-center">
        <select id="combobox"
          class="bg-slate-800 flex-1  border-3  outline-none p-4 rounded-lg text-slate-50 cursor-pointer">
          <option value="all">tout</option>
          <option value="days">dernier jour</option>
          <option value="weeks">dernier semaine</option>
          <option value="months">dernier mois</option>
        </select>
      </div>
    </div>
    <div class="p-8 w-full h-full">
      <div class="bg-slate-200 rounded-xl shadow-2xl overflow-hidden">
        <div class="bg-slate-800 p-6 flex justify-between items-center">
          <h1 className='text-2xl font-bold text-white'>Liste des Visiteurs</h1>
          <button
            className='bg-orange-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors'>
            Actualiser
          </button>
        </div>
        <div className='overflow-x-auto'>
          <table className='w-full text-left border-collapse'>
            <thead>
              <tr className='bg-slate-300 text-slate-700 uppercase text-sm leading-normal'>
                <th className='py-3 px-6 border-b border-gray-400'>Nom</th>
                <th className='py-3 px-6 border-b border-gray-400'>Numéro</th>
                <th className='py-3 px-6 border-b border-gray-400'>Jours</th>
                <th className='py-3 px-6 border-b border-gray-400'>Tarif (Ar)</th>
                <th className='py-3 px-6 border-b border-gray-400 font-bold'>Total (Ar)</th>
                <th className='py-3 px-6 border-b border-gray-400'>Action</th>
              </tr>
            </thead>
            <tbody class="text-slate-700 text-sm font-light">
              <tr class="border-b border-gray-300 hover:bg-slate-100 transition-colors">
                <td class="py-3 px-6 flex items-center gap-2">
                    Francky
                </td>
                <td class="py-3 px-6">
                  0385382860
                </td>
                <td class="py-3 px-6 font-medium">20</td>
                <td class="py-3 px-6">2000</td>
                <td class="py-3 px-6 font-bold text-blue-900">40000</td>
                <td class="py-3 px-6 flex justify-start items-center gap-10">
                  <v-icon name="fa-edit" fill="green" scale="1.5" class="hover:scale-[1.2] duration-500"/>
                  <button>delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script></script>
