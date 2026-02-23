<template>
  <div v-for="ticket in purchasedTickets" :key="ticket.id_ticket"
    class="bg-white rounded-2xl shadow-xl p-6 border-l-8 border-blue-800 my-6 w-full max-w-md hover:shadow-2xl transition-shadow duration-300">
    
    <div class="flex justify-between items-start mb-4">
      <div>
        <h2 class="text-xl font-extrabold text-gray-900 uppercase tracking-tight">Minhas Compras</h2>
        <span class="text-[10px] text-blue-600 font-mono font-bold">BILHETE: #{{ ticket.id_ticket }}</span>
      </div>
      <div class="text-right">
        <span class="block text-[10px] text-gray-400 uppercase">Classe</span>
        <span class="font-bold text-sm text-blue-800">{{ ticket.bus_type || "CONVENCIONAL" }}</span>
      </div>
    </div>

    <div class="flex items-center justify-between mb-6 bg-slate-50 p-4 rounded-xl">
      <div class="flex flex-col">
        <span class="text-xl font-black text-gray-900">{{ ticket.departure_time }}</span>
        <span class="text-[10px] text-gray-500 uppercase font-medium">Origem ID: {{ ticket.id_origin }}</span>
      </div>

      <div class="flex-grow flex flex-col items-center px-4">
        <div class="h-[1px] bg-dashed bg-gray-300 w-full border-t border-dashed"></div>
        <span class="text-lg mt-[-12px]">🚌</span>
      </div>

      <div class="flex flex-col text-right">
        <span class="text-xl font-black text-gray-900">--:--</span> <span class="text-[10px] text-gray-500 uppercase font-medium">Destino ID: {{ ticket.id_destination }}</span>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4 mb-6 border-y border-gray-100 py-4">
      <div>
        <span class="text-[10px] text-gray-400 uppercase block">Passageiro (CPF)</span>
        <span class="text-sm font-semibold text-gray-800">{{ ticket.cpf }}</span>
      </div>
      <div class="text-right">
        <span class="text-[10px] text-gray-400 uppercase block">Poltrona</span>
        <span class="text-lg font-bold text-blue-800">{{ ticket.seat_number }}</span>
      </div>
    </div>

    <div class="flex flex-col items-center justify-center bg-white p-4 border-2 border-dashed border-gray-200 rounded-xl mb-4">
      <div class="bg-gray-100 w-32 h-32 flex items-center justify-center mb-2 rounded-lg">
        <div class="text-[8px] text-center p-2 break-all font-mono text-gray-500">
          [QR CODE]<br>{{ ticket.sha_code }}
        </div>
      </div>
      <span class="text-[9px] font-mono text-gray-400 uppercase">Validar Embarque</span>
    </div>

    <div class="flex justify-between items-center pt-2">
      <div class="flex flex-col">
        <span class="text-[10px] text-gray-400 uppercase">Valor Pago</span>
        <span class="text-lg font-bold text-green-600">
          R$ {{ ticket.price.toFixed(2).replace('.', ',') }}
        </span>
      </div>
      <button 
        @click="cancelarPassagem(ticket)"
        class="text-xs font-bold text-red-500 hover:text-red-700 underline decoration-dotted transition-colors">
        Solicitar cancelamento
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const purchasedTickets = ref([]);

onMounted(() => {
  const stored = localStorage.getItem('purchases');
  if (stored) {
    const parsed = JSON.parse(stored);
    purchasedTickets.value = parsed.data || [];
  }
});

const cancelarPassagem = (ticket) => {
  const emailEmpresa = "suporte@suaempresa.com.br";
  const assunto = `Solicitação de Cancelamento - Bilhete #${ticket.id_ticket}`;
  
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