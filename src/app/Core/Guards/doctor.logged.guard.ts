import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

// Lw Doctor Gwa "Logged"
export const DoctorLoggedGuard: CanActivateFn = (route, state) => {
  let _router = inject(Router);
 
  if(localStorage.getItem("doctorToken")){
    return true;
  }
  else{
    _router.navigate(['/loginDoctor']);
    return false;
  }
};
