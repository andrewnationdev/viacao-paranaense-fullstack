<script setup>

import QrcodeVue from 'qrcode.vue'

const data = defineProps(['ticket-data'])

</script>

<template>

  <qrcode-vue :value="ticket-data" :size="200" level="H" />

</template>