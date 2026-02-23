<template>
  <header class="px-8 py-4 top-0 z-50 opacity-[90%] m-auto w-full sticky flex justify-between bg-blue-800">
    <h1 class="font-bold text-xl text-teal-200">VIAÇÃO PARANAENSE</h1>
    <a aria-role="button" title="Meus Bilhetes" href="" @click.prevent="showPreviousTickets()"
      class="text-slate-400 hover:cursor-pointer hover:text-white">
      <ShoppingCart />
    </a>
  </header>
</template>

<script setup>
import { ShoppingCart } from 'lucide-vue-next';

const {
  showBoughtTickets
} = useBusStore();

function showPreviousTickets() {
  if (showBoughtTickets.value == false) {
    showBoughtTickets.value = true;
    return;
  } else {
    showBoughtTickets.value = false;
    return;
  }
}
</script>