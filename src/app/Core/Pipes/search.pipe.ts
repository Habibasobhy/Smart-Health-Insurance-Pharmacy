import { Pipe, PipeTransform } from '@angular/core';
import { Patient } from '../Interfaces/patient';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  // this will return all patients includes a searchKey
  transform(patients: Patient[], searchKey:string): Patient[] {
    return patients.filter((element)=>(element.first_name+element.last_name).toLowerCase().includes(searchKey.toLowerCase()));
  }

}
