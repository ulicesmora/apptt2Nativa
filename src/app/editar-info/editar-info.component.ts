import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { MensajesService } from '../services/mensajes.service';
import { InicioSesionService } from '../login/inicio-sesion.service';
import { EditarInfoService, UserUpdateDTO } from './editar-info.service';
import { Usuario } from '../registro/registro.service';

@Component({
  selector: 'app-editar-info',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule],
  templateUrl: './editar-info.component.html',
  styleUrl: './editar-info.component.css'
})
export class EditarInfoComponent implements OnInit{

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

  userId = Number(localStorage.getItem('id'));

  emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  telRegex = /^\d{10}$/;
  elementAlergia = false;
  elementEnfermedad = false;
  mensajeDatos = false;
  mensajeCorreo = false;
  mensajeTel = false;
  mensajePass = false;
  nombre = this.usuario.name;
  apellidoPaterno=this.usuario.lastName;
  apellidoMaterno=this.usuario.motherLastName;
  correo=this.usuario.emailAddress;
  telefono=this.usuario.cellPhone;
  telefonoAuxiliar=this.usuario.auxiliaryCellPhone;
  genero=this.usuario.auxiliaryCellPhone;
  alergia=this.usuario.allergies;
  otraAlergia='';
  enfermedad=this.usuario.criticalIllnes;
  otraEnfermedad='';

  userUpdateDTO: UserUpdateDTO = {};

  

  constructor(
    private mensajesService: MensajesService,
    private inicioSesionService: InicioSesionService,
    private editarInfoService: EditarInfoService,
    private router: Router
  ) {}
  ngOnInit(): void {
    console.log('ID de usuario:', this.userId);
    this.obtenerUsuario(this.userId);
    
  }

  showData() {
    return (this.elementAlergia = true);
  }
  hideData() {
    return (this.elementAlergia = false);
  }
  showEnfermedad() {
    return (this.elementEnfermedad = true);
  }
  hideEnfermedad() {
    return (this.elementEnfermedad = false);
  }

  evaluarDato() {
    if(this.alergia.length==0) {
      this.elementAlergia=false;
    } else if(this.enfermedad.length==0) {
      this.elementEnfermedad=false;
    } 
  }

  validarCorreo() {
    if(!this.emailRegex.test(this.correo)) {
      return this.mensajeCorreo=true;
    } else {
      return this.mensajeCorreo=false;
    }
  }

  validarTel() {
    if(!this.telRegex.test(this.telefono) || !this.telRegex.test(this.telefonoAuxiliar)) {
      return this.mensajeTel=true;
    } else {
      return this.mensajeTel=false;
    }
  }

  agregarMsj() {
    this.mensajesService.agregarMensaje("Información modificada");
    setTimeout(() => {
      this.mensajesService.agregarMensaje("");
    }, 3000);
  }

  camposRequeridos() {
    // if ( this.nombre.length==0 || this.apellidoPaterno.length==0 || this.apellidoMaterno.length==0 || this.correo.length==0 || this.telefono.length==0 || this.telefonoAuxiliar.length ==0 || this.genero ) {
      // if(this.mensajeCorreo==true || this.mensajePass==true || this.mensajeTel==true || this.mensajeDatos==true) {
      //   this.router.navigate(['/editar-info']);
      // } else {
      //   this.router.navigate(['/interfaz-principal']);
      // }
    if ( !this.nombre || !this.apellidoPaterno|| !this.apellidoMaterno|| !this.correo || !this.telefono|| !this.telefonoAuxiliar|| !this.genero || !this.alergia || !this.enfermedad ) {
       this.mensajeDatos = true;
       
      setTimeout(() => {
        this.mensajeDatos = false;
      }, 3000);
    } else {
      this.userUpdateDTO.name=this.nombre;
      this.userUpdateDTO.lastName=this.apellidoPaterno;
      this.userUpdateDTO.motherLastName=this.apellidoMaterno;
      this.userUpdateDTO.emailAddress=this.correo;
      this.userUpdateDTO.cellPhone=this.telefono;
      this.userUpdateDTO.auxiliaryCellPhone=this.telefonoAuxiliar;
      this.userUpdateDTO.sex=this.genero;
      this.userUpdateDTO.allergies=this.alergia;
      this.userUpdateDTO.criticalIllnes=this.enfermedad;
      // this.userUpdateDTO.password=dato9;
      this.updateUser();
    }
  }

  obtenerUsuario(id: number) {
    this.editarInfoService.obtenerUsuario(id).subscribe({
      next: (response) => {
        console.log(response)
        this.usuario = response; // Guarda la respuesta en la variable usuario
        this.nombre = this.usuario.name;
        this.apellidoPaterno=this.usuario.lastName;
        this.apellidoMaterno=this.usuario.motherLastName;
        this.correo=this.usuario.emailAddress;
        this.telefono=this.usuario.cellPhone;
        this.telefonoAuxiliar=this.usuario.auxiliaryCellPhone;
        this.genero=this.usuario.sex;
        this.alergia=this.usuario.allergies;
        this.otraAlergia='';
        this.enfermedad=this.usuario.criticalIllnes;
        this.otraEnfermedad='';
      },
      error: (error) => {
        console.error('Error al obtener la información del usuario:', error);
      }
    });
  }
  
  updateUser (): void {
    this.editarInfoService.updateUser(this.userId, this.userUpdateDTO).subscribe({
      next: (response) => {
        console.log('Usuario actualizado:', response);
        this.router.navigate(['/interfaz-principal']);
        this.agregarMsj();
      },
      error: (error) => {
        console.error('Error al actualizar usuario:', error);
      }
  });
  }

}
