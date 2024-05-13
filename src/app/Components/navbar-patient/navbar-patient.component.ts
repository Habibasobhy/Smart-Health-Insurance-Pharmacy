import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from 'src/app/Core/Services/auth.service';

@Component({
  selector: 'app-navbar-patient',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './navbar-patient.component.html',
  styleUrls: ['./navbar-patient.component.css']
})
export class NavbarPatientComponent {

  isLoggedIn : boolean = false;
  
  constructor(private _authService : AuthService)
  {
    this._authService.PatientData.subscribe((res) =>
    {
      if(this._authService.PatientData.getValue())
        this.isLoggedIn = true;
      else
        this.isLoggedIn = false;
    }
    )
  }

  logOut(){
    this._authService.patientLogout();
  }

}
