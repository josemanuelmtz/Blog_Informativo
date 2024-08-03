import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CommentsComponent } from './components/comments/comments.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InicioComponent } from './components/inicio/inicio.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { ListaNoticiasComponent } from './components/lista-noticias/lista-noticias.component';
import { HttpClientModule } from '@angular/common/http';
import { VistanoticiasComponent } from './components/vistanoticias/vistanoticias.component';
import { NewsService } from './services/news.service';
import { NotificationComponent } from './components/notification/notification.component'; 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CommentsComponent,
    InicioComponent,
    NoticiasComponent,
    ListaNoticiasComponent,
    VistanoticiasComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    NewsService,
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
