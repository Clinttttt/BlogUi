import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PagedResult } from '../models/PagedResult.model';
import  { PostDto } from '../models/post.model';


@Injectable({ providedIn: 'root' })
export class PostsService {
  private baseUrl = `${environment.apiUrl}/Posts`;
  
  constructor(private http: HttpClient) {}

  // ==========================
  // PUBLIC ENDPOINTS (AllowAnonymous)
  // ==========================
  
  getPost(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/GetPost`, {
      params: { id: id.toString() }
    });
  }

  getRecentPost(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/GetRecentPost`);
  }
  getPostPaged(page: number, pageSize: number): Observable<PagedResult<PostDto>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<PagedResult<PostDto>>(`${this.baseUrl}/GetPostPaged`, { params });
  }

  getPostByTag(tag: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/GetPostByTag`, null, {
      params: { tag }
    });
  }

  // ==========================
  // PROTECTED ENDPOINTS (Authorize)
  // ==========================
  
  createPost(payload: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/CreatePosts`, payload);
  }

  updatePost(payload: any): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/UpdatePost`, payload);
  }

  deletePost(postId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/DeletePost`, {
      params: { postId: postId.toString() }
    });
  }

  archivePost(postId: number): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/ArchivedPost`, null, {
      params: { postId: postId.toString() }
    });
  }

  getAllPosts(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/GetAllPost`);
  }

  createComment(payload: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/CreateComment`, payload);
  }

  updateComment(payload: any): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/UpdateComment`, payload);
  }

  likePost(postId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/PostLike`, {
      params: { postId: postId.toString() }
    });
  }

  addTagsToPost(payload: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/AddTagTopost`, payload);
  }
}


