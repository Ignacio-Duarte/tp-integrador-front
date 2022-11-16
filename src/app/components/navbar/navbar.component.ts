import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrComponentlessModule } from 'ngx-toastr';
import { Message } from 'src/app/interfaces/message';
import { MessagesService } from 'src/app/services/messages.service';
import { UserService } from 'src/app/services/user.service';
import { DashboardComponent } from '../dashboard/dashboard.component';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router,
              private dashboardFunctions: DashboardComponent,
              private _messageService: MessagesService,
              private _userService: UserService
            ) { }

  ngOnInit(): void {
  }
  objIngresar: Message = {}


  bandejaDeEntrada(){
    console.log(this._messageService.capturarUsuario())
  }

  logOut(){
    localStorage.removeItem("token")
    this.router.navigate(["/login"])
  }
}
