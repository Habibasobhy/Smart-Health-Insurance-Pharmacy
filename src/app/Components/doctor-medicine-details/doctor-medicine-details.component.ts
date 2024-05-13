import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicineDetailsComponent } from '../medicine-details/medicine-details.component';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-doctor-medicine-details',
  standalone: true,
  imports: [CommonModule , MedicineDetailsComponent , RouterLink],
  templateUrl: './doctor-medicine-details.component.html',
  styleUrls: ['./doctor-medicine-details.component.css']
})
export class DoctorMedicineDetailsComponent implements OnInit {

  medicineId : number = 0;

  constructor(private _activatedRoute : ActivatedRoute){}

  ngOnInit(): void {

    this._activatedRoute.paramMap.subscribe((res:any)=>{
      // console.log(res.params.id);
      // & Get Id In Url & //
      this.medicineId = res.params.id;
    })
  }
}
