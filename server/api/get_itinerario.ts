export default defineEventHandler(async (event) => {
    const { id_origin, id_destination } = getQuery(event);
    const cities = await $fetch('/api/get_cidades');
  
    const origin = cities.find(c => c.id === Number(id_origin));
    const destination = cities.find(c => c.id === Number(id_destination));
  
    if (!origin || !destination) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Origem ou destino inválidos',
      });
    }
  
    const formatName = (name: string) => name.split(' - ')[0].toUpperCase();
  
    return {
      itinerary: `${formatName(origin.name)} X ${formatName(destination.name)}`,
      originCode: origin.code,
      destinationCode: destination.code
    };
  });