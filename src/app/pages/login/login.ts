import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../core/services/auth/auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly authService = inject(Auth);
  private readonly router = inject(Router);

  successMSG: string = '';
  errorMSG: string = '';
  isLoading: boolean = false

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]\w{6,}$/)]),
  })

  submitLoginForm(): void{

    if(this.loginForm.valid){
      this.isLoading=true;
    
    this.authService.sendLoginData(this.loginForm.value).subscribe({
      next: (res)=>{
        this.isLoading= false
        if(res.msg === 'done'){
          localStorage.setItem('userToken', res.token)
          this.loginForm.reset();
          this.authService.saveUserToken();
          setTimeout(()=>{
            this.router.navigate(['/home'])
          },600)
          
          this.successMSG= res.msg;
          
        }
      },
      error: (err:HttpErrorResponse)=>{
        console.log(err);
        this.errorMSG= err.error.msg;
        this.isLoading= false
      }
    })
    }else{
      this.loginForm.markAllAsTouched
    }
  }
}
