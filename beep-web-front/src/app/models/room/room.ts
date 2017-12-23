import { Address } from '../address/address';

export interface Room {
    _id: string;
    nameName: string;
    description: string;
    address: Address;
    type: string;
    price: number; // par jour
    size: number; // en metre carré
    capacity: number;
    roomCount: number; // nombre de chambre
    creationDate: Date;
    uid: string; // utilisateur id
}

