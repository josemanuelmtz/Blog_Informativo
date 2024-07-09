import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { ListaNoticiasComponent } from './components/lista-noticias/lista-noticias.component';

const routes: Routes = [
  { path: 'ree', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'inicio', component: InicioComponent},
  { path: 'dd', component: NoticiasComponent},
  { path: '', component: ListaNoticiasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
