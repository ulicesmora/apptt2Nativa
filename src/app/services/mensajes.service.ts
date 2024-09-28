import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  private _mensajes:String = "";

  get mensajes() {
    return this._mensajes;
  }

  constructor() { }

  agregarMensaje(mensaje:string) {
    this._mensajes = mensaje;
  }

  eliminarMensaje() {
    this._mensajes='';
  }
}
