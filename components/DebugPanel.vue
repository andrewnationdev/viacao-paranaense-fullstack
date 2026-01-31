<template>
  <div class="bg-black text-green-400 p-2 text-xs font-mono mb-4 rounded">
    Origem: {{ origemSelecionada }} (Tipo: {{ typeof origemSelecionada }}) |
    Destino: {{ destinoSelecionado }} | Busca Ativa: {{ buscaRealizada }} |
    Viagens no Banco: {{ routesData?.length }}
  </div>
</template>

<script setup>
const { data } = defineProps(['filtrados']);

const {
  origemSelecionada,
  buscaRealizada,
  dataSelecionada,
  id_selecionado,
  citiesData,
  routesData,
  destinoSelecionado,
} = useBusStore();
</script>
