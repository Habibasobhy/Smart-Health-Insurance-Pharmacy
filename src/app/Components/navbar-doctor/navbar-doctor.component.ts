import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from 'src/app/Core/Services/auth.service';

@Component({
  selector: 'app-navbar-doctor',
  standalone: true,
  imports: [CommonModule ,RouterLink, RouterLinkActive],
  templateUrl: './navbar-doctor.component.html',
  styleUrls: ['./navbar-doctor.component.css']
})
export class NavbarDoctorComponent {

  isLoggedIn : boolean = false;

  constructor(private _authService : AuthService)
  {
    this._authService.doctorData.subscribe((res) =>
    {
      if(this._authService.doctorData.getValue())
        this.isLoggedIn = true;
      else
        this.isLoggedIn = false;
    }
    )
  }

  
  logOut(){
    this._authService.doctorLogout();
  }
}
