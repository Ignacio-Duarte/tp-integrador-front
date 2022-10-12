import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  username: string = ''
  password: string = ''

  form: FormGroup;

  constructor(private fb: FormBuilder, private toastr: ToastrService,
     private _userService: UserService,
     private router: Router) {

    this.form = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    })
   }

  ngOnInit(): void {
  }

  ingresar(){
    const username = this.form.value.username
    const password = this.form.value.password

  }

  login(){

    //Validamos si el usuario ingresa datos.

    if(!this.form.valid || this.username == "" && this.password == "" ){
      this.toastr.error("Todos los campos son requeridos", "")
      return
    }

    // Creo el Objeto.

    const user: User = {
      username: this.username,
      password: this.password
    }

    this._userService.login(user).subscribe({
      next: (token)=> {
        this.router.navigate(['/dashboard'])
        localStorage.setItem('token', token.toString())
      },
      error: (e: HttpErrorResponse)=>{
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


