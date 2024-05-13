import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarDoctorComponent } from 'src/app/Components/navbar-doctor/navbar-doctor.component';

@Component({
  selector: 'app-doctor-layout',
  standalone: true,
  imports: [CommonModule , RouterOutlet , NavbarDoctorComponent],
  templateUrl: './doctor-layout.component.html',
  styleUrls: ['./doctor-layout.component.css']
})
export class DoctorLayoutComponent {

}
