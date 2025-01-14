import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../app.config';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class InicioSesionService {

  private userId: string | null = null; // Variable para almacenar el ID
  private userPassword: string | null = null; // Variable para almacenar la contraseña
  private userEmail: string | null = null; // Variable para almacenar el correo electrónico  

  constructor(private http: HttpClient) { }

  login(emailAddress: string, password: string): Observable<LoginResponse> {
    const url = `${API_URL}/api/users/login`;
    const body = { emailAddress, password };

    return this.http.post<LoginResponse>(url, body); // Realiza la solicitud POST
  }



  // Método para guardar el ID
  setVariable(id: string) {
    this.userId = id;
  }

  // Método para obtener el ID
  getVariable() {
    return this.userId;
  }

  // Método para guardar la contraseña
  setPassword(password: string) {
    this.userPassword = password;
  }

  // Método para obtener la contraseña
  getPassword() {
    return this.userPassword;
  }

  // Método para guardar el correo electrónico
  setUserEmail(email: string) {
    this.userEmail = email;
  }

  // Método para obtener el correo electrónico
  getUserEmail(): string | null {
    return this.userEmail;
  }

  // login(emailAddress: string, password: string): Promise<number> {
  //   const url = 'http://localhost:8080/api/users/login';
  //   const body = { emailAddress, password };

  //   // return this.http.post<number>(url, body); // Realiza la solicitud POST
  //   return this.http.post<any>(url, body).toPromise();
  // }

  // JSON "set" example
async saveToken(token: string): Promise<void> {
  await Preferences.set({
    // key: 'user',
    // value: JSON.stringify({
    //   id: 1,
    //   name: 'Max'
    // })
    key: 'auth_token',
      value: token,
  });
}

// async saveID(id: string): Promise<void> {
//   await Preferences.set({
//     key: 'id',
//       value: id,
//   });
// }

async saveID(id: string): Promise<void> {
  localStorage.setItem('id', id);
}

async savePassword(password: string): Promise<void> {
  localStorage.setItem('password', password);
}

async saveUserEmail(email: string): Promise<void> {
  localStorage.setItem('email', email);
}

// async savePassword(password: string): Promise<void> {
//   await Preferences.set({
//     key: 'password',
//       value: password,
//   });
// }

// JSON "get" example
async getToken(): Promise<string | null> {
  // const ret = await Preferences.get({ key: 'user' });
  // const user = JSON.parse(ret.value);
  const token = await Preferences.get({ key: 'auth_token' });
  return token.value;
}

async getID(): Promise<string | null> {
  const id = await Preferences.get({ key: 'id' });
  return id.value;
}

async getPass(): Promise<string | null> {
  const password = await Preferences.get({ key: 'password' });
  return password.value;
}
}


export interface LoginResponse {
  id: string; // o string, dependiendo de cómo manejes los IDs
  password: string;
  emailAddress: string; // Agregar el correo electrónico en la respuesta
}