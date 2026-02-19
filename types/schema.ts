export interface ITicket {

}

export interface ICity {
    id: number;
    code: string;
    name: string;
}

export interface IItinerario {
    itinerary: string;
    originCode: string;
    destinationCode: string;
}

export interface ISeat {
    id: number;
    label: string;
    isOccupied: boolean;
}

export interface ISeatsEndpoint {
    status: {
        code: number | string;
        message: string;
    },
    data: {
        available_seats: ISeat[];
        message: () => string | undefined;
    }
}

type TDateTime = string;

interface IDepartures {
    date: TDateTime;
    time: TDateTime;
}

type TServices = "CONVENCIONAL" | "EXECUTIVO" | "SEMI LEITO" | "LEITO CAMA"

export interface IRoutes {
    id: number;
    id_origin: number;
    id_destination: number;
    duration: TDateTime;
    price: number;
    service: TServices;
    departures: IDepartures[],
}