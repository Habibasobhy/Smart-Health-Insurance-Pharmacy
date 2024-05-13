import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorService } from 'src/app/Core/Services/doctor.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Medicine } from 'src/app/Core/Interfaces/medicine';
import { SearchMedicinePipe } from 'src/app/Core/Pipes/search-medicine.pipe';

@Component({
  selector: 'app-medicines',
  standalone: true,
  imports: [CommonModule , FormsModule , RouterLink , SearchMedicinePipe],
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.css']
})
export class MedicinesComponent implements OnInit{

  Medicines : Medicine[] = [];
  searchKey : string = "";

  constructor(private _doctorService: DoctorService) {
    
  }

  ngOnInit(): void {
    this.GetAllMedicines();
  }

  GetAllMedicines(){
    this._doctorService.GetAllMedicines().subscribe({
      next:(res:any)=>{
        console.log(res);

        this.Medicines = res.data;
        console.log(this.Medicines);
        
      },

      error:(err:any)=>{
        console.log(err);
      }
  })
  }

  DeleteMedicineDB(MedicineId : number){
    this._doctorService.DeleteMedicinePermanently(MedicineId).subscribe({
      next:(res:any)=>{
        // console.log(res);

        this.GetAllMedicines();
      },

      error:(err:any)=>{
        console.log(err);
      }
    })
  }


  // UpdateMedicineDB(MedicineId : number){
  //   this._doctorService.UpdateMedicineDB(MedicineId).subscribe({
  //     next:(res:any)=>{
  //       // console.log(res);

  //       this.GetAllMedicines();
  //     },

  //     error:(err:any)=>{
  //       console.log(err);
  //     }
  //   })
  // }

}
