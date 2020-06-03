import { Component, OnChanges, Input, ViewChild, OnInit } from '@angular/core';
import { Map, Marker, Polyline, tileLayer, PolylineOptions, MarkerOptions } from 'leaflet';
import { environment } from '@environments/environment';
import { Trip } from '@app/models/trip';
import { Passanger } from '@app/models/passanger';
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
  @Input() trip: Trip;
  @Input() home: LatLng = null;

  private map: Map;

  ngOnInit() {
    this.initMap();
    this.renderMap();
    this.renderObjectsOnMap();
  }

  ngOnChanges() {
    if (this.map) {
      this.clearMap();
      this.renderMap();
      this.renderObjectsOnMap();
    }
  }

  private initMap(): void {
    this.map = new Map(this.mapReference.nativeElement, {
      attributionControl: false,
      zoomControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      tap: false,
      touchZoom: false
    });
  }

  private clearMap(): void {
    this.map.eachLayer((layer) => {
      this.map.removeLayer(layer);
    });
  }

  private renderMap(): void {
    const tiles = tileLayer(`https://2.base.maps.ls.hereapi.com/maptile/2.1/maptile/newest/normal.day/{z}/{x}/{y}/512/png8?apiKey=${API_KEY}&ppi=250`, {
      maxZoom: 19
    });

    tiles.addTo(this.map);
  }

  private renderObjectsOnMap(): void {
    this.renderMarkers();
    this.renderHome();
    this.renderPath();
    this.fitBounds();
  }

  private renderMarkers(): void {
    const { passengers, waypoint } = this.trip;

    if (passengers) {
      passengers.forEach((passenger: Passanger) => {
        const markerBackground = this.createMarker(passenger.waypoint, 'dot-background', { zIndexOffset: -100 });
        const marker = this.createMarker(passenger.waypoint, 'dot');
        markerBackground.addTo(this.map);
        marker.addTo(this.map);
      });
    }

    if (waypoint) {
      const markerBackground = this.createMarker(waypoint, 'dot-background', { zIndexOffset: -100 });
      const marker = this.createMarker(waypoint, 'dot');
      markerBackground.addTo(this.map);
      marker.addTo(this.map);
    }
  }

  private renderHome(): void {
    if (!this.home) return;

    const homeMarker = this.createMarker(this.home, 'home');
    homeMarker.addTo(this.map);
  }

  private createMarker(
    location: LatLng,
    type: string,
    options: MarkerOptions = { zIndexOffset: 600 }
  ): Marker {
    Object.assign(options, { icon: icons[type.toLowerCase()] });
    return new Marker(location, options);
  }

  private renderPath(): void {
    const { route } = this.trip;
    const outline = this.createPath(route, { color: '#3F7FEF', weight: 8 });
    const path = this.createPath(route, { color: '#FFF', weight: 6, pane: 'markerPane' });
    outline.addTo(this.map);
    path.addTo(this.map);
  }

  private fitBounds(): void {
    const { route } = this.trip;
    this.map.fitBounds([...route, this.home ? this.home : null], { padding: [64, 64] });
  }

  private createPath(waypoints: LatLng[], options: PolylineOptions = {}): Polyline {
    return new Polyline(waypoints, options);
  }
}
