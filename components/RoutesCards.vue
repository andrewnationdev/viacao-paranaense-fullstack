<template>
        <div
            v-if="id_selecionado ? id_selecionado == viagem.id : true"
            class="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:translate-y-[-4px] my-6 hover:border-blue-400 transition-all duration-200"
          >
          <span class="font-bold mb-4 text-sm text-blue-500">{{viagem.service || "CONVENCIONAL"}}</span>
            <div class="flex items-center justify-between mb-6">
              <div class="flex flex-col">
                <span class="text-2xl font-extrabold text-gray-900 leading-none">
                  {{ viagem.departures[0]?.time || '06:00' }}
                </span>
                <span
                  class="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider font-medium mt-1"
                >
                  {{ cities_array[viagem.id_origin] || 'Carregando...' }}
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
                  {{ cities_array[viagem.id_destination] || 'Carregando...' }}
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
                v-if="!id_selecionado"
                class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold shadow-sm transition-colors"
                @click="selectTrip(viagem.id, viagem.price, viagem.departures[0]?.time, viagem.service)"
              >
                Selecionar
              </button>
            </div>
          </div>
</template>

<script setup>
const { data } = defineProps(['cities_array', 'viagem']);

const {
    origemSelecionada,
    isInSearchMode,
    dataSelecionada,
    id_selecionado,
    citiesData,
    partida,
    routesData,
    destinoSelecionado,
    ticketPrice,
    selectedSeats,
    serviceType,
    passengers,
    unitPrice
  } = useBusStore();

    const selectTrip = (id, price, departure, service) => {
    id_selecionado.value = id;
    ticketPrice.value = parseFloat(price);
    unitPrice.value = parseFloat(price);
    partida.value = departure;
    serviceType.value = service;
  };
</script>