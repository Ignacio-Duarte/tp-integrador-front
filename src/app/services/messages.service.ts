import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable, Input, ViewChild } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginComponent } from '../components/login/login.component';
import { Message } from '../interfaces/message';
import { User } from '../interfaces/user';
import { UserService } from './user.service';




@Injectable({
  providedIn: 'root'
})

export class MessagesService {
  private myAppUrl: string
  private objIngresar: Message = {}

  constructor(private http: HttpClient, private _userService: UserService ) {
    this.myAppUrl = environment.endpoint
  }

  capturarUsuario(){
     this._userService.disparadorDeObjeto.subscribe(data => {
      this.objIngresar = data
      console.log("CapturarUsuario(): ", this.objIngresar)
      return this.objIngresar
    })
  }

  getMessages(objIngresar: Message): Observable<Message[]>{
    this.capturarUsuario()
    console.log("GetMessage (Nada que hacer aca)")
    const token = localStorage.getItem("token")
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    // console.log(`${this.myAppUrl}${`api/users/${this.objIngresar.username_reseptor}/messages/inbox`}`)
    return this.http.get<Message[]>(`${this.myAppUrl}${`api/users/${this.objIngresar.username_reseptor}/messages/inbox`}`, {headers: headers} );
  }

}