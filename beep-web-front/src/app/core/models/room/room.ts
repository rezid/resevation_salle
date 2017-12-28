export interface Room {
    _id?: string;
    name: string;
    type: string;
    price: number; // par jour
    size: number; // en metre carré
    capacity: number;
    room_number: number; // nombre de chambre
    email_owner?: string;
    description: string;

    street_number: number;
    street_name: string;
    city: string;
    postal_code: number;
    country: string;
}

