import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DoctorService } from 'src/app/Core/Services/doctor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SearchMedicinePipe } from 'src/app/Core/Pipes/search-medicine.pipe';
import { RouterModule , Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-add-prescription',
  standalone: true,
  imports: [CommonModule , FormsModule , MatListModule , ReactiveFormsModule , SearchMedicinePipe , CarouselModule],
  templateUrl: './add-prescription.component.html',
  styleUrls: ['./add-prescription.component.css']
})

export class AddPrescriptionComponent implements OnInit {

  isNotValidForm : boolean = false;
  patientId : number = 0;
  Medicines : any = [];
  searchKey : string = "";


  constructor(private _doctorService : DoctorService ,
              private _activatedRoute : ActivatedRoute ,
              private _toastr : ToastrService,
              private _router : Router){}


    // Form
    addModifyPrescription : FormGroup = new FormGroup({
      items : new FormControl([] , Validators.required)
    })

  ngOnInit(): void {

    this._activatedRoute.paramMap.subscribe((res:any)=>{

      // console.log(res.params.id);
      // & Get Id In Url to pass it a parameter in getProductById(id) Function & //

      this.patientId = res.params.id;
      // console.log(this.patientId);
    })

    this.getAllMedicines();
  }

  getAllMedicines(){
    this._doctorService.GetAllMedicines().subscribe({
      next : (res:any) => {
        console.log(res);
        this.Medicines = res.data;
      },
      error : (err:any) => {
        console.log(err);
      }
    })
  }

  AddModifyPrescription(form : FormGroup){

    console.log(form);

    if(form.valid == true){

      this.isNotValidForm = false;

      const data = {
        description : "you are sick",
        userId : Number(this.patientId),
        items : this.addModifyPrescription.value.items
      };


      console.log(data);


      this._doctorService.AddModifyPrescription(data).subscribe({
        next : (res:any) => {
          console.log(res);

          // toaster
          this._toastr.success(res.message);

          setTimeout(() => {
            this._toastr.clear()
          },1200)

          this._router.navigate([`prescriptionDetails/${this.patientId}`]);

        },
        error : (err:any) => {
          console.log(err);
        }
      })
    }
    else{
      this.isNotValidForm = true;
    }
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoplay : true,
    autoplayTimeout : 1500,
    margin : 7,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
}
