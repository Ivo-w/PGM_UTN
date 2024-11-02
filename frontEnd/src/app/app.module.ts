import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntornoComponent } from './components/entorno/entorno.component';
import { LoginComponent } from './components/login/login.component';
import { OrdenTrabajoComponent } from './components/orden-trabajo/orden-trabajo.component';  
import { OrdenVisualComponent } from './components/orden-visual/orden-visual.component';
import { HistorialComponent } from './components/historial/historial.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt'; 
import { AuthService } from '../service/auth.service.js'; 
import { AuthGuard } from '../app/auth.guard.js'; 


// Función para obtener el token
export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    EntornoComponent,
    LoginComponent,
    OrdenTrabajoComponent,
    OrdenVisualComponent,
    HistorialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:3000'], 
        disallowedRoutes: []
      }
    })
  ],
  providers: [
    AuthService,
    AuthGuard,  
 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
