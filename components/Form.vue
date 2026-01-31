<template>
  <div class="flex justify-center items-center mb-10">
    <form
      @submit.prevent="handleSearch"
      class="bg-white p-8 rounded-2xl shadow-xl border-l-4 border-teal-800 w-full max-w-md"
    >
      <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">
        Encontre sua Viagem
      </h2>

      <div class="flex flex-col mb-4">
        <label class="text-sm font-semibold text-gray-600 mb-2 ml-1"
          >Origem</label
        >
        <select
          v-model="origemSelecionada"
          class="p-3 border-2 border-gray-200 rounded-lg text-gray-700 bg-white focus:border-blue-500 focus:ring-3 focus:ring-blue-100 outline-none transition-all"
          required
        >
          <option value="" disabled selected>Selecione a origem</option>
          <option
            v-for="cidade in citiesData"
            :key="cidade.id"
            :value="cidade.id"
          >
            {{ cidade.name }}
          </option>
        </select>
      </div>

      <div class="flex flex-col mb-4">
        <label class="text-sm font-semibold text-gray-600 mb-2 ml-1"
          >Destino</label
        >
        <select
          v-model="destinoSelecionado"
          :disabled="!origemSelecionada"
          class="p-3 border-2 border-gray-200 rounded-lg text-gray-700 bg-white focus:border-blue-500 focus:ring-3 focus:ring-blue-100 outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
          required
        >
          <option value="" disabled selected>
            {{
              origemSelecionada
                ? 'Selecione o destino'
                : 'Selecione a origem primeiro'
            }}
          </option>
          <option
            v-for="cidade in destinosDisponiveis"
            :key="cidade.id"
            :value="cidade.id"
          >
            {{ cidade.name }}
          </option>
        </select>
      </div>

      <div class="flex flex-col mb-6">
        <label class="text-sm font-semibold text-gray-600 mb-2 ml-1"
          >Data da Viagem</label
        >
        <input
          type="date"
          v-model="dataSelecionada"
          class="p-3 border-2 border-gray-200 rounded-lg text-gray-700 focus:border-teal-500 focus:ring-3 focus:ring-teal-100 outline-none transition-all"
          :min="today"
          required
        />
      </div>

      <button
        type="submit"
        class="w-full p-4 bg-teal-500 hover:bg-teal-600 active:scale-95 text-white font-bold rounded-lg text-lg transition-all shadow-md"
      >
        Buscar Passagens
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue';

const {
  origemSelecionada,
  buscaRealizada,
  dataSelecionada,
  id_selecionado,
  destinoSelecionado,
  citiesData,
  routesData,
} = useBusStore();

const { data } = defineProps(['cidades', 'viagens']);

const citiesMap = computed(() => {
  if (!data.cidades.value) return {};
  return data.cidades.value.reduce((acc, city) => {
    acc[city.id] = city.name;
    return acc;
  }, {});
});

const destinosDisponiveis = computed(() => {
  if (!origemSelecionada.value || !routesData.value) return [];

  const idsDestinosViaveis = routesData.value
    .filter((v) => Number(v.id_origin) === Number(origemSelecionada.value))
    .map((v) => Number(v.id_destination));

  watch(origemSelecionada, () => {
    destinoSelecionado.value = '';
    buscaRealizada.value = false;
  });

  const idsUnicos = [...new Set(idsDestinosViaveis)];

  return citiesData.value.filter((c) => idsUnicos.includes(Number(c.id)));
});

const handleSearch = () => {
  if (origemSelecionada.value && destinoSelecionado.value) {
    buscaRealizada.value = true;
    id_selecionado.value = null;
  }
};
</script>
