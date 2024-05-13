import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})

export class ChangePasswordComponent {
  
  isNotValidForm : Boolean = false; 
  apiErrorMessage : string = "";
  hideOldPassword: boolean = true;
  hideNewPassword: boolean = true;

  constructor(private _authService: AuthService ,
              private _router: Router,
              private _toastr: ToastrService){};

  ChangePassword: FormGroup = new FormGroup({
    oldPassword : new FormControl('', [Validators.required , Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]),
    newPassword : new FormControl('', [Validators.required , Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]),
  });

  ChangePass(form:FormGroup) {

    this.isNotValidForm = true;

    if(form.valid)
    {
      this._authService.ChangePassword(form.value).subscribe({
        next : (res:any) => {
          console.log(res);

          
          // toaster
          this._toastr.success(res.message) 
          
          setTimeout(() => {
            this._toastr.clear()
          },1200)
          
          
          if(localStorage.getItem("patientToken")){
            setTimeout(() => {
              this._router.navigate(['/patientHome']);
            }, 1205)
          }
          else{
            setTimeout(() => {
              this._router.navigate(['/doctorHome']);
            }, 1205)
            
          }
        
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

  toggleOldPasswordVisibility(): void {
    this.hideOldPassword = !this.hideOldPassword;
  }

  toggleNewPasswordVisibility(): void {
    this.hideNewPassword = !this.hideNewPassword;
  }
}



