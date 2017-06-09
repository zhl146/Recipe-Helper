import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timePipe'
})
export class TimePipe implements PipeTransform {
  // transforms a number in minutes to a string that displays X m Y h
  transform (minutesTime: number): string {
    const minutes = minutesTime % 60;
    const hours = Math.floor(minutesTime / 60);
    let minutesString = minutes + ' m';
    let hoursString = '';
    if ( hours > 0 && minutes <= 0) {
      minutesString = '';
    }
    if (hours > 0) {
      hoursString = hours + ' h ';
    }
    return hoursString + minutesString;
  }
}
