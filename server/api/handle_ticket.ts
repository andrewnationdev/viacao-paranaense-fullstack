export default defineEventHandler((event) => {
    return {
        status: {
            code: 200,
            message: ""
        },
        data: [
            {
                id_service: 0,
                id_ticket: 0,
                id_origin: 1,
                id_destination: 2,
                departure_time: '',
                type: 'Horário Ordinário',
                bus_type: 'Convencional',
                seat_number: 28,
                departure_date: '06/01/2026',
                cpf: '',
                sha_code: ''
            }
        ]
    }
})