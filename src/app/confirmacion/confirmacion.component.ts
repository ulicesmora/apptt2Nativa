import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DatosService } from '../services/datos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MensajesService } from '../services/mensajes.service';
import { RegistroService, Usuario } from '../registro/registro.service';

@Component({
  selector: 'app-confirmacion',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule],
  templateUrl: './confirmacion.component.html',
  styleUrl: './confirmacion.component.css'
})
export class ConfirmacionComponent implements OnInit{

  datos: any[] = [];

  usuario: Usuario = {
    roleId: 2,
    emailAddress: '',
    password: '',
    name: '',
    secondName: '',
    lastName: '',
    motherLastName: '',
    bloodType: '',
    birthDate: '',
    sex: '',
    allergies: '',
    criticalIllnes: '',
    status: 'false',
    cellPhone: '',
    auxiliaryCellPhone: '',
    latitud: '',
    longitud: '',
    date: new Date() // Inicializa con la fecha actual
  };

  nombre = this.datos[0];
  apellidoPaterno='';
  apellidoMaterno='';
  correo='';
  telefono='';
  telefonoAuxiliar='';
  genero='';
  alergia='';
  otraAlergia='';
  enfermedad='';
  otraEnfermedad='';
  password='';
  rpassword='';

  // get datos() {
  //   return this.datosService.datos;
  // }

  get mensajes() {
    return this.mensajesService.mensajes;
  }

  constructor(
    private datosService: DatosService,
    private mensajesService: MensajesService,
    private registroService: RegistroService,
    public _matDialogRef: MatDialogRef<ConfirmacionComponent>
  ) {}

  ngOnInit(): void {
    this.datosService.datos$.subscribe((datos) => {
      this.datos = datos;
    });
  }

  registrarUsuario() {
    this.registroService.crearUsuario(this.usuario).subscribe(
      response => {
        console.log('Usuario creado con éxito:', response);
        // Aquí puedes agregar lógica adicional, como mostrar un mensaje de éxito
        this.mensajesService.agregarMensaje("Cuenta creada. Revise su correo electrónico");
        setTimeout(() => {
          this.mensajesService.agregarMensaje("");
        }, 3000);
      },
      error => {
        console.error('Error al crear el usuario:', error);
        // Aquí puedes agregar lógica para manejar el error, como mostrar un mensaje de error
        this.mensajesService.agregarMensaje("No se pudo crear su cuenta. Intentelo más tarde");
        setTimeout(() => {
          this.mensajesService.agregarMensaje("");
        }, 3000);
      }
    );
  }

  agregarMsj(dato0:any,dato1:any,dato2:any,dato3:any,dato4:any,dato5:any,dato6:any,dato7:any,dato8:any,dato9:any) {
    this.usuario.name=dato0;
    this.usuario.lastName=dato1;
    this.usuario.motherLastName=dato2;
    this.usuario.emailAddress=dato3;
    this.usuario.cellPhone=dato4;
    this.usuario.auxiliaryCellPhone=dato5;
    this.usuario.sex=dato6;
    this.usuario.allergies=dato7;
    this.usuario.criticalIllnes=dato8;
    this.usuario.password=dato9;

    this.registrarUsuario();
    // setTimeout(() => {
    //   this.mensajesService.agregarMensaje("Cuenta creada. Revise su correo electrónico");
    // }, 3000);
    // setTimeout(() => {
    //   this.mensajesService.agregarMensaje("");
    // }, 6000);
  }

  onNoClick(): void {
    this._matDialogRef.close();  
    this.datosService.eliminarDatos();
  }
}
