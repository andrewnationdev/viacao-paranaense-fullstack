export interface ITicket {
    id_service: number;
    id_ticket: number;
    id_origin: number;
    id_destination: number;
    departure_time: TDateTime;
    type: string;
    bus_type: TServices;
    seat_number: number;
    departure_date: TDateTime;
    cpf: string;
    price: number;
    boarding_fee: number;
    toll: number;
    sha_code: string;
}

export interface ITicketEndpoint {
    status: IStatus;
    data: ITicket[];
}

export interface ICity {
    id: number;
    code: string;
    name: string;
}

interface IStatus {
    code: number | string;
    message: string;
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
    status: IStatus;
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