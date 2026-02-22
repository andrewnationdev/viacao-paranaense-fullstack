<template>
  <div ref="self" class="space-y-6 max-w-xl mx-auto">
    <div v-if="viagensFiltradas.length > 0">
      <RoutesCards v-for="viagem in viagensFiltradas" :key="viagem.id" :cities_array="cities_array" :viagem="viagem" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const self = ref(null);

onMounted(() => {
  self.value?.scrollIntoView({ behavior: 'smooth' });
});

const { data } = defineProps(['cidades', 'viagens', 'cities_array']);

const handleSelectDestination = (origin, destination) => {
  origemSelecionada.value = origin;
  destinoSelecionado.value = destination;

  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
}

const {
  origemSelecionada,
  isInSearchMode,
  routesData,
  destinoSelecionado,
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
  ).sort((a, b) => a.departures[0].time.localeCompare(b.departures[0].time));
});
</script>