import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'exactFilter'
})
export class ExactFilterPipe implements PipeTransform {


  transform(items: any[], filter: number): any {
    if (!items || !filter) {
        return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return items.filter(item => {
      return item.TicketNumber === filter;
    });

}

}
