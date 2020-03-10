import { icon } from 'leaflet';

export const icons = {
  default: icon({
    iconUrl: 'assets/map/marker-default.svg',
    iconSize: [32, 32],
    iconAnchor: [0, 16]
  }),
  home: icon({
    iconUrl: 'assets/map/marker-home.svg',
    iconSize: [32, 32],
    iconAnchor: [0, 16]
  })
}
