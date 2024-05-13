import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyPrescriptionComponent } from '../my-prescription/my-prescription.component';

@Component({
  selector: 'app-patient-home',
  standalone: true,
  imports: [CommonModule , MyPrescriptionComponent],
  templateUrl: './patient-home.component.html',
  styleUrls: ['./patient-home.component.css']
})
export class PatientHomeComponent {

}
