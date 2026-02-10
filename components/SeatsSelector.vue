<template>
 <div
    ref="seats_selec"
    v-if="id_selecionado && !seatsConfirmed"
    class="bg-gray-100 p-5 font-sans"
  >
    <div class="max-w-md mx-auto mb-6 text-center">
      <h2 class="text-xl font-bold text-gray-800">Selecione suas Poltronas</h2>
      <p class="text-sm text-gray-500 mt-1">
        Selecionadas:
        <span class="font-bold text-blue-600">
          {{
            selectedSeats.length > 0
              ? selectedSeats.sort((a, b) => a - b).join(', ')
              : 'Nenhuma'
          }}
        </span>
      </p>
    </div>

    <div
      class="max-w-sm mx-auto bg-white p-6 rounded-[2.5rem] shadow-2xl border-x-4 border-gray-200 relative"
    >
      <div
        class="w-full h-16 bg-gray-800 rounded-t-[2rem] mb-8 flex justify-between items-center px-8 relative overflow-hidden"
      >
        <div class="w-12 h-1 bg-gray-600 rounded-full"></div>
        <div
          class="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"
        ></div>
      </div>

      <div class="grid grid-cols-5 gap-y-3">
        <template v-for="row in 10" :key="row">
          <button
            @click="toggleSeat(row * 4 - 3)"
            :class="getSeatClass(row * 4 - 3)"
            class="w-10 h-10 rounded-lg border-b-4 flex items-center justify-center text-sm font-bold transition-all active:scale-90"
          >
            {{ row * 4 - 3 }}
          </button>

          <button
            @click="toggleSeat(row * 4 - 2)"
            :class="getSeatClass(row * 4 - 2)"
            class="w-10 h-10 rounded-lg border-b-4 flex items-center justify-center text-sm font-bold transition-all active:scale-90"
          >
            {{ row * 4 - 2 }}
          </button>

          <div class="flex items-center justify-center">
            <div class="w-[1px] h-full bg-gray-100"></div>
          </div>

          <button
            @click="toggleSeat(row * 4 - 1)"
            :class="getSeatClass(row * 4 - 1)"
            class="w-10 h-10 rounded-lg border-b-4 flex items-center justify-center text-sm font-bold transition-all active:scale-90"
          >
            {{ row * 4 - 1 }}
          </button>

          <button
            @click="toggleSeat(row * 4)"
            :class="getSeatClass(row * 4)"
            class="w-10 h-10 rounded-lg border-b-4 flex items-center justify-center text-sm font-bold transition-all active:scale-90"
          >
            {{ row * 4 }}
          </button>
          </template>
      </div>

      <div
        class="mt-8 pt-4 border-t-2 border-dashed border-gray-100 flex justify-center"
      >
        <span
          class="text-[10px] font-bold text-gray-300 tracking-[0.2em] uppercase"
          >Fundo do Veículo</span
        >
      </div>
    </div>

    <div class="max-w-sm mx-auto mt-8">
      <button
        :disabled="selectedSeats.length === 0"
        class="w-full py-4 rounded-2xl font-black text-lg transition-all shadow-lg active:scale-95"
        :class="
          selectedSeats.length > 0
            ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        "
        @click="confirmSeats()"
      >
        Confirmar ({{ selectedSeats.length }})
      </button>
    </div>
  </div>
</template>

 <script setup>
 import { ref, reactive, onMounted, watch } from 'vue';

const seats_selec = ref(null);

onMounted(() => {
  seats_selec.value?.scrollIntoView({ behavior: 'smooth' });
});

const {
  origemSelecionada,
  buscaRealizada,
  dataSelecionada,
  id_selecionado,
  destinoSelecionado,
  citiesData,
  routesData,
  selectedSeats,
  seatsConfirmed,
  passengers,
  ticketPrice
} = useBusStore();

const occupiedSeats = [5, 6, 12, 19, 20, 33];

const toggleSeat = (num) => {
  if (occupiedSeats.includes(num)) return;

  const index = selectedSeats.value.indexOf(num);
  if (index > -1) {
    selectedSeats.value.splice(index, 1);
  } else {
    selectedSeats.value.push(num);
  }
};

const confirmSeats = () => {
  seatsConfirmed.value = true;
  ticketPrice.value = ticketPrice.value * selectedSeats.value.length;
 console.log(ticketPrice.value)
  console.log(selectedSeats.value.length)

};

const getSeatClass = (num) => {
  if (occupiedSeats.includes(num)) {
    return 'bg-gray-300 border-gray-400 text-gray-100 cursor-not-allowed';
  }
  if (selectedSeats.value.includes(num)) {
    return 'bg-blue-600 border-blue-800 text-white shadow-inner translate-y-1';
  }
  return 'bg-white border-gray-200 text-gray-700 hover:border-blue-400 hover:bg-blue-50';
};

watch(
  selectedSeats,
  (newSeats) => {
    const currentSeats = Object.keys(passengers);
    currentSeats.forEach((seat) => {
      if (!newSeats.includes(parseInt(seat))) {
        delete passengers[seat];
      }
    });
  },
  { deep: true }
);
</script>