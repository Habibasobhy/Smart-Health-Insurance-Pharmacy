import { Pipe, PipeTransform } from '@angular/core';
import { Medicine } from '../Interfaces/medicine';

@Pipe({
  name: 'searchMedicine',
  standalone: true,
})
export class SearchMedicinePipe implements PipeTransform {
  transform(medicines: Medicine[], searchKey: string): Medicine[] {
    searchKey = searchKey.toLowerCase();
    return medicines.filter((medicine) =>
      medicine.name.toLowerCase().includes(searchKey)
    );
  }
}
