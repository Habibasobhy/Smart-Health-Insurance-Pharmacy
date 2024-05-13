import { NavbarPatientComponent } from './../../Components/navbar-patient/navbar-patient.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-patient-layout',
  standalone: true,
  imports: [CommonModule,RouterOutlet,NavbarPatientComponent],
  templateUrl: './patient-layout.component.html',
  styleUrls: ['./patient-layout.component.css']
})
export class PatientLayoutComponent {

}
