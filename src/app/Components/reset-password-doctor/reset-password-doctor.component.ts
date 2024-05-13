import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password-doctor',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule],
  templateUrl: './reset-password-doctor.component.html',
  styleUrls: ['./reset-password-doctor.component.css']
})

export class ResetPasswordDoctorComponent {
  
  isNotValidForm : Boolean = false; 
  apiErrorMessage : string = "";
  hidePassword: boolean = true;

  constructor(private _authService: AuthService ,
              private _router: Router,
              private _toastr: ToastrService){};

  ResetPasswordDoctor: FormGroup = new FormGroup({
    password : new FormControl('', [Validators.required , Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]),
  });

  ResetPassword(from: FormGroup) {

    this.isNotValidForm = true;

    if(from.valid)
    {
      const data = {
        email : this._authService.UserEmail,
        password : this.ResetPasswordDoctor.value.password,
        role : "DOCTOR"
      };

      console.log(data);

      this._authService.ResetPassword(data).subscribe({
        next : (res:any) => {
          console.log(res);

          // toaster
          this._toastr.success(res.message) 
          
          setTimeout(() => {
            this._toastr.clear()
          },1200)

          setTimeout(() => {
            this._router.navigate(['/loginDoctor']);
          }, 1205)

        },

        error : (err:any) => {
          // console.log(err);
          this.apiErrorMessage=err.error.message;
        }
      })
    }
    else {
      this.isNotValidForm = false;
    }
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}


