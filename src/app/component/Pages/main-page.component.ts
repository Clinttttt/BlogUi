import { Component, ChangeDetectorRef, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PostDto } from '../../core/models/post.model';
import { PostsService } from '../../core/services/posts.service';
import { PagedResult } from '../../core/models/PagedResult.model';
    
@Component({
    selector: 'main-page',
    standalone: true,
    imports: [CommonModule],
    template: `
 
 <h3>Main Page</h3>
 
  @if(loading){
    <div class="loading">
      ⏳ Loading data from API....
    </div>
  }
  @if(posts.length > 0)
    {
     <div> 
        <p>Showing {{posts.length}} of {{totalCount}} Posts</p>
        <p>Page {{currentPage}} of {{totalPages}}</p>
        @for(post of posts; track post.id)
            {
            <div class="post-item">
                <h5>{{post.title}}</h5>
                <p>{{post.content | slice:0:100}}...</p>
            </div>
        }
    </div>
    }
  
  `
})
export class MainPage implements OnInit {
    posts: PostDto[] = [];
    error: any = null;
    loading = false;
    isBrowser: boolean;
    totalCount: number = 0;
    currentPage: number = 1
    pageSize: number = 10;
    totalPages: number = 0;
    
    constructor(
        private postsService: PostsService,
        private cdr: ChangeDetectorRef,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }
    
    ngOnInit(): void {
        if (this.isBrowser) {
            this.GetPostPage(this.currentPage, this.pageSize);
        }
    }
    
    GetPostPage(pageNumber: number, pageSize: number): void {
        this.loading = true;
        this.posts = [];
        this.error = null;
        
        this.postsService.getPostPaged(pageNumber, pageSize).subscribe({
            next: (response: PagedResult<PostDto>) => {
                this.posts = response.items;
                this.totalCount = response.totalCount;
                this.currentPage = response.pageNumber;
                this.pageSize = response.pageSize;
                this.totalPages = response.totalPages;
                this.loading = false;
                this.cdr.markForCheck();
            },
            error: (err) => {
                console.error('Error loading posts:', err);
                this.error = err;
                this.loading = false;
                this.cdr.markForCheck();
            }
        });
    }
}