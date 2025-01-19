import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { MensajesService } from '../services/mensajes.service';
import { InicioSesionService } from '../login/inicio-sesion.service';
import { EditarInfoService, UserUpdateDTO } from './editar-info.service';
import { Usuario } from '../registro/registro.service';
import { AllergiesService } from '../services/allergies.service';
import { IllnesService } from '../services/illnes.service';

@Component({
  selector: 'app-editar-info',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule],
  templateUrl: './editar-info.component.html',
  styleUrl: './editar-info.component.css'
})
export class EditarInfoComponent implements OnInit{

  allergies: any[] = [];
  illnes: any[] = [];
  nombres: string[] = [];

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

  minDate: string;
  maxDate: string;

  userId = Number(localStorage.getItem('id'));

  emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  telRegex = /^\d{10}$/;
  elementAlergia = false;
  elementEnfermedad = false;
  mensajeDatos = false;
  mensajeCorreo = false;
  mensajeTel = false;
  mensajePass = false;
  nombre = `${this.usuario.name} ${this.usuario.secondName}`;
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
  grupoSanguineo=this.usuario.bloodType;
  fechaNacimiento=this.usuario.birthDate;

  userUpdateDTO: UserUpdateDTO = {};

  

  constructor(
    private mensajesService: MensajesService,
    private inicioSesionService: InicioSesionService,
    private editarInfoService: EditarInfoService,
    private allergiesService: AllergiesService,
    private illnesService: IllnesService,
    private router: Router
  ) {
    const currentDate = new Date();
    this.minDate = '1913-01-01';
    this.maxDate = currentDate.toISOString().split('T')[0]; // Fecha actual en formato 'YYYY-MM-DD'
  }
  ngOnInit(): void {
    console.log('ID de usuario:', this.userId);
    this.obtenerUsuario(this.userId);
    this.loadAllergies();
    this.loadIllnes();
  }

  loadAllergies(): void {
    this.allergiesService.getAllergies().subscribe({
      next: (data) => {
        this.allergies = data; // Asume que el endpoint devuelve un arreglo
      },
      error: (error) => {
        console.error('Error al cargar las alergias:', error);
      }
    });
  }

  loadIllnes(): void {
    this.illnesService.getIllnes().subscribe({
      next: (data) => {
        this.illnes = data; // Asume que el endpoint devuelve un arreglo
      },
      error: (error) => {
        console.error('Error al cargar las enfermedades:', error);
      }
    });
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
    if ( !this.nombre || !this.apellidoPaterno|| !this.apellidoMaterno|| !this.correo || !this.telefono|| !this.telefonoAuxiliar|| !this.genero || !this.alergia || !this.enfermedad || !this.grupoSanguineo || !this.fechaNacimiento) {
       this.mensajeDatos = true;
       
      setTimeout(() => {
        this.mensajeDatos = false;
      }, 3000);
    } else {
      if (this.nombre.trim().includes(' ')) {
        this.nombres = this.nombre.trim().split(/\s+/); // Divide por cualquier cantidad de espacios
        this.userUpdateDTO.name=this.nombres[0];
        this.userUpdateDTO.secondName=this.nombres[1];
      } else {
        this.userUpdateDTO.name=this.nombre;
      }
      this.userUpdateDTO.lastName=this.apellidoPaterno;
      this.userUpdateDTO.motherLastName=this.apellidoMaterno;
      this.userUpdateDTO.emailAddress=this.correo;
      this.userUpdateDTO.cellPhone=this.telefono;
      this.userUpdateDTO.auxiliaryCellPhone=this.telefonoAuxiliar;
      this.userUpdateDTO.sex=this.genero;
      this.userUpdateDTO.allergies=this.alergia;
      this.userUpdateDTO.criticalIllnes=this.enfermedad;
      this.userUpdateDTO.bloodType=this.grupoSanguineo;
      this.userUpdateDTO.birthDate=this.fechaNacimiento;
      // this.userUpdateDTO.password=dato9;
      this.updateUser();
    }
  }

  obtenerUsuario(id: number) {
    this.editarInfoService.obtenerUsuario(id).subscribe({
      next: (response) => {
        console.log(response)
        this.usuario = response; // Guarda la respuesta en la variable usuario
        this.nombre = `${this.usuario.name} ${this.usuario.secondName}`;
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
        this.grupoSanguineo=this.usuario.bloodType;
        this.fechaNacimiento=this.usuario.birthDate;
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
