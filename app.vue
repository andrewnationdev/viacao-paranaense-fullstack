<template>
  <Header />
  <div class="min-h-screen bg-teal-100 p-5 font-sans">
    <DebugPanel v-if="false" />
    <Form v-if="viagens" :cidades="cidades" :viagens="viagens" />
    <RoutesList :viagens="viagens" :cidades="cidades" :cities_array="citiesMap" v-if="isInSearchMode"/>
    <NotFound v-else/>
  </div>
  <SectionMainDestinations v-if="mainDestinations && citiesMap" :cities="mainDestinations" :cities_array='citiesMap'/>
  <SectionAbout/>
  <SeatsSelector/>
  <PassengersForm/>
  <Footer/>
</template>

<script setup>
const { data: cidades } = await useFetch('/api/get_cidades');
const { data: viagens } = await useFetch('/api/get_viagens');
const { data: mainDestinations } = await useFetch('/api/get_main_destinations');

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