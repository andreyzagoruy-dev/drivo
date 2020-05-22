import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { HereMapsGeocodeResponse } from '@models/map';

const API_URL = environment.apiMapsUrl;
const API_KEY = environment.apiMapsKey;

@Injectable({
  providedIn: 'root'
})
export class PlacesGeocodeService {
  constructor(
    private http: HttpClient,
    private httpBackend: HttpBackend
  ) {
    this.http = new HttpClient(httpBackend);
  }

  public suggest(searchQuery: string): Observable<HereMapsGeocodeResponse> {
    return this.http.get<HereMapsGeocodeResponse>(`${API_URL}${API_KEY}&q=${searchQuery}&limit=5&in=countryCode:UKR`);
  }
}
