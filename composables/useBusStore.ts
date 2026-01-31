import { today } from '../utils/calculate';

export const useBusStore = () => {
  const origemSelecionada = useState('origem', () => '');
  const destinoSelecionado = useState('destino', () => '');
  const id_selecionado = useState('id_selecionado', () => null);
  const buscaRealizada = useState('buscaRealizada', () => false);
  const dataSelecionada = useState('dataSelecionada', () => today);
  const citiesData = useState('cidades', () => []);
  const routesData = useState('viagens', () => []);
  const ticketPrice = useState('ticketPrice', () => 0);

  return {
    origemSelecionada,
    destinoSelecionado,
    id_selecionado,
    buscaRealizada,
    dataSelecionada,
    citiesData,
    routesData,
    ticketPrice,
  };
};
