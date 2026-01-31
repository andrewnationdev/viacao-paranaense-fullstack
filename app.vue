<template>
  <Header />
  <div class="min-h-screen bg-teal-100 p-5 font-sans">
    <DebugPanel v-if="false" />
    <Form v-if="viagens" :cidades="cidades" :viagens="viagens" />

    <!--<div
      v-else
      class="text-center p-10 bg-white rounded-2xl shadow-sm border border-dashed border-gray-300"
    >
      <span class="text-4xl">🏜️</span>
      <p class="mt-4 text-gray-500 font-medium">
        Nenhuma viagem encontrada para esta rota hoje.
      </p>
    </div>-->

    <div v-if="buscaRealizada" class="space-y-6 max-w-xl mx-auto">
      <div v-if="viagensFiltradas.length > 0">
        <div
          v-for="viagem in viagensFiltradas"
          :key="viagem.id"
          class="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:translate-y-[-4px] my-6 hover:border-blue-400 transition-all duration-200"
        >
          <div class="flex items-center justify-between mb-6">
            <div class="flex flex-col">
              <span class="text-2xl font-extrabold text-gray-900 leading-none">
                {{ viagem.departures[0]?.time || '06:00' }}
              </span>
              <span
                class="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider font-medium mt-1"
              >
                {{ citiesMap[viagem.id_origin] || 'Carregando...' }}
              </span>
            </div>

            <div class="flex-grow flex flex-col items-center px-5 relative">
              <span class="text-[10px] text-gray-400 mb-1">{{
                viagem.duration
              }}</span>
              <div class="h-[2px] bg-gray-200 w-full relative"></div>
              <span class="text-xs text-blue-500 mt-[-8px] bg-white px-2 italic"
                >🚌</span
              >
            </div>

            <div class="flex flex-col text-right">
              <span
                class="text-2xl font-extrabold text-gray-900 leading-none"
                >{{
                  calculateEstimatedArrival(
                    viagem.duration,
                    viagem.departures[0]?.time
                  )
                }}</span
              >
              <span
                class="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider font-medium mt-1"
              >
                {{ citiesMap[viagem.id_destination] || 'Carregando...' }}
              </span>
            </div>
          </div>

          <div
            class="flex justify-between items-center border-t border-dashed border-gray-200 pt-4"
          >
            <div class="flex flex-col">
              <span class="text-[10px] text-gray-400 uppercase leading-none"
                >A partir de</span
              >
              <span class="text-xl font-bold text-green-500 mt-1">
                R$ {{ viagem.price.toFixed(2).replace('.', ',') }}
              </span>
            </div>
            <button
              class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold shadow-sm transition-colors"
              @click="selectTrip(viagem.id, viagem.price)"
            >
              Selecionar
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-else
      class="text-center p-10 bg-white rounded-2xl shadow-sm border border-dashed border-gray-300"
    >
      <p class="text-gray-500">Nenhuma viagem encontrada para essa rota.</p>
    </div>
  </div>

  <div
    v-if="id_selecionado && !seats_confirmed"
    class="min-h-screen bg-gray-100 p-5 font-sans"
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

  <div
    v-if="selectedSeats.length > 0 && seats_confirmed"
    class="min-h-screen bg-gray-100 p-5 font-sans"
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
              {{ ticketPrice.value }}
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
import { ref, reactive, watch } from 'vue';
import { calculateEstimatedArrival } from './utils/calculate';

const { data: cidades } = await useFetch('/api/get_cidades');
const { data: viagens } = await useFetch('/api/get_viagens');

const {
  origemSelecionada,
  buscaRealizada,
  dataSelecionada,
  id_selecionado,
  citiesData,
  routesData,
  destinoSelecionado,
  ticketPrice,
} = useBusStore();

if (cidades && viagens) {
  citiesData.value = cidades;
  routesData.value = viagens;
}

const citiesMap = computed(() => {
  if (!cidades.value) return {};
  return cidades.value.reduce((acc, city) => {
    acc[city.id] = city.name;
    return acc;
  }, {});
});

const selectedSeats = ref([]);
const passengers = reactive({});

const occupiedSeats = [5, 6, 12, 19, 20, 33];

const seats_confirmed = useState('seats_confirm', () => false);

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
  seats_confirmed.value = true;
  ticketPrice.value = ticketPrice.value * selectedSeats.value.length;
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

const selectTrip = (id, price) => {
  id_selecionado.value = id;
  ticketPrice.value = parseFloat(price);
};

const viagensFiltradas = computed(() => {
  console.log('--- INÍCIO DO FILTRO ---');
  if (!viagens.value) {
    console.log('ERRO: O array de viagens da API está nulo ou vazio.');
    return [];
  }

  if (!buscaRealizada.value || !viagens.value) return [];

  const idOrigem = Number(origemSelecionada.value);
  const idDestino = Number(destinoSelecionado.value);

  console.log(`Checando Viagem ID:`, {
    origemSelecionada,
    destinoSelecionado,
  });

  return viagens.value.filter(
    (v) =>
      Number(v.id_origin) == idOrigem && Number(v.id_destination) == idDestino
  );
});

const finalizarReserva = async () => {
  const payload = {
    viagemId: id_selecionado.value,
    data: dataSelecionada.value,
    reservas: Object.entries(passengers).map(([seat, cpf]) => ({
      poltrona: Number(seat),
      documento: cpf,
    })),
  };
  console.log('Enviando para a API:', payload);
  alert('Reserva enviada com sucesso!');
};
</script>
