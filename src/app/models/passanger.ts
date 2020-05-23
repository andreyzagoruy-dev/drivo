import { LatLng } from '@models/map';

interface Passanger {
    id: number;
    tripId?: number; // "tripId" is used only when a passanger wants to subscribe to a certain trip
    waypoint: LatLng;
}

export { Passanger };
