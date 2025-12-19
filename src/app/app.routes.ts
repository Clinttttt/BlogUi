import { Routes } from '@angular/router';

export const routes: Routes = [
   {path: '', loadComponent: () => import('./Pages/main-page').then(m => m.MainPage)},

];
