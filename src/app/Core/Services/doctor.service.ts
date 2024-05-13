import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  baseUrl: string = 'https://medical-system-yuw6.onrender.com/api/';

  constructor(private _httpClient: HttpClient) { }

  GetAllPatients(): Observable<any>
  {
    return this._httpClient.get(this.baseUrl + 'user/allPatients' ,
    {
      headers : {
        Authorization: `${localStorage.getItem('doctorToken')}`,
      },
    });
  }

  deletePatient(patientId : number) : Observable<any>
  {
    return this._httpClient.delete(this.baseUrl + `user/delete/${patientId}`);
  }

  ShowPrescription(patientId : number) : Observable<any>
  {
    return this._httpClient.get(this.baseUrl + `prescription/specific-prescription/${patientId}`,
    {
      headers : {
        Authorization: `${localStorage.getItem('doctorToken')}`,
      }
    });
  }

  DeleteMedicineForUser(ItemId : number , prescriptionId : number) : Observable<any>
  {
    return this._httpClient.delete(this.baseUrl + `prescription/${prescriptionId}/${ItemId}` ,
    {
      headers : {
        Authorization: `${localStorage.getItem('doctorToken')}`,
      }
    });
  }

  MedicineDetails(medicineId : number) : Observable<any>
  {
    return this._httpClient.get(this.baseUrl + `medicine/${medicineId}`);
  }


  GetAllMedicines(): Observable<any>
  {
    return this._httpClient.get(this.baseUrl + `medicine/`);
  }

  AddModifyPrescription(data : any)
  {
    return this._httpClient.post(this.baseUrl + `prescription` , data ,
    {
      headers : {
        Authorization: `${localStorage.getItem('doctorToken')}`,
      }
    });
  }

  DeleteMedicinePermanently(medicineId : number) : Observable<any>
  {
    return this._httpClient.delete(this.baseUrl + `medicine/${medicineId}`);
  }

  AddMedicineDB(data : any) : Observable<any>
  {
    return this._httpClient.post(this.baseUrl + `medicine/` , data);
  }

  UpdateMedicineDB(data : FormData , MedicineId : number) : Observable<any>
  {
    return this._httpClient.put(this.baseUrl + `medicine/${MedicineId}` , data);
  }
  
}

