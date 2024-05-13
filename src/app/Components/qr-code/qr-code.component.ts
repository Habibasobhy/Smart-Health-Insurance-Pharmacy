import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/Core/Services/patient.service';

@Component({
  selector: 'app-qr-code',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css']
})
export class QrCodeComponent implements OnInit {

  QRCodeSrc : string = "";
  Name : string = "";
  constructor(private _patientService : PatientService , private _router: Router){}

  ngOnInit(): void {
    // Call Method
    this.GetQRCode();
  }

  GetQRCode()
  {
    this._patientService.GetQRCode().subscribe({
      next:(res:any)=>{
        // console.log(res.data);
        this.QRCodeSrc = res.data;
      },

      error:(err:any)=>{
        console.log(err);
      }
  })
  }


}
