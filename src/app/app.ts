import { Component } from '@angular/core';
import { TestApiComponent } from "./component/test-api/test-api.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TestApiComponent],
  template: `
    <div class="container">
      <h1>Blog API Testing</h1>
      <app-test-api></app-test-api>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
  `]
})
export class AppComponent {}