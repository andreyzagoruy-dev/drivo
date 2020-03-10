import { Component, AfterViewInit, Input } from '@angular/core';
import { Map, Marker, Polyline, tileLayer } from 'leaflet';
import { icons } from './icons'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  @Input() markers: [];
  @Input() home;
  @Input() route: [];

  private _map;

  constructor() { }

  ngAfterViewInit() {
    this._initMap();
    this._renderMap();
    this._renderMarkers();
    this._renderPath();
  }

  private _initMap(): void {
    this._map = new Map('map', {});
  }

  private _renderMap(): void {
    const tiles = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this._map);
  }

  private _renderMarkers(): void {
    this.markers.forEach((point: any) => {
      const marker = this._createMarker({lat: point.latitude, lng: point.longitude}, 'default');
      marker.addTo(this._map);
    });
    const homeMarker = this._createMarker({lat: this.home.latitude, lng: this.home.longitude}, 'home');
    homeMarker.addTo(this._map);
  }

  private _createMarker(location, type: string): Marker {
    type = type.toLowerCase();
    return new Marker(location, {icon: icons[type]});
  }

  private _renderPath(): void {
    const path = this._createPath(this.route);
    path.addTo(this._map);
    this._map.fitBounds(path.getBounds());
  }

  private _createPath(waypoints: []): Polyline {
    return new Polyline(waypoints, {color: 'red'});
  }

}
