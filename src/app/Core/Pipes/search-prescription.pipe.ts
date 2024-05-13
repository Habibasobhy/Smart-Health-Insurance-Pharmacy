import { Pipe, PipeTransform } from '@angular/core';
import { Prescription , Item} from '../Interfaces/prescription';

@Pipe({
  name: 'searchPrescription',
  standalone: true
})
export class SearchPrescriptionPipe implements PipeTransform {

  transform(items: Item[], searchKey: string): Item[] {
    
    searchKey = searchKey.toLowerCase();
    return items.filter(item =>
      item.Medicine.name.toLowerCase().includes(searchKey)
    ); 
  }
}
