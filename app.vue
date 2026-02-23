<template>
  <Header />
  <div class="min-h-screen bg-gray-100 p-5 font-sans">
    <DebugPanel v-if="false" />
    <SectionBoughtTickets v-if="showBoughtTickets" :cities_array="citiesMap"/>
    <Form v-if="viagens" :cidades="cidades" :viagens="viagens" />
    <RoutesList :viagens="viagens" :cidades="cidades" :cities_array="citiesMap" v-if="isInSearchMode"/>
    <NotFound v-else/>
    <SeatsSelector/>
  <PassengersForm/>
  <PrintTickets v-if="tickets.length > 0" :cities_array="citiesMap" />
  <SectionMainDestinations v-if="mainDestinations && citiesMap" :cities="cidades" :cities_array='citiesMap'/>
  <SectionAbout/>
  </div>
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
  tickets,
  citiesData,
  routesData,
  destinoSelecionado,
  ticketPrice,
  selectedSeats,
  passengers,
  showBoughtTickets
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