import { Car } from '@models/car';
import { LatLng } from '@models/map';
import { Passanger } from '@models/passanger';

interface Trip {
    id?: number;
    driverId: number;
    departureTime: Date;
    start?: LatLng;
    seatsTotal: number;
    seatsLeft?: number;
    car: Car;
    route: LatLng[];
    passengers?: Passanger[]; // Only available to driver
    waypoint?: LatLng; // Used in trip suggestions. Nearest point on the route to your home location
}

export { Trip };
