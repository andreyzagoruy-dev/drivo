import { LatLng } from "@models/map";

interface Passanger {
    passangerId: number;
    tripId?: number; // "tripId" is needed only when a passanger wants to subscribe to a certain trip. We don't include "tripId" in server response when driver gets passangers array. 
    waypoint: LatLng;
}

export { Passanger };