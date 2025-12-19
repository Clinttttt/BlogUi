import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="layout">
      <!-- Header/Navigation -->
      <header class="header">
        <nav class="navbar">
          <div class="logo" (click)="navigateTo('/')">
            <h2 >My Blog</h2>
          </div>
          
          <ul class="nav-menu">
            <li>
              <a  (click)="navigateTo('/')" 
                 [class.active]="isActive('/')">
                Home
              </a>
            </li>
            <li>
              <a (click)="navigateTo('/posts')" 
                 [class.active]="isActive('/posts')">
                Posts
              </a>
            </li>
            <li>
              <a (click)="navigateTo('/about')" 
                 [class.active]="isActive('/about')">
                About
              </a>
            </li>
            <li>
              <a (click)="navigateTo('/admin')" 
                 [class.active]="isActive('/admin')">
                Admin
              </a>
            </li>
          </ul>
          
          <div class="nav-actions">
            <button (click)="navigateTo('GoogleAuth')" class="btn-login">
              Login
            </button>
          </div>
        </nav>
      </header>

  
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>

    
      <footer class="footer">
        <p>&copy; 2025 My Blog. All rights reserved.</p>
      </footer>
    </div>
  `,

})
export class MainLayoutComponent {

constructor(private router: Router, private route: ActivatedRoute) {}

  // Navigation method (like NavigationManager in Blazor)
  navigateTo(route: string): void {
    this.router.navigate([route], {relativeTo: this.route});
  }

  // Check if route is active
  isActive(route: string): boolean {
    return this.router.url === route;
  }
}