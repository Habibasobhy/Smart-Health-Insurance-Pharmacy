import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Patient } from 'src/app/Core/Interfaces/patient';
import { DoctorService } from 'src/app/Core/Services/doctor.service';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from 'src/app/Core/Pipes/search.pipe';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-patients',
  standalone: true,
  imports: [CommonModule , FormsModule , SearchPipe , RouterLink],
  templateUrl: './all-patients.component.html',
  styleUrls: ['./all-patients.component.css']
})
export class AllPatientsComponent implements OnInit {

  allPatients : Patient[] = [];
  searchKey : string = "";

  constructor(private _doctorService : DoctorService , private _router: Router){}

  ngOnInit(): void {
    // Call Method
      this.GetAllPatients();
  }


  GetAllPatients()
  {
    this._doctorService.GetAllPatients().subscribe({
      next:(res:any)=>{
        // console.log(res);
        this.allPatients = res.data;
        // console.log(this.allPatients);
      },

      error:(err:any)=>{
        console.log(err);
      }
  })
  }

  deletePatient(patientId : number)
  {
    this._doctorService.deletePatient(patientId).subscribe({
      next: (res:any)=>{
        // console.log(res);
        this.GetAllPatients();
      },

      error:(err:any)=>{
        console.log(err);
      }
    })
  }
}
