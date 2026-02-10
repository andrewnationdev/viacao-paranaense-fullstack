<template>
  <ClientOnly>
    <div class="max-w-md mx-auto bg-white p-4 rounded-2xl shadow-xl border-l-4 border-teal-500 mb-4">
      <div v-for="(ticket, index) in tickets" :key="ticket.id_ticket" class="mb-8 border-b pb-4">
        
        <div :id="'ticket-' + index" class="bg-stone-100 text-slate-700 w-full mb-2 flex flex-col gap-2 px-4 py-8 text-xs">
           <h1 class="text-center text-xl m-4 font-bold">VIAÇÃO PARANAENSE</h1>
           <span>Origem: <strong>{{cities_array[ticket.id_origin]?.toUpperCase()}}</strong></span>
           <span>Destino: <strong>{{cities_array[ticket.id_destination]?.toUpperCase()}}</strong></span>
           <hr/>
           <span>Bilhete: <strong>{{ticket.id_ticket}}</strong> | Poltrona: <strong>{{ticket.seat_number}}</strong></span>
           <div class="mx-auto my-4">
             <QRCode :ticket-data="ticket"/>
           </div>
        </div>

        <button
          class="max-w-[80%] mx-auto flex justify-around items-center gap-4 p-4 bg-teal-500 hover:bg-teal-600 active:scale-95 text-white font-bold rounded-lg text-lg transition-all shadow-md"
          @click="downloadPDF(index)"
        >
          <Printer />
          Imprimir Bilhete {{ ticket.seat_number }}
        </button>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
import { Printer } from 'lucide-vue-next';

const props = defineProps(['cities_array']);
const { tickets, origemSelecionada, destinoSelecionado } = useBusStore();

async function downloadPDF(index) {
  if (process.client) {
    const html2pdf = (await import('html2pdf.js')).default;
    
    const element = document.getElementById(`ticket-${index}`);
    
    const opt = {
      margin:       10,
      filename:     `bilhete-${tickets.value[index].id_ticket}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  }
}
</script>