import { Component, OnChanges, Input, ViewChild, OnInit } from '@angular/core';
import { Map, Marker, Polyline, tileLayer, PolylineOptions } from 'leaflet';
import { environment } from '@environments/environment';
import { LatLng } from '@models/map';
import { icons } from './icons';

const API_KEY = environment.apiMapsKey;

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

  private map: Map;

  ngOnInit() {
    this.initMap();
    this.renderMap();
    this.renderObjectsOnMap();
  }

  ngOnChanges() {
    this.map && this.renderObjectsOnMap();
  }

  private initMap(): void {
    this.map = new Map(this.mapReference.nativeElement, {
      attributionControl: false,
      zoomControl: false
    });
  }

  private renderMap(): void {
    const tiles = tileLayer(`https://2.base.maps.ls.hereapi.com/maptile/2.1/maptile/newest/normal.day/{z}/{x}/{y}/512/png8?apiKey=${API_KEY}&ppi=250`, {
      maxZoom: 19
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
    const outline = this.createPath(this.route as [], { color: '#3F7FEF', weight: 8 });
    const path = this.createPath(this.route as [], { color: '#FFF', weight: 6 });
    outline.addTo(this.map);
    path.addTo(this.map);
    this.map.fitBounds(path.getBounds());
  }

  private createPath(waypoints: [], options: PolylineOptions = {}): Polyline {
    return new Polyline(waypoints, options);
  }
}
