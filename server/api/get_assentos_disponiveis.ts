export default defineEventHandler(async (event) => {
    const query = await getQuery(event)
    const { id_origin, id_destination, date, departure } = query

    function handleFetchAvailableSeats() {
        let number_of_occupied = Math.floor(Math.random() * 42) + 1;
        
        const occupied_seats_set = new Set();
        
        while (occupied_seats_set.size < number_of_occupied) {
            let seat_number = Math.floor(Math.random() * 42) + 1;
            occupied_seats_set.add(seat_number);
        }
    
        const seats = [];
        for (let i = 1; i <= 42; i++) {
            seats.push({
                id: i,
                label: `Assento ${i}`,
                isOccupied: occupied_seats_set.has(i)
            });
        }
    
        return seats;
    }

    if (!id_origin || !id_destination || !date ) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Parâmetros inválidos.',
        })
    }

    const seats = handleFetchAvailableSeats();

    return {
        status: {
            code: 200,
            message: ""
        },
        data: {
            available_seats: seats,
            message: () => {
                const hasAvailable = seats.some(seat => !seat.isOccupied);
                
                if (!hasAvailable) {
                    return "Não há assentos disponíveis nesta data";
                }
                return undefined;
            }
        }
    }
})