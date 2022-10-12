import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message } from '../interfaces/message';




@Injectable({
  providedIn: 'root'
})

export class MessagesService {
  private myAppUrl: string
  private myApiUrl: string

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint
    this.myApiUrl = `api/users/:username/messages/inbox`
  }

  getMessage(): Observable<Message[]>{
    const token = localStorage.getItem("token")
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

    return this.http.get<Message[]>(`${this.myAppUrl}${this.myApiUrl}`, {headers: headers} );
  }

}