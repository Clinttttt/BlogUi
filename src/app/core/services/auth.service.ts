import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = `${environment.apiUrl}/Auth`; 

  private constructor(private http: HttpClient) {}

  Googlelogin(credential: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/GoogleLogin`, {    idToken: credential });
  }

}