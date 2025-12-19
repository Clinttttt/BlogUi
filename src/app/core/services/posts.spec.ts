import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private baseUrl = `${environment.apiUrl}/Posts`;

  constructor(private http: HttpClient) {}

  // ==========================
  // GET (AllowAnonymous)
  // ==========================

  getPost(id: number) {
    return this.http.get(`${this.baseUrl}/GetPost`, {
      params: { id }
    });
  }

  getRecentPost() {
    return this.http.get(`${this.baseUrl}/GetRecentPost`);
  }

  getPostPaged(page: number, pageSize: number) {
    const params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize);

    return this.http.get(`${this.baseUrl}/GetPostPaged`, { params });
  }

  getPostByTag(tag: string) {
    return this.http.get(`${this.baseUrl}/GetPostByTag`, {
      params: { tag }
    });
  }

  // ==========================
  // AUTH REQUIRED
  // ==========================

  getAllPost() {
    return this.http.get(`${this.baseUrl}/GetAllPost`);
  }

  createPost(payload: any) {
    return this.http.post(`${this.baseUrl}/CreatePosts`, payload);
  }

  updatePost(payload: any) {
    return this.http.patch(`${this.baseUrl}/UpdatePost`, payload);
  }

  deletePost(postId: number) {
    return this.http.delete(`${this.baseUrl}/DeletePost`, {
      params: { postId }
    });
  }

  archivePost(postId: number) {
    return this.http.patch(`${this.baseUrl}/ArchivedPost`, null, {
      params: { postId }
    });
  }

  likePost(postId: number) {
    return this.http.get(`${this.baseUrl}/PostLike`, {
      params: { postId }
    });
  }

  addTagsToPost(payload: any) {
    return this.http.post(`${this.baseUrl}/AddTagTopost`, payload);
  }

  // ==========================
  // COMMENTS
  // ==========================

  createComment(payload: any) {
    return this.http.post(`${this.baseUrl}/CreateComment`, payload);
  }

  updateComment(payload: any) {
    return this.http.patch(`${this.baseUrl}/UpdateComment`, payload);
  }
}
