import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'src/app/interfaces/message';
import { UserService } from 'src/app/services/user.service';


// const listMessages: Message[] = [
//   {id_m: 1, username_remitente: "Nacho123", message: "Hola Prueba desde la tabla"}
// ];


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {
  constructor(private _userService: UserService, private _messageService: MessagesService, private fb: FormBuilder) {}
  
  listMessages: any[] = []
  objIngresar: Message = {}
  dataSource: any = []

  displayedColumns: string[] = ['id', 'Remitente', 'Mensaje', "item"];

  
  
  
  ngOnInit(): void {
    
    // this.getMessage(this.objIngresar)
    
  }

  //Sobre carga de metodo test
  getMessagess(){
    return this._messageService.getMessages(this.objIngresar).subscribe(data => {
      this.listMessages.push(data)
      this.dataSource = this.listMessages[0];
      console.log("Aca el dataSource: ", this.dataSource)
    })
  }


  getMessage(objIngresar: Message){
    return this._messageService.getMessages(objIngresar).subscribe(data => {
      this.listMessages.push(data)
      this.dataSource = this.listMessages[0];
      console.log("Aca el dataSource: ", this.dataSource)
    })
  }

}
