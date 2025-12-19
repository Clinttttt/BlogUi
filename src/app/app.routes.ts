import { Routes } from '@angular/router';
import { MainLayoutComponent } from './component/layout/main-layout.component';
import path from 'path';


export const routes: Routes = [
 {
   path:'',
   component: MainLayoutComponent,
   children: [
     {
      path: '', 
      loadComponent: () => import('./component/Pages/main-page.component').then(m => m.MainPage)
     },
     {
      path: 'GoogleAuth', 
      loadComponent: () => import('./component/Pages/oath/login.component').then(m => m.LoginComponent)
     },
     {
    path: '**',
    redirectTo: ''
  }
   ]
 }
]