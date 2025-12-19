import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app'; 
import { provideHttpClient } from '@angular/common/http'; // ← Remove withInterceptorsFromDi
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes) // ← Add your routes here

  ]
}).catch(err => console.error(err));