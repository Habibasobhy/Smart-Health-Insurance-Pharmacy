import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorLoggedGuard } from './Core/Guards/doctor.logged.guard';
import { DoctorLogoutGuard } from './Core/Guards/doctor.logout.guard';
import { patientLoggedGuardGuard } from './Core/Guards/patient-logged-guard.guard';
import { patientLogoutGuardGuard } from './Core/Guards/patient-logout-guard.guard';

const routes: Routes = [
  // First Page In Website
  { path: '', redirectTo: 'modes', pathMatch: 'full' },
  {
    path: 'modes',
    canActivate: [patientLogoutGuardGuard, DoctorLogoutGuard],
    loadComponent: () =>
      import('./Components/modes/modes.component').then(
        (m) => m.ModesComponent
      ),
    title: 'Mode Layout',
  },

  {
    path: '',
    loadComponent: () =>
      import('./Layouts/patient-layout/patient-layout.component').then(
        (m) => m.PatientLayoutComponent
      ),
    children: [
      {
        path: 'loginPatient',
        canActivate: [patientLogoutGuardGuard, DoctorLogoutGuard],
        loadComponent: () =>
          import('./Components/login-patient/login-patient.component').then(
            (m) => m.LoginPatientComponent
          ),
        title: 'Login',
      },
      {
        path: 'patientHome',
        canActivate: [patientLoggedGuardGuard],
        loadComponent: () =>
          import('./Components/patient-home/patient-home.component').then(
            (m) => m.PatientHomeComponent
          ),
        title: 'Home',
      },
      {
        path: 'Qr-code',
        canActivate: [patientLoggedGuardGuard],
        loadComponent: () =>
          import('./Components/qr-code/qr-code.component').then(
            (m) => m.QrCodeComponent
          ),
        title: 'Qr Code',
      },
      {
        path: 'forgotPasswordPatient',
        canActivate: [patientLogoutGuardGuard],
        loadComponent: () =>
          import(
            './Components/forgot-password-patient/forgot-password-patient.component'
          ).then((m) => m.ForgotPasswordPatientComponent),
        title: 'Forgot Password Patient',
      },
      {
        path: 'PatientMedicineDetails/:id',
        canActivate: [patientLoggedGuardGuard],
        loadComponent: () =>
          import(
            './Components/medicine-details/medicine-details.component'
          ).then((m) => m.MedicineDetailsComponent),
        title: 'Medicine Details',
      },
      {
        path: 'VerifyCode',
        canActivate: [patientLogoutGuardGuard],
        loadComponent: () =>
          import(
            './Components/verify-code-patient/verify-code-patient.component'
          ).then((m) => m.VerifyCodePatientComponent),
        title: 'Verify Reset Code',
      },
      {
        path: 'ResetPasswordPatient',
        canActivate: [patientLogoutGuardGuard],
        loadComponent: () =>
          import(
            './Components/reset-password-patient/reset-password-patient.component'
          ).then((m) => m.ResetPasswordPatientComponent),
        title: 'Reset Password',
      },
      {
        path: 'ChangePasswordPatient',
        canActivate: [patientLoggedGuardGuard],
        loadComponent: () =>
          import('./Components/change-password/change-password.component').then(
            (m) => m.ChangePasswordComponent
          ),
        title: 'Change Password',
      },
    ],
  },

  {
    path: '',
    loadComponent: () =>
      import('./Layouts/doctor-layout/doctor-layout.component').then(
        (m) => m.DoctorLayoutComponent
      ),
    children: [
      {
        path: 'loginDoctor',
        canActivate: [patientLogoutGuardGuard, DoctorLogoutGuard],
        loadComponent: () =>
          import('./Components/login-doctor/login-doctor.component').then(
            (m) => m.LoginDoctorComponent
          ),
        title: 'Login',
      },
      {
        path: 'doctorHome',
        canActivate: [patientLogoutGuardGuard, DoctorLoggedGuard],
        loadComponent: () =>
          import('./Components/doctor-home/doctor-home.component').then(
            (m) => m.DoctorHomeComponent
          ),
        title: 'Home',
      },
      {
        path: 'patientRegister',
        canActivate: [patientLogoutGuardGuard, DoctorLoggedGuard],
        loadComponent: () =>
          import(
            './Components/patient-register/patient-register.component'
          ).then((m) => m.PatientRegisterComponent),
        title: 'Patient Register',
      },
      {
        path: 'medicines',
        canActivate: [patientLogoutGuardGuard, DoctorLoggedGuard],
        loadComponent: () =>
          import(
            './Components/medicines/medicines.component'
          ).then((m) => m.MedicinesComponent),
        title: 'Medicines',
      },
      {
        path: 'AddMedicine',
        canActivate: [patientLogoutGuardGuard, DoctorLoggedGuard],
        loadComponent: () =>
          import(
            './Components/add-medicine/add-medicine.component'
          ).then((m) => m.AddMedicineComponent),
        title: 'Add Medicine',
      },
      {
        path: 'UpdateMedicine/:id',
        canActivate: [patientLogoutGuardGuard, DoctorLoggedGuard],
        loadComponent: () =>
          import(
            './Components/update-medicine/update-medicine.component'
          ).then((m) => m.UpdateMedicineComponent),
        title: 'Update Medicine',
      },
      {
        path: 'forgotPasswordDoctor',
        canActivate: [patientLogoutGuardGuard, DoctorLogoutGuard],
        loadComponent: () =>
          import(
            './Components/forgot-password-doctor/forgot-password-doctor.component'
          ).then((m) => m.ForgotPasswordDoctorComponent),
        title: 'Forgot Password Doctor',
      },
      {
        path: 'VerifyResetCode',
        canActivate: [patientLogoutGuardGuard, DoctorLogoutGuard],
        loadComponent: () =>
          import('./Components/verify-code-Doctor/verify-code.component').then(
            (m) => m.VerifyCodeComponent
          ),
        title: 'Verify Reset Code',
      },
      {
        path: 'ResetPassword',
        canActivate: [patientLogoutGuardGuard, DoctorLogoutGuard],
        loadComponent: () =>
          import(
            './Components/reset-password-doctor/reset-password-doctor.component'
          ).then((m) => m.ResetPasswordDoctorComponent),
        title: 'Reset Password',
      },
      {
        path: 'ChangePasswordDoctor',
        canActivate: [patientLogoutGuardGuard, DoctorLoggedGuard],
        loadComponent: () =>
          import('./Components/change-password/change-password.component').then(
            (m) => m.ChangePasswordComponent
          ),
        title: 'Change Password',
      },
      {
        path: 'prescriptionDetails/:id',
        canActivate: [patientLogoutGuardGuard, DoctorLoggedGuard],
        loadComponent: () =>
          import(
            './Components/prescription-details/prescription-details.component'
          ).then((m) => m.PrescriptionDetailsComponent),
        title: 'Prescription Details',
      },
      {
        path: 'DoctorMedicineDetails/:id',
        canActivate: [patientLogoutGuardGuard, DoctorLoggedGuard],
        loadComponent: () =>
          import(
            './Components/doctor-medicine-details/doctor-medicine-details.component'
          ).then((m) => m.DoctorMedicineDetailsComponent),
        title: 'Medicine Details',
      },
      {
        path: 'AddPrescription/:id',
        canActivate: [patientLogoutGuardGuard, DoctorLoggedGuard],
        loadComponent: () =>
          import(
            './Components/add-prescription/add-prescription.component'
          ).then((m) => m.AddPrescriptionComponent),
        title: 'Add Prescription',
      },
    ],
  },

  // Not Found Page

  {
    path: '**',
    loadComponent: () =>
      import('./Components/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
    title: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
