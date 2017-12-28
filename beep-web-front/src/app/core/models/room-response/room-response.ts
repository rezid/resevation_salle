import { Room } from '../room/room';

export interface RoomResponse {
    count: number;
    rooms?: Room[];
}
