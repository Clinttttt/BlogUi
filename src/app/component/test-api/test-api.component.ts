import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsService } from '../services/posts.service';


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
      
     
      @if (loading){
        <div class="loading">
        ⏳ Loading data from API...
      </div>
      }
      
@if (posts.length > 0) {
  <div class="posts-container">
    <h4>📋 Recent Posts ({{ posts.length }}):</h4>

    @for (post of posts; track $index) {
      <div class="post-item">
        <h5>#{{ $index + 1 }}: {{ post.title }}</h5>
        <p>{{ post.content }}</p>
        <small>Created: {{ post.createdAt | date:'medium' }}</small>
      </div>
    }
  </div>
}

      
    
     @if(posts.length == 0 ){
       <div class="no-data">
        📭 No posts found
      </div>
     }
      
   @if(rawResponse){
  
      <div  class="debug">
        <h4>🔧 Raw Response:</h4>
        <pre>{{ rawResponse | json }}</pre>
      </div>
   }
      
   
   @if(error){
       <div  class="error">
        <h4>❌ Error:</h4>
        <p><strong>{{ error.message }}</strong></p>
        <pre>{{ error | json }}</pre>
      </div>
   }
      
     
      <div class="debug-info">
        <h4>🔍 Debug Information:</h4>
        <p>Token exists: {{ debugInfo?.hasToken }}</p>
        <p>Posts loaded: {{ posts.length || 0 }}</p>
        <p>API URL: {{ debugInfo?.apiUrl }}</p>
        <p>Timestamp: {{ debugInfo?.timestamp | date:'medium' }}</p>
      </div>
    </div>
  `,
  
})
export class TestApiComponent {
  posts: any[] = [];  // Store posts array
  rawResponse: any;   // Store raw response
  error: any;
  loading = false;
  debugInfo: any;
  
  constructor(
    private postsService: PostsService,
    private cdr: ChangeDetectorRef,
    // Add this for change detection
  ) {}
  
  testConnection() {
    this.loading = true;
    this.posts = [];
    this.rawResponse = null;
    this.error = null;
    
/*    this.debugInfo = {
      hasToken: !!localStorage.getItem('auth_token'),
      apiUrl: 'https://localhost:7096/api/Posts/GetRecentPost',
      timestamp: new Date()
    };*/
    
    console.log('🔍 Starting API test...', this.debugInfo);
    
    this.postsService.getRecentPost().subscribe({
      next: (data) => {
        console.log('✅ API Success:', data);
        
        this.rawResponse = data;
        
        if (Array.isArray(data)) {
          this.posts = data;
        } else {
        
          this.posts = data.items || data.posts || [data];
        }
        
        this.loading = false;
        
        this.cdr.detectChanges();
        
        console.log('📊 Posts loaded:', this.posts);
      },
      error: (err) => {
        console.error('❌ API Error:', err);
        this.error = err;
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}