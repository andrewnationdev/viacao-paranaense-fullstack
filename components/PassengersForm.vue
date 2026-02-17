<template>
<div
    ref="pass_form"
    v-if="selectedSeats.length > 0 && seatsConfirmed && !paymentConfirmed"
    class="p-5 font-sans"
  >
    <div class="max-w-md mx-auto">
      <div
        class="bg-white p-6 rounded-2xl shadow-xl border-l-4 border-teal-500"
      >
        <h2
          class="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2"
        >
          <span>👤</span> Dados dos Passageiros
        </h2>

        <form @submit.prevent="finalizarReserva" class="space-y-6">
          <div
            v-for="seat in selectedSeats.sort((a, b) => a - b)"
            :key="seat"
            class="p-4 bg-gray-50 rounded-xl border border-gray-100 flex flex-col gap-3"
          >
            <div class="flex items-center justify-between">
              <span
                class="text-xs font-bold text-blue-600 uppercase tracking-wider"
                >Poltrona</span
              >
              <span
                class="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-black"
                >{{ seat }}</span
              >
            </div>

            <div class="flex flex-col">
              <label
                class="text-[10px] font-bold text-gray-400 uppercase mb-1 ml-1"
                >CPF do Passageiro</label
              >
              <input
                type="text"
                v-model="passengers[seat]"
                placeholder="000.000.000-00"
                v-maska data-maska="###.###.###-##"
                class="p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none transition-all text-gray-700"
                required
              />
            </div>
          </div>

          <div class="flex flex-col">
            <span class="text-[10px] text-gray-400 uppercase leading-none"
              >Valor a Pagar</span
            >
            <span class="text-xl font-bold text-green-500 mt-1">
              R$
              {{ ticketPrice.toFixed(2).replace('.', ',') }}
            </span>
          </div>

          <button
            type="submit"
            class="w-full py-4 bg-green-500 hover:bg-green-600 text-white font-black rounded-xl shadow-lg shadow-green-100 transition-all active:scale-95"
          >
            Realizar o Pagamento
          </button>
        </form>
      </div>
    </div>
  </div>
  </template>

  <script setup>
  import { ref, onMounted } from 'vue';
  import { vMaska } from "maska/vue"

const pass_form = ref(null);

onMounted(() => {
  pass_form.value?.scrollIntoView({ behavior: 'smooth' });
});

  const {
  origemSelecionada,
  isInSearchMode,
  dataSelecionada,
  id_selecionado,
  destinoSelecionado,
  citiesData,
  routesData,
  selectedSeats,
  seatsConfirmed,
  passengers,
  ticketPrice,
  tickets,
  partida,
  serviceType,
  paymentConfirmed
} = useBusStore();

const finalizarReserva = async () => {
    const payload = {
      id_origin: origemSelecionada.value,
      id_destination: destinoSelecionado.value,
      date: dataSelecionada.value,
      departure_time: partida.value,
      price: ticketPrice.value / Object.entries(passengers).length,
      passengers: Object.entries(passengers).map(([seat, cpf]) => ({
        seat_number: Number(seat),
        cpf: cpf,
      })),
      service: serviceType.value
    }

    window.open("https://www.bing.com/ck/a?!&&p=9699ca9a7a33f3573c46968fdc4bc8f97f908a56e9277957411e40f7646268d2JmltdHM9MTc3MDMzNjAwMA&ptn=3&ver=2&hsh=4&fclid=0d3aea7f-0a32-62cd-180b-fc8b0b056369&u=a1aHR0cHM6Ly9udWJhbmsuY29tLmJyL251L2NvbnRhP21zb2NraWQ9MGQzYWVhN2YwYTMyNjJjZDE4MGJmYzhiMGIwNTYzNjk");
    
    try {
      const tickets_req = await fetch('/api/handle_ticket', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const data = await tickets_req.json();
      if (data.status.code == 200) {
        alert('Reserva enviada com sucesso!');

        tickets.value = data.data;
        paymentConfirmed.value = true;

        const history = JSON.parse(localStorage.getItem('purchases')) || [];

        const newItems = Array.isArray(data.data) ? data.data : [data.data];
        const updatedHistory = [...history, ...newItems];
        localStorage.setItem('purchases', JSON.stringify(updatedHistory));
      } else {
        alert(data.status.message);
      }
    } catch(err){
      alert(err)
    }
  };
  </script>