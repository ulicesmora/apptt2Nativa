import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  // private _datos:Array<1> = [];
  private _datos: any[] = [];
  private _datosSubject = new BehaviorSubject<any[]>([]);

  // get datos() {
  //   return [...this._datos];
  // }

  constructor() { }

  // agregarDato(dato:any) {
  //   this._datos.push(dato);
  // }

  eliminarDatos() {
    this._datos=[];
    // this._datos.splice(0, this._datos.length);
  }

  agregarDato(dato: any) {
    this._datos.push(dato);
    this._datosSubject.next([...this._datos]); // Emitir cambios
  }

  get datos$() {
    return this._datosSubject.asObservable(); // Observable para suscribirse
  }

  get datos() {
    return [...this._datos];
  }
}
