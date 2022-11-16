import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  @Output() disparadorDeObjeto: EventEmitter<any> = new EventEmitter()

  
  private myAppUrl: string
  private myApiUrl: string

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint
    this.myApiUrl = "api/users"
  }

  signIn(user: User): Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, user)
  }


  login(user: User): Observable<String>{
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/login`, user)
  }

}
