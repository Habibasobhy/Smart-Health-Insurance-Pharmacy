import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl,FormGroup,ReactiveFormsModule,Validators,} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { DoctorService } from 'src/app/Core/Services/doctor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Medicine } from 'src/app/Core/Interfaces/medicine';

@Component({
  selector: 'app-update-medicine',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  templateUrl: './update-medicine.component.html',
  styleUrls: ['./update-medicine.component.css'],
})
export class UpdateMedicineComponent implements OnInit {
  isNotValidForm: boolean = false;
  selectedFile: File | null = null;
  medicineId: number = 0;
  medicineDetails: Medicine = {} as Medicine;
  updateMedicine!: FormGroup; // Declare updateMedicine without initialization

  constructor(
    private _doctorService: DoctorService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((res: any) => {
      // console.log(res.params.id);
      // & Get Id In Url & //
      this.medicineId = res.params.id;

      // Call Method
      this.GetMedicineDetails(this.medicineId);
    });

    this.initializeForm(); // Initialize form here
  }

  GetMedicineDetails(MedicineId: number) {
    this._doctorService.MedicineDetails(MedicineId).subscribe({
      next: (res: any) => {
        console.log(res);
        this.medicineDetails = res.data;

        this.initializeForm(); // Call initializeForm after medicineDetails is fetched
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  initializeForm() {
    this.updateMedicine = new FormGroup({
    name: new FormControl(this.medicineDetails?.name, [
      Validators.required,
      Validators.minLength(3),
    ]),
    description: new FormControl(this.medicineDetails.description, [
      Validators.required,
      Validators.maxLength(200),
    ]),
    quantity: new FormControl(this.medicineDetails.quantity, [
      Validators.required,
      Validators.pattern(/^[0-9]{1,9}$/),
    ]),
    max_age: new FormControl(this.medicineDetails.max_age, [
      Validators.required,
      Validators.pattern(/^[0-9]{1,9}$/),
    ]),
    min_age: new FormControl(this.medicineDetails.min_age, [
      Validators.required,
      Validators.pattern(/^[0-9]{1,9}$/),
    ]),
    row: new FormControl(this.medicineDetails.row, [Validators.required]),
    column: new FormControl(this.medicineDetails.column, [Validators.required]),
    treatment_dose: new FormControl(this.medicineDetails.treatment_dose, [
      Validators.required,
      Validators.pattern(/^[0-9]{1,9}$/),
    ]),
    image_cover: new FormControl('', [
      Validators.required,
    ]),
  });
  }

  updateMedicineDB() {
    console.log(this.updateMedicine);

    if (this.updateMedicine.valid) {
      this.isNotValidForm = false;

      const formData = new FormData();
      formData.append('name', this.updateMedicine.get('name')?.value);
      formData.append('description',this.updateMedicine.get('description')?.value);
      formData.append('quantity', this.updateMedicine.get('quantity')?.value);
      formData.append('max_age', this.updateMedicine.get('max_age')?.value);
      formData.append('min_age', this.updateMedicine.get('min_age')?.value);
      formData.append('row', this.updateMedicine.get('row')?.value);
      formData.append('column', this.updateMedicine.get('column')?.value);
      formData.append('treatment_dose',this.updateMedicine.get('treatment_dose')?.value);
      formData.append('image_cover', this.selectedFile! , this.selectedFile!.name);

      // Call the service method to send data
      this._doctorService.UpdateMedicineDB(formData, this.medicineId).subscribe({
          next: (res:any) => {
            console.log(res);       
            
            this._router.navigate(['/medicines']);
          },

          error: (err:any) => {
            console.log(err.error);
            
            // this.apiErrorMessage=err.error.message;
          },
        });

    } else {
      this.isNotValidForm = true;
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
}

