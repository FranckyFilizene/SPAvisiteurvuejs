<template>
    <div class="flex justify-start items-center flex-col w-full h-full p-5">
        <div class="w-full shadow-lg flex flex-col gap-3">
            <div class="bg-blue-900 w-full h-16 flex justify-start items-center rounded-t-2xl p-5">
                <h1 class="text-white font-bold text-2xl">List des visiteur</h1>
            </div>
            <table class ='w-full text-left border-collapse'>
                <thead>
                    <tr class ='bg-slate-300 text-slate-700 uppercase text-sm leading-normal'>
                        <th className='py-3 px-6 border-b border-gray-400'>Nom</th>
                        <th className='py-3 px-6 border-b border-gray-400'>Numero</th>
                        <th className='py-3 px-6 border-b border-gray-400'>Nombre du jour</th>
                        <th className='py-3 px-6 border-b border-gray-400'>Tarif journalier</th>
                        <th className='py-3 px-6 border-b border-gray-400'>Action</th>
                    </tr>
                </thead>
                <tbody className='text-slate-700 text-sm font-light'>
                    <tr className='border-b border-gray-300 hover:bg-slate-100 transition-colors'>
                        <td className='py-3 px-6 flex items-center gap-2'>Francky</td>
                        <td className='py-3 px-6'>0385382860</td>
                        <td className='py-3 px-6'>25 jour(s)</td>
                        <td className='py-3 px-6'>10000 Ar</td>
                        <td class="flex py-3 px-6 justify-start items-center gap-2">
                            <button>Delete</button>
                            <button>Edit</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>

</script>