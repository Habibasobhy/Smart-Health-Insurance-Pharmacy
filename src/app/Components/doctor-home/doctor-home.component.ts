import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllPatientsComponent } from '../all-patients/all-patients.component';

@Component({
  selector: 'app-doctor-home',
  standalone: true,
  imports: [CommonModule , AllPatientsComponent],
  templateUrl: './doctor-home.component.html',
  styleUrls: ['./doctor-home.component.css']
})
export class DoctorHomeComponent {


}

