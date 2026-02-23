<template>
  <div class="w-full max-w-2xl mx-auto my-8 px-2 sm:px-4">
    
    <div class="flex items-center gap-3 mb-6 px-4">
      <div class="h-8 w-2 bg-blue-800 rounded-full shrink-0"></div>
      <h1 class="text-xl sm:text-2xl font-black text-gray-800 uppercase tracking-tighter">
        Meus Bilhetes
      </h1>
      <span class="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
        {{ purchasedTickets.length }}
      </span>
    </div>

    <div class="flex flex-col items-center w-full p-2 sm:p-4 bg-gray-50/50 rounded-3xl border border-gray-100">
      
      <div v-if="purchasedTickets.length === 0" class="flex flex-col items-center py-16 text-gray-400 text-center">
        <span class="text-4xl mb-2">🎫</span>
        <p class="italic font-medium px-4">Nenhuma compra encontrada no seu histórico.</p>
      </div>

      <div 
        v-for="ticket in purchasedTickets" 
        :key="ticket.id_ticket"
        class="bg-white rounded-2xl shadow-xl p-4 sm:p-6 border-l-8 border-blue-800 mb-6 w-full hover:shadow-2xl transition-all duration-300"
      >
        <div class="flex flex-wrap justify-between items-start gap-y-3 mb-4">
          <div class="min-w-[140px]">
            <h2 class="text-lg sm:text-xl font-extrabold text-gray-900 uppercase tracking-tight break-all">
              CPF: {{ticket.cpf}}
            </h2>
            <span class="text-[10px] text-blue-600 font-bold">BILHETE: #{{ ticket.id_ticket }}</span>
          </div>
          <div class="text-left sm:text-right ml-auto">
            <span class="block text-[10px] text-gray-400 uppercase">Classe | Poltrona</span>
            <span class="font-bold text-sm text-blue-800">
              {{ ticket.bus_type || "CONVENCIONAL" }} | {{ ticket.seat_number }}
            </span>
          </div>
        </div>

        <div class="flex items-center justify-between gap-2 mb-6 bg-slate-50 p-3 sm:p-4 rounded-xl">
          <div class="flex flex-col min-w-0 flex-1">
            <span class="text-lg sm:text-xl font-black text-gray-900">{{ ticket.departure_time }}</span>
            <span class="text-[10px] text-gray-500 uppercase font-medium truncate" :title="cities_array[ticket.id_origin]">
              {{ cities_array[ticket.id_origin] || 'Origem ' + ticket.id_origin }}
            </span>
          </div>

          <div class="text-lg px-2 shrink-0">🚌</div>

          <div class="flex flex-col text-right min-w-0 flex-1">
            <span class="text-lg sm:text-xl font-black text-gray-900">--:--</span>
            <span class="text-[10px] text-gray-500 uppercase font-medium truncate" :title="cities_array[ticket.id_destination]">
              {{ cities_array[ticket.id_destination] || 'Destino ' + ticket.id_destination }}
            </span>
          </div>
        </div>

        <div class="flex flex-col items-center justify-center bg-white p-4 border-2 border-dashed border-gray-200 rounded-xl mb-4">
          <div class="w-full flex justify-center overflow-hidden">
             <QRCode :ticket-data="ticket" />
          </div>
          <span class="text-[9px] mt-4 text-gray-400 uppercase tracking-widest text-center">Validar no Embarque</span>
        </div>

        <div class="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div class="flex flex-col">
            <span class="text-[10px] text-gray-400 uppercase">Valor Pago</span>
            <span class="text-lg font-bold text-green-600 leading-tight">
              R$ {{ typeof ticket.price === 'number' ? ticket.price.toFixed(2).replace('.', ',') : ticket.price }}
            </span>
          </div>
          <button 
            @click="cancelarPassagem(ticket)"
            class="w-full py-4 bg-orange-300 hover:bg-orange-400 text-black font-black rounded-xl shadow-lg shadow-green-100 transition-all active:scale-95">
            <span>✉️</span> Solicitar Cancelamento ou Alteração
          </button>
        </div>
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
    try {
      const parsed = JSON.parse(stored);
      const allTickets = Array.isArray(parsed) ? parsed : (parsed.data || []);
      const today = new Date().toISOString().split('T')[0];

      purchasedTickets.value = allTickets.filter(ticket => {
        return ticket.departure_date >= today;
      });

      console.log("Bilhetes atuais/futuros:", purchasedTickets.value);
    } catch (e) {
      console.error("Erro ao processar bilhetes:", e);
    }
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