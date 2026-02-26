<template>
  <ClientOnly>
    <div class="max-w-md mx-auto bg-white p-4 rounded-2xl shadow-xl border-l-4 border-green-700 mb-4">
      <div v-for="(ticket, index) in tickets" :key="ticket.id_ticket" class="mb-8 border-b pb-4">

        <div :id="'ticket-' + index"
          class="bg-stone-100 text-slate-700 w-full mb-2 flex flex-col gap-2 px-4 py-8 text-xs">
          <span class="text-center text-xl m-4 font-bold">VIAÇÃO PARANAENSE</span>
          <span>Origem: <strong>{{ cities_array[ticket.id_origin].toUpperCase() }}</strong></span>
          <span>Destino: <strong>{{ cities_array[ticket.id_destination].toUpperCase() }}</strong></span>
          <span>Data : <strong>{{ ticket.departure_date.replaceAll('-', '/') }}</strong> | Horário:
            <strong>{{ ticket.departure_time }}</strong> | Poltrona: <strong>{{ ticket.seat_number }}</strong></span>
          <span>Bilhete: <strong>{{ ticket.id_ticket }}</strong> | Tipo: <strong>{{ ticket.bus_type }}</strong></span>
          <span>Tipo Viagem: <strong>{{ ticket.type }}</strong></span>
          <span>Linha: <strong>{{ linha.itinerary }}</strong></span>
          <hr />
          <span>Tarifa: <strong>{{ formatCurrency(ticket.price - ticket.toll - ticket.boarding_fee) }}</strong></span>
          <span>Pedágio: <strong>{{ formatCurrency(ticket.toll) }}</strong></span>
          <span>Taxa de Embarque: <strong>{{ formatCurrency(ticket.boarding_fee) }}</strong></span>
          <span>Total a Pagar: <strong>{{ formatCurrency(ticket.price) }}</strong></span>
          <hr />
          <span>CPF Passageiro: <strong>{{ ticket.cpf }}</strong></span>
          <hr />
          <div class="mx-auto my-4">
            <QRCode :ticket-data="ticket" />
          </div>
        </div>

        <button
          class="max-w-[80%] mx-auto flex justify-around items-center gap-4 p-4 bg-green-500 hover:bg-green-600 active:scale-95 text-white font-bold rounded-lg text-lg transition-all shadow-md"
          @click="downloadPDF(index)">
          <Printer />
          Imprimir Bilhete {{ ticket.seat_number }}
        </button>
      </div>
      <button
        class="mx-auto flex justify-around items-center gap-4 p-4 bg-green-500 hover:bg-green-600 active:scale-95 text-white font-bold rounded-lg text-lg transition-all shadow-md"
        @click="resetAll()">
        <Tickets />
        Comprar Outra Passagem
      </button>
    </div>
  </ClientOnly>
</template>

<script setup>
import { Printer, Tickets } from 'lucide-vue-next';

const props = defineProps(['cities_array']);

const {
  origemSelecionada,
  isInSearchMode,
  id_selecionado,
  destinoSelecionado,
  selectedSeats,
  seatsConfirmed,
  passengers,
  ticketPrice,
  tickets
} = useBusStore();

const { data: linha } = useFetch('/api/get_itinerario', {
  query: {
    id_origin: origemSelecionada.value,
    id_destination: destinoSelecionado.value,
  }
});

function resetAll() {
  tickets.value = [];
  origemSelecionada.value = "";
  destinoSelecionado.value = "";
  id_selecionado.value = "";
  passengers.value = [];
  selectedSeats.value = [];
  seatsConfirmed.value = false;
  isInSearchMode.value = false;
  unitPrice.value = 0.0;
  ticketPrice.value = 0.0;
  paymentConfirmed.value = false;

  window.reload()

  /*window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });*/
}

async function downloadPDF(index) {
  if (process.client) {
    const html2pdf = (await import('html2pdf.js')).default;

    const element = document.getElementById(`ticket-${index}`);

    const opt = {
      margin: 10,
      filename: `bilhete-${tickets.value[index].id_ticket}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  }
}
</script>