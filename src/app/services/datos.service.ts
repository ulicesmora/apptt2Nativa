import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  private _datos:Array<1> = [];

  get datos() {
    return [...this._datos];
  }

  constructor() { }

  agregarDato(dato:any) {
    this._datos.push(dato);
  }

  eliminarDatos() {
    this._datos=[];
    // this._datos.splice(0, this._datos.length);
  }
}
