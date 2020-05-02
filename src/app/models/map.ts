type LatLng = [number, number];

interface HereMapsPlace {
    title: string;
    address: {
        street: string;
        houseNumber?: string;
        city: string;
        countryName: string;
    };
    position: {
        lat: number;
        lng: number;
    };
    prettyAddress?: string;
}

interface HereMapsGeocodeResponse {
    items: HereMapsPlace[];
}

export { LatLng, HereMapsGeocodeResponse, HereMapsPlace };
