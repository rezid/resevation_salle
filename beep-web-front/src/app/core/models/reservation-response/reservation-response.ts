import { Reservation } from '../reservation/reservation';

export interface ReservationResponse {
    count: number;
    reservations?: Reservation[];
}
