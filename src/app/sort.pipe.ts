import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe  implements PipeTransform {
  transform(array: any[], field: string): any[] {
    // tslint:disable-next-line:max-line-length
    return array.sort((a, b) => a[field].toLowerCase() !== b[field].toLowerCase() ? a[field].toLowerCase() < b[field].toLowerCase() ? -1 : 1 : 0);
  }
}
