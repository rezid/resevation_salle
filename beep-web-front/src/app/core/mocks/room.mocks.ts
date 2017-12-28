import { Room } from '../models/room/room';

const roomList: Room[] = [
    {
        _id: '1',
        name: 'Le Void',
        description: 'Dansgsdg, Dans un aire plein de musie oriontal sdgsgs sdgsdg, Dans un aire plein de musie oriontal sdgsgs sdgsdg, ',
        type: 'musique',
        price: 203, // par jour
        size: 150, // en metre carré
        capacity: 200,
        room_number: 2, // nombre de chambre
        email_owner: 'zidane@gmail.com', // utilisateur id

        street_number: 14,
        street_name: 'Rue George Clemenceaux',
        city: 'Noisy-Le-Grand',
        postal_code: 75007,
        country: 'France',
    },
];

export const ROOM_LIST = roomList;
