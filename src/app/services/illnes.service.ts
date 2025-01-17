import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class IllnesService {
  private apiUrl = `${API_URL}/api/cat-critical-illnes`;

  constructor(private http: HttpClient) {}

  getIllnes(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
