import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

const API_URL = environment.apiMapsUrl;
const API_KEY = environment.apiMapsKey;

@Injectable({
  providedIn: 'root'
})
export class PlacesGeocodeService {
  constructor(private http: HttpClient) { }

  public suggest(searchQuery: string) {
    return this.http.get(`${API_URL}${API_KEY}&q=${searchQuery}`);
  }
}
