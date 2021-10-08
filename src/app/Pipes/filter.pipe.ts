import { Pipe, PipeTransform } from '@angular/core';
import { result } from '../modules/Shared/baseResponse';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {

    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();

    let result = items.filter(it => {
       return it.name.toLowerCase().includes(searchText);
    });
    return result;
  }

}
