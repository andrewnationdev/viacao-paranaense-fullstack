<script setup>

import QrcodeVue from 'qrcode.vue'

const data = defineProps(['ticket-data'])

</script>

<template>

  <qrcode-vue :value="ticket - data" :background="f5f5f4" :size="150" level="H" />

</template>