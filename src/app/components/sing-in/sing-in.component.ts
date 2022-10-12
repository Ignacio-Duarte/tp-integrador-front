import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css']
})
export class SingInComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private toastr: ToastrService, private _userservice: UserService, private router: Router) {
    this.form = this.fb.group({
      nombre: ["", Validators.required],
      apellido: ["", Validators.required],
      username: ["", Validators.required],
      password: ["", Validators.required],
      passwordConfirm: ["", Validators.required],
      pais: ["", Validators.required],
      ciudad: ["", Validators.required],
    })
  }

  ngOnInit(): void {
  }

  addUser(){

    if(!this.form.valid){
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return
    }

    // Valide que las passwords sean iguales. 

    if(this.form.value.password != this.form.value.passwordConfirm){
      this.toastr.error("Las contraseñas no son iguales", "Error")
      return
    }

    // Crea el body

    const user: User = {
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      username: this.form.value.username, 
      password: this.form.value.password,
      pais: this.form.value.pais, 
      ciudad: this.form.value.ciudad
    }


    this._userservice.signIn(user).subscribe({
      next: (v) => {
        this.toastr.success(`El usuario: ${this.form.value.username} fue creado con exito`, "Usuario registrado")
        this.router.navigate(['/login'])
      },
      error: (e: HttpErrorResponse) => {
        this.msjError(e)
      }
    })
    
  }
  msjError(e: HttpErrorResponse){
    if(e.error.msj){
      this.toastr.error(e.error.msj, "Error")
    }else {
      this.toastr.error('Error en servidor', "Error")
    }
  }

}
