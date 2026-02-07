import { today } from '../utils/calculate';
import {reactive} from 'vue'

const passengers = reactive({});

export const useBusStore = () => {
  const origemSelecionada = useState('origem', () => '');
  const destinoSelecionado = useState('destino', () => '');
  const id_selecionado = useState('id_selecionado', () => null);
  const isInSearchMode = useState('buscaRealizada', () => false);
  const dataSelecionada = useState('dataSelecionada', () => today);
  const citiesData = useState('cidades', () => []);
  const routesData = useState('viagens', () => []);
  const ticketPrice = useState('ticketPrice', () => 0);
  const selectedSeats = useState('selectedSeats', () => [])
  const seatsConfirmed = useState('seats_confirm', () => false);
  const tickets = useState('tickets', ()=> [])
  
  return {
    origemSelecionada,
    destinoSelecionado,
    id_selecionado,
    isInSearchMode,
    dataSelecionada,
    citiesData,
    tickets,
    routesData,
    ticketPrice,
    selectedSeats,
    seatsConfirmed,
    passengers
  };
};
