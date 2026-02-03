<script setup>
const props = defineProps({
  cities: Array,
  cities_array: Array
});
</script>

<template>
    <div class="p-12 flex flex-col gap-4 items-center w-full bg-teal-600">
        <div class="bg-teal-100 p-8 flex flex-col gap-4 my-4 rounded-[20px]" v-for="destination in cities">
            <img :src="destination.img_src" width="150px"/>
            <span>{{cities_array[destination.id_origin]}}</span>
            <span>{{cities_array[destination.id_destination]}}</span>
            <span>{{cities_array[destination.price]}}</span>
        </div>
    </div>
</template>

