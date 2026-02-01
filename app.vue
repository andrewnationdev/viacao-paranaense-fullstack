<template>
  <Header />
  <div class="min-h-screen bg-teal-100 p-5 font-sans">
    <DebugPanel v-if="false" />
    <Form v-if="viagens" :cidades="cidades" :viagens="viagens" />
    <RoutesList :viagens="viagens" :cidades="cidades" :cities_array="citiesMap" v-if="isInSearchMode"/>
    <NotFound v-else/>
  </div>
  <SeatsSelector/>
  <PassengersForm/>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { calculateEstimatedArrival } from './utils/calculate';

const { data: cidades } = await useFetch('/api/get_cidades');
const { data: viagens } = await useFetch('/api/get_viagens');

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
</script>