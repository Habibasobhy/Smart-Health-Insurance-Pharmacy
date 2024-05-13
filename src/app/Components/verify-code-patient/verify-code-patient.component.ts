import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verify-code-patient',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule],
  templateUrl: './verify-code-patient.component.html',
  styleUrls: ['./verify-code-patient.component.css']
})

export class VerifyCodePatientComponent {
  
  isNotValidForm : Boolean = false; 
  apiErrorMessage : string = "";

  constructor(private _authService: AuthService ,
              private _router: Router,
              private _toastr: ToastrService){};

  VerifyCodePatient: FormGroup = new FormGroup({
    code: new FormControl('', [Validators.required, Validators.pattern(/^\d{6}$/)])
  });

  VerifyCode(from: FormGroup) {

    this.isNotValidForm = true;

    if(from.valid)
    {
      const data = {
        email : this._authService.UserEmail,
        code : this.VerifyCodePatient.value.code,
        role : "PATIENT"
      };

      console.log(data);

      this._authService.VerifyResetCode(data).subscribe({
        next : (res:any) => {
          console.log(res);

          // toaster
          this._toastr.success(res.message) 
          
          setTimeout(() => {
            this._toastr.clear()
          },1200)

          setTimeout(() => {
            this._router.navigate(['/ResetPasswordPatient']);
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


