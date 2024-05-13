import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

// Lw Patient Gwa "Logged"
export const patientLoggedGuardGuard: CanActivateFn = (route, state) => {
  let _router = inject(Router);
 
  if(localStorage.getItem("patientToken")){
    return true;
  }
  else{
    _router.navigate(['/loginPatient']);
    return false;
  }
};
