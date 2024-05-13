import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorService } from 'src/app/Core/Services/doctor.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Prescription } from 'src/app/Core/Interfaces/prescription';
import { FormsModule } from '@angular/forms';
import { SearchPrescriptionPipe } from 'src/app/Core/Pipes/search-prescription.pipe';


@Component({
  selector: 'app-prescription-details',
  standalone: true,
  imports: [CommonModule , FormsModule , RouterLink , SearchPrescriptionPipe],
  templateUrl: './prescription-details.component.html',
  styleUrls: ['./prescription-details.component.css']
})
export class PrescriptionDetailsComponent implements OnInit {

  patientId : number = 0;
  searchKey : string = "";
  prescriptionOfPatient : Prescription = {} as Prescription;
  Name : string = "";
  prescriptionId : number = 0;

  constructor(private _doctorService : DoctorService ,
              private _activatedRoute : ActivatedRoute){}


  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((res:any)=>{
      // console.log(res.params.id);
      // & Get Id In Url to pass it a parameter in getProductById(id) Function & //
      this.patientId=res.params.id;
      // console.log(this.patientId);
    })

    // Call Function
    this.GetPrescriptionDetails(this.patientId);
}

data: {} = {};

  GetPrescriptionDetails(patientId : number)
  {
    this._doctorService.ShowPrescription(patientId).subscribe({
      next:(res:any)=>{
        // console.log(res);
        this.prescriptionOfPatient = res;
        this.Name=res?.data?.User?.first_name + " " + res?.data?.User?.last_name;

        this.prescriptionId = res?.data?.id;
        // console.log(this.prescriptionOfPatient);
      },

      error:(err:any)=>{
        console.log(err);
      }
  })
  }


  deleteMedicineForUser(ItemId : number){
    
    this._doctorService.DeleteMedicineForUser(ItemId , this.prescriptionId).subscribe({
      next:(res:any)=>{
        // console.log(res);

        this.GetPrescriptionDetails(this.patientId);
      },

      error:(err:any)=>{
        console.log(err);
      }
  })
  }

}
