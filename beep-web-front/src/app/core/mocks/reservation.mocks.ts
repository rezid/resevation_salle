import {Reservation} from '../models/reservation/reservation';

const reservationList: Reservation[] = [
    {
        start_date: new Date(2017, 11, 24),
        end_date: new Date(2017, 11, 25),
        id_room: '1',
    },
];

export const RESERVATION_LIST = reservationList;
