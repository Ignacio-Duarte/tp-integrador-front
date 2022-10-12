import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


// Componentes
import { LoginComponent } from "./components/login/login.component";
import { SingInComponent } from "./components/sing-in/sing-in.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";


const routes: Routes = [
    {path: "", redirectTo: 'login', pathMatch: 'full'},
    {path: "login", component: LoginComponent},
    {path: "signIn", component: SingInComponent},
    {path: "dashboard", component: DashboardComponent},
    {path: '**', redirectTo: 'login', pathMatch: 'full'}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }