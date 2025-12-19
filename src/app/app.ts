// app.component.ts - REPLACE THIS ENTIRE FILE
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';  // ← Add this import
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],  
  template: `
    <div class="container">
      <h1>My Blog Application</h1>
      <!-- Navigation (optional) -->
      <nav>
        <a routerLink="/">Home</a>
        <a routerLink="/test-api">Test API</a>
      </nav>
      
      <!-- This will display your MainPage component -->
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    
    nav {
      margin: 20px 0;
      padding: 10px;
      background: #f5f5f5;
      border-radius: 5px;
    }
    
    nav a {
      margin-right: 15px;
      text-decoration: none;
      color: #333;
      font-weight: 500;
    }
    
    nav a:hover {
      color: #007bff;
    }
  `]
})
export class AppComponent {}