import { createHash } from 'crypto'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { id_origin, id_destination, date, passengers } = body

    if (!id_origin || !id_destination || !date || !passengers || !Array.isArray(passengers)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Parâmetros inválidos.',
        })
    }

    const generateShaCode = (dataString) => {
        return createHash('sha256').update(dataString + Date.now()).digest('hex')
    }

    const data = passengers.map((p) => {
        const seed = `${id_origin}-${id_destination}-${p.cpf}-${p.seat_number}-${date}`
        
        return {
            id_service: Math.floor(Math.random() * 10000),
            id_ticket: Math.floor(Math.random() * 999999),
            id_origin,
            id_destination,
            departure_time: body.departure_time || '23:59',
            type: 'Horário Ordinário',
            bus_type: 'Convencional',
            seat_number: p.seat_number,
            departure_date: date,
            cpf: p.cpf,
            sha_code: generateShaCode(seed)
        }
    })

    return {
        status: {
            code: 200,
            message: "Sucesso"
        },
        data
    }
})