import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-patient-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
  templateUrl: './patient-register.component.html',
  styleUrls: ['./patient-register.component.css']
})
export class PatientRegisterComponent {

  isNotValidForm:boolean = false;
  validInput:boolean = false;
  apiErrorMessage:string = "";
  hidePassword: boolean = true;

  constructor(private _authService : AuthService , private _toastr: ToastrService){}


  registerPatient : FormGroup = new FormGroup({
    first_name : new FormControl('',[Validators.required , Validators.minLength(3),Validators.maxLength(15)]),
    last_name : new FormControl('',[Validators.required , Validators.minLength(3),Validators.maxLength(15)]),
    email : new FormControl('',[Validators.required , Validators.email]),
    password : new FormControl('', [Validators.required , Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]),
    gender : new FormControl('', Validators.required),
    job : new FormControl('',[Validators.required , Validators.minLength(3),Validators.maxLength(20)]),
    national_id : new FormControl('' , [Validators.required , Validators.pattern(/^\d{14}$/)] ),
    phone : new FormControl('',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
    address : new FormGroup ({
      city : new FormControl('',[Validators.required , Validators.minLength(3),Validators.maxLength(15)]),
      street : new FormControl('',[Validators.required , Validators.minLength(3),Validators.maxLength(50)]),
      buliding : new FormControl('',[Validators.required ,Validators.maxLength(50)]),
      apartment : new FormControl('',[Validators.required,Validators.maxLength(15)])
    })


  })

  Register(form:FormGroup){
    console.log(form);

    if(form.valid == true){
      this.isNotValidForm = false;

      let data = {
        first_name : this.registerPatient.value.first_name,
        last_name : this.registerPatient.value.last_name,
        password : this.registerPatient.value.password,
        role : "PATIENT",
        phone : this.registerPatient.value.phone,
        job : this.registerPatient.value.job,
        email : this.registerPatient.value.email,
        gender : this.registerPatient.value.gender,
        national_id : this.registerPatient.value.national_id,
        address: {
          city : this.registerPatient.value.address.city,
          buliding : this.registerPatient.value.address.buliding,
          apartment : this.registerPatient.value.address.apartment,
          street : this.registerPatient.value.address.street,
        }
      };


      this._authService.register(data).subscribe({
        next:(res:any)=>{
          // console.log(res);

          this.registerPatient.reset();
          this.isNotValidForm=false;
          this.apiErrorMessage="";
          console.log(form);

          // toaster
          this._toastr.success(res.message);
        },

        error:(err:any)=>{
          console.log(err);
          this.apiErrorMessage = err.error.message;
        }
      })

    }

    else{
      this.isNotValidForm = true;
    }
  }

  
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

}
