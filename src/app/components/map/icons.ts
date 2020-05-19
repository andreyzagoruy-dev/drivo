import { icon } from 'leaflet';

export const icons = {
  default: icon({
    iconUrl: 'assets/map/marker-default.svg',
    iconSize: [48, 48],
    iconAnchor: [24, 48]
  }),
  home: icon({
    iconUrl: 'assets/map/marker-home.svg',
    iconSize: [48, 48],
    iconAnchor: [24, 48]
  }),
  dot: icon({
    iconUrl: 'assets/map/marker-dot.svg',
    iconSize: [8, 8],
    iconAnchor: [4, 4]
  }),
  'dot-background': icon({
    iconUrl: 'assets/map/marker-dot-background.svg',
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  })
};
