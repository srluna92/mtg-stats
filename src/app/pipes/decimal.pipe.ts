import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimal'
})
export class DecimalPipe implements PipeTransform {

  transform(value: number, args?: number): string {
    if (value.toString().split(/\./).length === 2) {
      const split = value.toString().split(/\./);
        args = args || args === 0 ? args : 2;
        if (split[1].length > args) {
          split[1] = split[1].slice(0, args);
        }
        return split.join('.').replace(/\.$/, '');
    }
    return value.toString();
  }

}
