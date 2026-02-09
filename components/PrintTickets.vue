<template>
<div class="max-w-md mx-auto bg-white p-4 rounded-2xl shadow-xl border-l-4 border-teal-500 mb-4">
<div v-for="ticket in tickets">
<div class="flex flex-col gap-4">
    <div class="bg-stone-100 text-slate-700 w-full mb-2 flex flex-col gap-2 px-4 py-8 text-xs">
        <span class="text-center text-xl m-4 font-bold">VIAÇÃO PARANAENSE</span>
        <span>Origem: <strong>{{cities_array[ticket.id_origin].toUpperCase()}}</strong></span>
        <span>Destino: <strong>{{cities_array[ticket.id_destination].toUpperCase()}}</strong></span>
        <span>Data : <strong>{{ticket.departure_date.replaceAll('-', '/')}}</strong> | Horário: <strong>{{ticket.departure_time}}</strong> | Poltrona: <strong>{{ticket.seat_number}}</strong></span>
        <span>Bilhete: <strong>{{ticket.id_ticket}}</strong> | Tipo: <strong>{{ticket.bus_type}}</strong></span>
        <span>Tipo Viagem: <strong>{{ticket.type}}</strong></span>
        <span>Linha: <strong>{{''}}</strong></span>
        <hr/>
        <span>Tarifa: <strong>{{ticket.price}}</strong></span>
        <span>Pedágio: <strong></strong>{{tickets.toll}}</span>
        <span>Taxa de Embarque: <strong>{{tickets.boarding_fee}}</strong></span>
        <span>Total a Pagar: <strong>{{ticket.price}}</strong></span>
        <hr/>
        <span>CPF Passageiro: <strong>{{ticket.cpf}}</strong></span>
        <hr/>
        <div class="mx-auto my-4">
          <QRCode :ticket-data="ticket"/>
        </div>
    </div>
</div>
   <button
        class="max-w-[60%] mx-auto flex justify-around items-center gap-4 p-4 bg-teal-500 hover:bg-teal-600 active:scale-95 text-white font-bold rounded-lg text-lg transition-all shadow-md"
      >
        <Printer />
        Imprimir o Bilhete
      </button>
</div>
</div>
</template>

<script setup>
import { Printer } from 'lucide-vue-next';
const data = defineProps(['cities_array']);

const {
  origemSelecionada,
  isInSearchMode,
  dataSelecionada,
  id_selecionado,
  tickets,
  citiesData,
  routesData,
  destinoSelecionado,
  ticketPrice,
  selectedSeats,
  passengers,
} = useBusStore();
</script>