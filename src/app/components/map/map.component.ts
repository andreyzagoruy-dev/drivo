import { Component, OnChanges, Input, ViewChild, OnInit } from '@angular/core';
import { Map, Marker, Polyline, tileLayer } from 'leaflet';
import { LatLng } from '@models/map';
import { icons } from './icons';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges {
  @ViewChild('mapContainer', { static: true }) mapReference;
  @Input() markers: LatLng[] = [];
  @Input() home: LatLng = null;
  @Input() route: LatLng[] = [];

  private map;

  ngOnInit() {
    this.initMap();
    this.renderMap();
    this.renderObjectsOnMap();
  }

  ngOnChanges() {
    this.map && this.renderObjectsOnMap();
  }

  private initMap(): void {
    this.map = new Map(this.mapReference.nativeElement, {});
  }

  private renderMap(): void {
    const tiles = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  private renderObjectsOnMap() {
    this.renderMarkers();
    this.renderHome();
    this.renderPath();
  }

  private renderMarkers(): void {
    this.markers.forEach((point: any) => {
      const marker = this.createMarker(point, 'default');
      marker.addTo(this.map);
    });
  }

  private renderHome(): void {
    if (!this.home) return;

    const homeMarker = this.createMarker(this.home, 'home');
    homeMarker.addTo(this.map);
  }

  private createMarker(location, type: string): Marker {
    type = type.toLowerCase();
    return new Marker(location, { icon: icons[type] });
  }

  private renderPath(): void {
    const path = this.createPath(this.route as []);
    path.addTo(this.map);
    this.map.fitBounds(path.getBounds());
  }

  private createPath(waypoints: []): Polyline {
    return new Polyline(waypoints, { color: 'red' });
  }
}
