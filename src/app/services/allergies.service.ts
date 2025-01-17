import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class AllergiesService {
  private apiUrl = `${API_URL}/api/cat-allergies`;

  constructor(private http: HttpClient) {}

  getAllergies(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
