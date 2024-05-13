import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password-doctor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password-doctor.component.html',
  styleUrls: ['./forgot-password-doctor.component.css'],
})
export class ForgotPasswordDoctorComponent {
  
  isNotValidForm : Boolean = false; 
  apiErrorMessage : string = "";

  constructor(private _authService: AuthService ,
              private _router: Router,
              private _toastr: ToastrService){};

  ForgotPassDoctor: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  ForgotPassword(from: FormGroup) {

    this.isNotValidForm = true;

    if(from.valid)
    {
      const data = {
        email : this.ForgotPassDoctor.value.email,
        role : "DOCTOR"
      };

      // console.log(data);
      this._authService.UserEmail = data.email; 
      
      this._authService.ForgotPassword(data).subscribe({
        next : (res:any) => {
          console.log(res);
          
          // toaster
          this._toastr.success(res.message) 
          
          setTimeout(() => {
            this._toastr.clear()
          },1200)

          setTimeout(() => {
            this._router.navigate(['/VerifyResetCode']);
          }, 1205)
          

        },

        error : (err:any) => {
          console.log(err);
          this.apiErrorMessage=err.error.message;
        }
      })



    }
    else {
      this.isNotValidForm = false;
    }

  }
}
