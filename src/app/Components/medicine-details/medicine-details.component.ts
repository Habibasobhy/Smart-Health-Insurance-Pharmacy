import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorService } from 'src/app/Core/Services/doctor.service';
import { ActivatedRoute} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Medicine } from 'src/app/Core/Interfaces/medicine';

@Component({
  selector: 'app-medicine-details',
  standalone: true,
  imports: [CommonModule , FormsModule],
  templateUrl: './medicine-details.component.html',
  styleUrls: ['./medicine-details.component.css']
})
export class MedicineDetailsComponent implements OnInit{

  medicineId : number = 0;
  medicineDetails : Medicine = {} as Medicine;

  constructor(private _doctorService : DoctorService ,
    private _activatedRoute : ActivatedRoute){}


    ngOnInit(): void {

      this._activatedRoute.paramMap.subscribe((res:any)=>{
        // console.log(res.params.id);
        // & Get Id In Url & //
        this.medicineId = res.params.id;
      })
        this.MedicineDetails(this.medicineId);
    }



  MedicineDetails(MedicineId : number){
    this._doctorService.MedicineDetails(MedicineId).subscribe({
      next:(res:any)=>{
        // console.log(res);

        this.medicineDetails = res.data;

        console.log(this.medicineDetails);
      },

      error:(err:any)=>{
        console.log(err);
      }
  })
  }


}
