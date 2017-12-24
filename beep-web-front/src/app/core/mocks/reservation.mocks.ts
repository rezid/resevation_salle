import {Reservation} from '../models/reservation/reservation';

const reservationList: Reservation[] = [
    {
        startDate: new Date(2017, 11, 24),
        endDate: new Date(2017, 11, 25),
        idRoomer: 'dvdsgvsd',
        idRoom: 'sdfsdf',
        reservationDate: new Date(),
    },
    {
        startDate: new Date(2017, 11, 26),
        endDate: new Date(2017, 11, 27),
        idRoomer: 'dvdsgvsd',
        idRoom: 'sdfsdf',
        reservationDate: new Date(),
    },
    {
        startDate: new Date(2017, 11, 28),
        endDate: new Date(2017, 11, 29),
        idRoomer: 'dvdsgvsd',
        idRoom: 'sdfsdf',
        reservationDate: new Date(),
    },
];

export const RESERVATION_LIST = reservationList;
