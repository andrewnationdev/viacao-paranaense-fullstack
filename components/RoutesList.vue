<template>
  <div class="space-y-6 max-w-xl mx-auto">
    <div v-if="viagensFiltradas.length > 0">
      <RoutesCards v-for="viagem in viagensFiltradas" :key="viagem.id" :cities_array="cities_array" :viagem="viagem" />
    </div>
  </div>
</template>

<script setup>
const { data } = defineProps(['cidades', 'viagens', 'cities_array']);

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

const viagensFiltradas = computed(() => {
  if (!routesData.value) {
    console.log('ERRO: O array de viagens da API está nulo ou vazio.');
    return [];
  }

  if (!isInSearchMode.value || !routesData.value) return [];

  const idOrigem = Number(origemSelecionada.value);
  const idDestino = Number(destinoSelecionado.value);

  console.log(`Checando Viagem ID:`, {
    origemSelecionada,
    destinoSelecionado,
  });

  return routesData.value.filter(
    (v) =>
      Number(v.id_origin) == idOrigem && Number(v.id_destination) == idDestino
  );
});
</script>