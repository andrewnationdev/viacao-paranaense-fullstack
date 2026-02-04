<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  cities: Array,
  cities_array: Array
});

const self = ref(null);

onMounted(() => {
  self.value?.scrollIntoView({ behavior: 'smooth' });
});

const {
  origemSelecionada,
  isInSearchMode,
  dataSelecionada,
  id_selecionado,
  citiesData,
  routesData,
  destinoSelecionado,
  ticketPrice,
  selectedSeats,
  passengers,
} = useBusStore();

const handleSelectDestination = (origin, destination) => {
    origemSelecionada.value = origin;
    destinoSelecionado.value = destination;
    
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
        });
    }
</script>

<template>
    <div  class="p-12 flex flex-col lg:flex-row lg:flex-wrap lg:justify-around gap-4 items-center w-full bg-teal-600">
        <div class="bg-teal-100 w-[280px] max-w-[280px] p-8 flex flex-col gap-4 my-4 rounded-[20px]" v-for="destination in cities">
            <img :src="destination.img_src" width="150px"/>
            <span class="font-bold text-xl">{{cities_array[destination.id_origin]}}</span>
            <span class="font-bold text-xl">{{cities_array[destination.id_destination]}}</span>
            <span class="font-bold text-2xl text-teal-800">R$ {{destination.price.toFixed(2).replace('.', ',')}}</span>
            <button
                @click="handleSelectDestination(destination.id_origin, destination.id_destination)"
                class="w-full p-4 bg-teal-500 hover:bg-teal-600 active:scale-95 text-white font-bold rounded-lg text-lg transition-all shadow-md"
            >
                Selecionar
            </button>
        </div>
    </div>
</template>