export function calculateEstimatedArrival(duration, departure) {
  if (!duration || !departure) return '00:00';

  const [hSaida, mSaida] = departure.split(':').map(Number);

  const hDuracao = parseInt(duration.match(/(\d+)h/)?.[1] || 0);
  const mDuracao = parseInt(duration.match(/(\d+)min/)?.[1] || 0);

  const totalMinutosPartida = hSaida * 60 + mSaida;
  const totalMinutosDuracao = hDuracao * 60 + mDuracao;
  const totalMinutosChegada = totalMinutosPartida + totalMinutosDuracao;

  const minutosNoDia = 24 * 60;
  const diasExtras = Math.floor(totalMinutosChegada / minutosNoDia);
  const restoMinutos = totalMinutosChegada % minutosNoDia;

  const hFinal = Math.floor(restoMinutos / 60);
  const mFinal = restoMinutos % 60;

  const horarioFormatado = `${String(hFinal).padStart(2, '0')}:${String(
    mFinal
  ).padStart(2, '0')}`;

  return diasExtras > 0
    ? `${horarioFormatado} (+${diasExtras})`
    : horarioFormatado;
}

export const today = new Date().toISOString().split('T')[0];
