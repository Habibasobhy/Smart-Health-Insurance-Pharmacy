import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DoctorService } from 'src/app/Core/Services/doctor.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-medicine',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  templateUrl: './add-medicine.component.html',
  styleUrls: ['./add-medicine.component.css'],
})
export class AddMedicineComponent {
  isNotValidForm: boolean = false;
  selectedFile: File | null = null;

  constructor(private _doctorService: DoctorService , private _toastr: ToastrService) {}

  NewMedicine: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(200),
    ]),
    quantity: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{1,9}$/),
    ]),
    max_age: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{1,9}$/),
    ]),
    min_age: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{1,9}$/),
    ]),
    row: new FormControl('', [Validators.required]),
    column: new FormControl('', [Validators.required]),
    treatment_dose: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{1,9}$/),
    ]),
    image_cover: new FormControl('', [Validators.required]),
  });

  AddMedicineDB() {

    if (this.NewMedicine.valid) {
      this.isNotValidForm = false;

      const formData = new FormData();
      formData.append('name', this.NewMedicine.get('name')?.value);
      formData.append('description',this.NewMedicine.get('description')?.value);
      formData.append('quantity', this.NewMedicine.get('quantity')?.value);
      formData.append('max_age', this.NewMedicine.get('max_age')?.value);
      formData.append('min_age', this.NewMedicine.get('min_age')?.value);
      formData.append('row', this.NewMedicine.get('row')?.value);
      formData.append('column', this.NewMedicine.get('column')?.value);
      formData.append('treatment_dose',this.NewMedicine.get('treatment_dose')?.value);
      formData.append('image_cover', this.selectedFile!, this.selectedFile!.name);

      // Call the service method to send data
      this._doctorService.AddMedicineDB(formData).subscribe({
        next: (res: any) => {
          console.log(res);
          
          this.NewMedicine.reset();

          // toaster
          this._toastr.success("Add Medicine Successfully");
        },

        error: (err: any) => {
          console.log(err);
          // this.apiErrorMessage=err.error.message;
        },
      });
    } else {
      this.isNotValidForm = true;
    }
  }


  onFileSelected(event: any)
  {    
     this.selectedFile = event.target.files[0];  
  }

}
