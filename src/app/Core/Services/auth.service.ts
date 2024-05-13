import { Patient } from './../Interfaces/patient';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  UserEmail: string = '';
  doctorData: BehaviorSubject<any> = new BehaviorSubject('');
  PatientData: BehaviorSubject<any> = new BehaviorSubject('');

  baseUrl: string = 'https://medical-system-yuw6.onrender.com/api/auth/';

  constructor(private _httpClient: HttpClient, private _router: Router) {
    if (localStorage.getItem('doctorToken')) this.getDoctorToken();

    if (localStorage.getItem('patientToken')) this.getPatientToken();
  }

  getDoctorToken() {
    let EncodedToken = JSON.stringify(localStorage.getItem('doctorToken'));
    let encoded = jwtDecode(EncodedToken);

    this.doctorData.next(encoded);
  }

  getPatientToken() {
    let EncodedToken = JSON.stringify(localStorage.getItem('patientToken'));
    let encoded = jwtDecode(EncodedToken);

    this.PatientData.next(encoded);
  }

  login(loginData: any): Observable<any> {
    return this._httpClient.post(this.baseUrl + 'Login', loginData);
  }

  register(registerData: any): Observable<any> {
    return this._httpClient.post(this.baseUrl + 'signup', registerData);
  }

  patientLogout() {
    localStorage.removeItem('patientToken');
    this.PatientData.next(null);
    this._router.navigate(['/loginPatient']);
  }

  doctorLogout() {
    localStorage.removeItem('doctorToken');
    this.doctorData.next(null);
    this._router.navigate(['/loginDoctor']);
  }

  ForgotPassword(data: any): Observable<any> {
    return this._httpClient.post(this.baseUrl + 'forget-password', data);
  }

  VerifyResetCode(data: any): Observable<any> {
    return this._httpClient.post(this.baseUrl + 'verify-reset-code', data);
  }

  ResetPassword(data: any): Observable<any> {
    return this._httpClient.post(this.baseUrl + 'reset-password', data);
  }

  ChangePassword(data: any): Observable<any> {
    if (localStorage.getItem('doctorToken')) {
      return this._httpClient.put(this.baseUrl + 'change-password', data, {
        headers: {
          Authorization: `${localStorage.getItem('doctorToken')}`,
        },
      });
    } else {
      return this._httpClient.put(this.baseUrl + 'change-password', data, {
        headers: {
          Authorization: `${localStorage.getItem('patientToken')}`,
        },
      });
    }
  }
}
