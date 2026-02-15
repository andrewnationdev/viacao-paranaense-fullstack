export default defineEventHandler((event) => {
  return [
    // --- SAÍDAS DE PONTA GROSSA (ID 1) ---
    {
      id: 1,
      id_origin: 1,
      id_destination: 2,
      duration: '1h50min',
      price: 48.5,
      departures: [{ date: '', time: '06:00' }],
    }, // PG -> Curitiba
    {
      id: 2,
      id_origin: 1,
      id_destination: 2,
      duration: '2h05min',
      price: 52.0,
      departures: [{ date: '', time: '14:30' }],
    }, // PG -> Curitiba
    {
      id: 3,
      id_origin: 1,
      id_destination: 7,
      duration: '7h30min',
      price: 180.0,
      departures: [{ date: '', time: '22:00' }],
    }, // PG -> Campinas
    {
      id: 4,
      id_origin: 1,
      id_destination: 3,
      duration: '2h40min',
      price: 65.0,
      departures: [{ date: '', time: '08:15' }],
    }, // PG -> Telêmaco Borba
    {
      id: 5,
      id_origin: 1,
      id_destination: 8,
      duration: '4h30min',
      price: 110.0,
      departures: [{ date: '', time: '13:00' }],
    }, // PG -> Maringá

    // --- SAÍDAS DE CURITIBA (ID 2) ---
    {
      id: 6,
      id_origin: 2,
      id_destination: 1,
      duration: '1h55min',
      price: 48.5,
      departures: [{ date: '', time: '10:00' }],
    }, // Curitiba -> PG
    {
      id: 7,
      id_origin: 2,
      id_destination: 4,
      duration: '6h15min',
      price: 120.0,
      departures: [{ date: '', time: '23:59' }],
    }, // Curitiba -> SP (Tietê)
    {
      id: 8,
      id_origin: 2,
      id_destination: 6,
      duration: '12h30min',
      price: 280.0,
      departures: [{ date: '', time: '19:30' }],
    }, // Curitiba -> Rio
    {
      id: 9,
      id_origin: 2,
      id_destination: 8,
      duration: '6h45min',
      price: 145.0,
      departures: [{ date: '', time: '11:15' }],
    }, // Curitiba -> Maringá

    // --- SAÍDAS DE SÃO PAULO (ID 4 e 5) ---
    {
      id: 10,
      id_origin: 4,
      id_destination: 2,
      duration: '6h00min',
      price: 125.0,
      departures: [{ date: '', time: '07:30' }],
    }, // SP (Tietê) -> Curitiba
    {
      id: 11,
      id_origin: 4,
      id_destination: 7,
      duration: '1h30min',
      price: 45.0,
      departures: [{ date: '', time: '09:00' }],
    }, // SP (Tietê) -> Campinas
    {
      id: 12,
      id_origin: 5,
      id_destination: 1,
      duration: '8h15min',
      price: 195.0,
      departures: [{ date: '', time: '21:45' }],
    }, // SP (B. Funda) -> PG

    // --- SAÍDAS DE MARINGÁ (ID 8) ---
    {
      id: 13,
      id_origin: 8,
      id_destination: 1,
      duration: '4h20min',
      price: 105.0,
      departures: [{ date: '', time: '05:00' }],
    }, // Maringá -> PG
    {
      id: 14,
      id_origin: 8,
      id_destination: 2,
      duration: '6h50min',
      price: 140.0,
      departures: [{ date: '', time: '22:30' }],
    }, // Maringá -> Curitiba
    {
      id: 15,
      id_origin: 8,
      id_destination: 3,
      duration: '5h10min',
      price: 125.0,
      departures: [{ date: '', time: '16:00' }],
    }, // Maringá -> Telêmaco Borba

    // --- SAÍDAS DE CAMPINAS (ID 7) ---
    {
      id: 16,
      id_origin: 7,
      id_destination: 2,
      duration: '8h45min',
      price: 210.0,
      departures: [{ date: '', time: '20:00' }],
    }, // Campinas -> Curitiba
    {
      id: 17,
      id_origin: 7,
      id_destination: 4,
      duration: '1h40min',
      price: 42.0,
      departures: [{ date: '', time: '06:45' }],
    }, // Campinas -> SP (Tietê)

    // --- SAÍDAS DE TELÊMACO BORBA (ID 3) ---
    {
      id: 18,
      id_origin: 3,
      id_destination: 1,
      duration: '2h35min',
      price: 62.0,
      departures: [{ date: '', time: '17:30' }],
    }, // Telêmaco -> PG
    {
      id: 19,
      id_origin: 3,
      id_destination: 8,
      duration: '5h00min',
      price: 130.0,
      departures: [{ date: '', time: '09:15' }],
    }, // Telêmaco -> Maringá

    // --- ROTA LONGA EXTRA ---
    {
      id: 20,
      id_origin: 6,
      id_destination: 2,
      duration: '13h00min',
      price: 310.0,
      departures: [{ date: '', time: '18:00' }],
    }, // Rio -> Curitiba

    {
      id: 21,
      id_origin: 1,
      id_destination: 2,
      duration: '2h30min',
      price: 48.5,
      departures: [{ date: '', time: '07:30' }],
    }, // PG -> Curitiba,
    {
      id: 22,
      id_origin: 1,
      id_destination: 2,
      duration: '2h00min',
      price: 48.5,
      departures: [{ date: '', time: '09:00' }],
    }, // PG -> Curitiba,
    {
      id: 23,
      id_origin: 1,
      id_destination: 2,
      duration: '2h00min',
      price: 48.5,
      departures: [{ date: '', time: '10:00' }],
    }, // PG -> Curitiba,
    {
      id: 24,
      id_origin: 1,
      id_destination: 2,
      duration: '2h00min',
      price: 48.5,
      departures: [{ date: '', time: '11:00' }],
    }, // PG -> Curitiba

    {
      id: 25,
      id_origin: 1,
      id_destination: 2,
      duration: '2h20min',
      price: 48.5,
      departures: [{ date: '', time: '12:00' }],
    }, // PG -> Curitiba,
    {
      id: 26,
      id_origin: 1,
      id_destination: 2,
      duration: '2h20min',
      price: 48.5,
      departures: [{ date: '', time: '13:30' }],
    }, // PG -> Curitiba,
    {
      id: 27,
      id_origin: 1,
      id_destination: 2,
      duration: '2h20min',
      price: 48.5,
      departures: [{ date: '', time: '14:00' }],
    }, // PG -> Curitiba,
    {
      id: 28,
      id_origin: 1,
      id_destination: 2,
      duration: '2h00min',
      price: 48.5,
      departures: [{ date: '', time: '15:35' }],
    }, // PG -> Curitiba

    {
      id: 29,
      id_origin: 1,
      id_destination: 2,
      duration: '2h30min',
      price: 48.5,
      departures: [{ date: '', time: '18:00' }],
    }, // PG -> Curitiba,
    {
      id: 30,
      id_origin: 1,
      id_destination: 2,
      duration: '2h20min',
      price: 48.5,
      departures: [{ date: '', time: '19:20' }],
    }, // PG -> Curitiba,
    {
      id: 31,
      id_origin: 1,
      id_destination: 2,
      duration: '2h20min',
      price: 48.5,
      departures: [{ date: '', time: '21:30' }],
    }, // PG -> Curitiba,
    {
      id: 32,
      id_origin: 1,
      id_destination: 2,
      duration: '1h50min',
      price: 48.5,
      departures: [{ date: '', time: '23:59' }],
    }, // PG -> Curitiba
  ];
});
