import { icon } from 'leaflet';

export const icons = {
  default: icon({
    iconUrl: 'assets/map/marker-default.svg',
    iconSize: [48, 48],
    iconAnchor: [0, 24]
  }),
  home: icon({
    iconUrl: 'assets/map/marker-home.svg',
    iconSize: [48, 48],
    iconAnchor: [0, 24]
  })
};
