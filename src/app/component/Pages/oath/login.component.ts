import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../core/services/auth.service";

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
 
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadGoogleSignIn();
  }

  loadGoogleSignIn(): void {
    if (typeof google !== 'undefined') {
      this.initializeGoogleSignIn();
    } else {
    
      const checkGoogleLoaded = setInterval(() => {
        if (typeof google !== 'undefined') {
          clearInterval(checkGoogleLoaded);
          this.initializeGoogleSignIn();
        }
      }, 100);
      
     
      setTimeout(() => clearInterval(checkGoogleLoaded), 5000);
    }
  }

  initializeGoogleSignIn(): void {
    google.accounts.id.initialize({
      client_id: '981649586366-fv3d4al1foo7u24bigmuhhhu98uq2fd1.apps.googleusercontent.com',
      callback: (response: any) => this.handleCredentialResponse(response)    
    });
    
    google.accounts.id.renderButton(
      document.getElementById('googleBtn'),
      { theme: 'outline', size: 'large' }
    );
  }

  handleCredentialResponse(response: any): void {
    this.authService.Googlelogin(response.credential).subscribe({
      next: (res) => {
        console.log("Login successful", res);
        console.log("Token:", response.credential);
      },
      error: (err) => {
        console.error("Login failed", err);
      }
    });
  }
}