<script setup>
const props = defineProps({
    cities: Array,
    cities_array: Array
});
</script>

<template>
    <div class="p-12 mt-8 flex flex-col gap-4 items-center w-full bg-blue-500">
        <h2 class="text-white text-bold text-2xl">Cidades Atendidas</h2>
        <ol>
            <li class="text-white text-bold list-disc" v-for="city in cities">{{ cities_array[city.id] }}</li>
        </ol>
    </div>
</template>
