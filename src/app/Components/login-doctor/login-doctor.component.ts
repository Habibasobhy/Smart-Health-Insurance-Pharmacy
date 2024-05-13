import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-doctor',
  standalone: true,
  imports: [ CommonModule , ReactiveFormsModule ,RouterLink],
  templateUrl: './login-doctor.component.html',
  styleUrls: ['./login-doctor.component.css']
})
export class LoginDoctorComponent {

  isNotValidForm : boolean = false;
  validInput : boolean = false;
  apiErrorMessage : string = "";
  hidePassword: boolean = true;

  constructor(private _authService : AuthService ,
              private _router : Router){}


  loginDoctor : FormGroup = new FormGroup({
    email : new FormControl('',[Validators.required , Validators.email]),
    password : new FormControl('', [Validators.required , Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]),
  })


  login(form:FormGroup){
    console.log(form);

    if(form.valid == true){

      this.isNotValidForm = false;

      const data = {
        email : this.loginDoctor.value.email,
        password : this.loginDoctor.value.password,
        role : "DOCTOR"
      };

      this._authService.login(data).subscribe({
        next:(res:any)=>{
          console.log(res);

          localStorage.setItem("doctorToken" , res.data.token)
          this._authService.getDoctorToken();

          this._router.navigate(['/doctorHome']);
        },

        error:(err:any)=>{
          console.log(err);
          this.apiErrorMessage=err.error.message;
        }
      })
      // console.log(data);
    }

    else{
      this.isNotValidForm = true;
    }
  }
  
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
  
}
