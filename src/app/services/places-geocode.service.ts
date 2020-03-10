import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API_URL = "https://geocode.search.hereapi.com/v1/geocode?apiKey=";

const API_KEY = "PlBaCE42NHOrkIaoJA_XyUfT8ea0HIUaLpumgDgADrE";

@Injectable({
  providedIn: 'root'
})
export class PlacesGeocodeService {

  constructor(private http: HttpClient) { }

  suggest(searchQuery: string) {
    return this.http.get(`${API_URL}${API_KEY}&q=${searchQuery}`);
  }
}
