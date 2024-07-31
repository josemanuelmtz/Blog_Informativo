import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { ListaNoticiasComponent } from './components/lista-noticias/lista-noticias.component';
import { VistanoticiasComponent } from './components/vistanoticias/vistanoticias.component';
import { FooterComponent } from './components/footer/footer.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'inicio', component: InicioComponent},
  { path: 'dd', component: NoticiasComponent},
  { path: 'lista', component: ListaNoticiasComponent},
  { path: 'vistanoticias', component: VistanoticiasComponent},
  { path: 'footer', component: FooterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
