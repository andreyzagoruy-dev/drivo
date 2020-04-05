import { Component, OnChanges, Input, ViewChild, OnInit } from '@angular/core';
import { Map, Marker, Polyline, tileLayer } from 'leaflet';
import { icons } from './icons'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges {

  @ViewChild('map', { static: true }) mapReference;
  @Input() markers: [];
  @Input() home;
  @Input() route: [];

  private _map;

  constructor() {}

  ngOnInit() {
    this._initMap();
    this._renderMap();
    this._renderObjectsOnMap();
  }

  ngOnChanges() {
    this._map && this._renderObjectsOnMap();
  }

  private _initMap(): void {
    this._map = new Map(this.mapReference.nativeElement, {});
  }

  private _renderMap(): void {
    const tiles = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this._map);
  }

  private _renderObjectsOnMap() {
    this._renderMarkers();
    this._renderHome();
    this._renderPath();
  }

  private _renderMarkers(): void {
    this.markers.forEach((point: any) => {
      const marker = this._createMarker(point, 'default');
      marker.addTo(this._map);
    });
  }

  private _renderHome(): void {
    if (!this.home) return;

    const homeMarker = this._createMarker(this.home, 'home');
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
