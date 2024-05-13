import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientService } from 'src/app/Core/Services/patient.service';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Prescription } from 'src/app/Core/Interfaces/prescription';
import { FormsModule } from '@angular/forms';
import { SearchPrescriptionPipe } from 'src/app/Core/Pipes/search-prescription.pipe';

@Component({
  selector: 'app-my-prescription',
  standalone: true,
  imports: [CommonModule , FormsModule , RouterLink , SearchPrescriptionPipe],
  templateUrl: './my-prescription.component.html',
  styleUrls: ['./my-prescription.component.css']
})
export class MyPrescriptionComponent implements OnInit{

  searchKey : string = "";
  prescriptionOfPatient : Prescription = {} as Prescription;

  constructor(private _patientService : PatientService ,
              private _router : Router){}

  ngOnInit(): void {
      this.GetMyPrescription();
  }

  GetMyPrescription(){

    this._patientService.MyPrescription().subscribe({
      next : (res : any) => {

        console.log(res);
        
        this.prescriptionOfPatient = res;

      },
      error : (err : any) => {
        console.log(err);
        
      }
    })
  }

}
