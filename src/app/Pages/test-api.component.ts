import { Component, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PostsService } from '../core/services/posts.service';

@Component({
  selector: 'app-test-api',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="test-container">
      <h3>API Connection Test</h3>
      <button (click)="testConnection()" [disabled]="loading">
        {{ loading ? 'Testing...' : 'Test API Connection' }}
      </button>
      
    @if(loading ){
        <div  class="loading">
        ⏳ Loading data from API...
      </div>
    }
      
    @if(loading === false && posts.length > 0) {

        <div class="posts-container">
        <h4>📋 Recent Posts ({{ posts.length }}):</h4>
        <div *ngFor="let post of posts; let i = index" class="post-item">
          <h5>#{{ i + 1 }}: {{ post.title }}</h5>
          <p>{{ post.content }}</p>
          <small>Created: {{ post.createdAt | date:'medium' }}</small>
        </div>
      </div>
    }
      
    @if(loading === false && posts.length === 0 && !error) {
  <div  class="no-data">
        📭 No posts found
      </div>
    }
    
      @if(error)
        {

  <div  class="error">
        <h4>❌ Error:</h4>
        <p><strong>{{ error.message }}</strong></p>
      </div>
      }
    </div>
  `
})
export class TestApiComponent {
  posts: any[] = [];
  error: any = null;
  loading = false;
  isBrowser: boolean;
  
  constructor(
    private postsService: PostsService,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  
  testConnection() {

    this.loading = true;
    this.posts = [];
    this.error = null;
    
    this.cdr.markForCheck();
    
    this.postsService.getRecentPost().subscribe({
      next: (data) => {
        
        if (Array.isArray(data)) {
          this.posts = [...data];
        } else if (data && data.items) {
          this.posts = [...data.items];
        } else if (data) {
          this.posts = [data];
        }
        
        this.loading = false;
        this.cdr.markForCheck();
        this.cdr.detectChanges();
        
        setTimeout(() => {
          this.cdr.detectChanges();
   
        }, 0);
      },
      error: (err) => {
        console.error('❌ API Error:', err);
        this.error = {
          message: err.message || 'Unknown error occurred',
          status: err.status,
          details: err
        };
        this.loading = false;
        this.cdr.detectChanges();
      },
      complete: () => {
      }
    });
  }
}