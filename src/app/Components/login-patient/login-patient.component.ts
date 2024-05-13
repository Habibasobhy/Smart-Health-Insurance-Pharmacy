import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-patient',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login-patient.component.html',
  styleUrls: ['./login-patient.component.css'],
})
export class LoginPatientComponent {
  isNotValidForm: boolean = false;
  validInput: boolean = false;
  apiErrorMessage: string = '';
  hidePassword: boolean = true;

  constructor(private _authService: AuthService, private _Router: Router) {}

  loginPatient: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
    ]),
  });

  login(form: FormGroup) {
    // console.log(form);

    if (form.valid == true) {
      this.isNotValidForm = false;

      const data = {
        email: this.loginPatient.value.email,
        password: this.loginPatient.value.password,
        role: 'PATIENT',
      };

      this._authService.login(data).subscribe({
        next: (res: any) => {
          console.log(res);

          localStorage.setItem('patientToken', res.data.token);
          this._authService.getPatientToken();

          this._Router.navigate(['/patientHome']);
        },

        error: (err: any) => {
          console.log(err);
          this.apiErrorMessage = err.error.message;
        },
      });
    } else {
      this.isNotValidForm = true;
    }
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}
