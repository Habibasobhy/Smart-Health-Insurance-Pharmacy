import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

// Lw Doctor Brra "Not Logged"
export const DoctorLogoutGuard: CanActivateFn = (route, state) => {

  let _router = inject(Router);
 
  if(localStorage.getItem("doctorToken")){
    _router.navigate(['/doctorHome'])
    return false;
  }
  else{
    return true;
  }
};
