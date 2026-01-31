export default defineEventHandler((event) => {
  const cities = [
    {
      id: 1,
      code: 'PG',
      name: 'Ponta Grossa - PR',
    },
    {
      id: 2,
      code: 'CWB',
      name: 'Curitiba - PR',
    },
    {
      id: 3,
      code: 'TB',
      name: 'Telêmaco Borba - PR',
    },
    {
      id: 4,
      code: 'SP-T',
      name: 'São Paulo (Tietê) - SP',
    },
    {
      id: 5,
      code: 'SP-BF',
      name: 'São Paulo (Barra Funda) - SP',
    },
    {
      id: 6,
      code: 'RJ',
      name: 'Rio de Janeiro - RJ',
    },
    {
      id: 7,
      code: 'CAMP',
      name: 'Campinas - SP',
    },
    {
      id: 8,
      code: 'MAR',
      name: 'Maringá - PR',
    },
  ];

  const sorted_cities = cities.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  return sorted_cities;
});
