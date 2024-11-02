import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdenTrabajoComponent } from './components/orden-trabajo/orden-trabajo.component';
import { EntornoComponent } from './components/entorno/entorno.component';
import { LoginComponent } from './components/login/login.component';
import { OrdenVisualComponent } from './components/orden-visual/orden-visual.component';
import { HistorialComponent } from './components/historial/historial.component';


import { AuthGuard } from './auth.guard';



export const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }

  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'inicio', 
    component: EntornoComponent
  },
  {
    path: 'ot', 
    component: OrdenTrabajoComponent
  },
  {
   path: 'visual',
   component: OrdenVisualComponent
  },
  {
    path: 'historial',
    component: HistorialComponent
   }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
