import { createHash } from 'crypto'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { id_origin, price, service, id_destination, date, passengers } = body

    const BOARDING_FEE_REDUCTION = 8;
    const TOLL_RATE = 0.035;

    if (!id_origin || !price || !service || !id_destination || !date || !passengers || !Array.isArray(passengers)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Parâmetros inválidos.',
        })
    }

    const generateShaCode = (dataString: string) => {
        return createHash('sha256').update(dataString + Date.now()).digest('hex')
    }

    const calculateBoardingFee = (price: number): number => {
        return price > BOARDING_FEE_REDUCTION ? BOARDING_FEE_REDUCTION : 0;
    };

    const calculateToll = (price: number): number => {
        return price * TOLL_RATE;
    };

    const data = passengers.map((p) => {
        const seed = `${id_origin}-${id_destination}-${p.cpf}-${p.seat_number}-${date}`
        
        return {
            id_service: Math.floor(Math.random() * 10000),
            id_ticket: Math.floor(Math.random() * 999999),
            id_origin,
            id_destination,
            departure_time: body.departure_time || '23:59',
            type: 'Horário Ordinário',
            bus_type: body.service,
            seat_number: p.seat_number,
            departure_date: date,
            cpf: p.cpf,
            price: price,
            boarding_fee: calculateBoardingFee(price),
            toll: calculateToll(price),
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