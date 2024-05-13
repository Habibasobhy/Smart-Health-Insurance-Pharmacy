import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

// Lw Patient Brra "Not Logged"
export const patientLogoutGuardGuard: CanActivateFn = (route, state) => {
  let _router = inject(Router);
 
  if(localStorage.getItem("patientToken")){
    _router.navigate(['/patientHome'])
    return false;
  }
  else{
    return true;
  }
};
