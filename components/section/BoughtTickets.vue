<template>
  <div class="flex flex-col items-center w-full max-w-2xl mx-auto p-4">
    
    <div v-if="purchasedTickets.length === 0" class="text-gray-400 italic py-10">
      Nenhuma compra encontrada.
    </div>

    <div 
      v-for="ticket in purchasedTickets" 
      :key="ticket.id_ticket"
      class="bg-white rounded-2xl shadow-xl p-6 border-l-8 border-blue-800 mb-8 w-full hover:shadow-2xl transition-all duration-300"
    >
      <div class="flex justify-between items-start mb-4">
        <div>
          <h2 class="text-xl font-extrabold text-gray-900 uppercase tracking-tight">CPF: {{ticket.cpf}}</h2>
          <span class="text-[10px] text-blue-600 font-mono font-bold">BILHETE: #{{ ticket.id_ticket }}</span>
        </div>
        <div class="text-right">
          <span class="block text-[10px] text-gray-400 uppercase">Classe | Poltrona</span>
          <span class="font-bold text-sm text-blue-800">{{ ticket.bus_type || "CONVENCIONAL" }} | {{ ticket.seat_number }}</span>
        </div>
      </div>

      <div class="flex items-center justify-between mb-6 bg-slate-50 p-4 rounded-xl">
        <div class="flex flex-col">
          <span class="text-xl font-black text-gray-900">{{ ticket.departure_time }}</span>
          <span class="text-[10px] text-gray-500 uppercase font-medium">
            {{ cities_array[ticket.id_origin] || 'Origem ' + ticket.id_origin }}
          </span>
        </div>

        <div class="flex flex-col text-right">
          <span class="text-xl font-black text-gray-900">
          --:--
          </span>
          <span class="text-[10px] text-gray-500 uppercase font-medium">
            {{ cities_array[ticket.id_destination] || 'Destino ' + ticket.id_destination }}
          </span>
        </div>
      </div>

      <div class="flex flex-col items-center justify-center bg-white p-4 border-2 border-dashed border-gray-200 rounded-xl mb-4">
        <QRCode :ticket-data="ticket"/>
        <span class="text-[9px] mt-4 font-mono text-gray-400 uppercase tracking-widest">Validar no Embarque</span>
      </div>

      <div class="flex justify-between items-center pt-2">
        <div class="flex flex-col">
          <span class="text-[10px] text-gray-400 uppercase">Valor Pago</span>
          <span class="text-lg font-bold text-green-600">
            R$ {{ typeof ticket.price === 'number' ? ticket.price.toFixed(2).replace('.', ',') : ticket.price }}
          </span>
        </div>
        <button 
          @click="cancelarPassagem(ticket)"
          class="flex items-center gap-1 text-xs font-bold text-red-500 hover:text-red-700 underline decoration-dotted transition-colors"
        >
          <span>✉️</span> Solicitar Cancelamento ou Alteração
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const {data} = defineProps(['cities_array'])

const purchasedTickets = ref([]);

onMounted(() => {
  const stored = localStorage.getItem('purchases');
  if (stored) {
    const parsed = JSON.parse(stored);
    purchasedTickets.value = Array.isArray(parsed) ? parsed : (parsed.data || []);
    console.log(parsed)
  }
});

const cancelarPassagem = (ticket) => {
  const emailEmpresa = "suporte@suaempresa.com.br";
  const assunto = `Solicitação de Cancelamento/Alteração - Bilhete #${ticket.id_ticket}`;
  
  const corpo = `
    Olá, gostaria de solicitar o cancelamento/alteração do meu bilhete.
    
    Dados do Bilhete:
    - ID: ${ticket.id_ticket}
    - CPF: ${ticket.cpf}
    - Poltrona: ${ticket.seat_number}
    - Código de Validação (SHA): ${ticket.sha_code}
    
    Aguardo retorno.
  `.trim();

  const mailtoUrl = `mailto:${emailEmpresa}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;

  if (confirm(`Deseja abrir seu e-mail para solicitar o cancelamento do bilhete #${ticket.id_ticket}?`)) {
    window.location.href = mailtoUrl;
  }
};
</script>