import { FormControl } from '@angular/forms';

// custom validator for requiring input to be a number
// we arbitrarily set 672 hours to be the maximum reasonable time for a recipe to
// cook or prep for
export function validateReasonableTime(control: FormControl) {
  const numberRegexp = new RegExp('^[0-9]+$');
  const underLimit = +control.value <= 672;
  const isNumber = numberRegexp.test(control.value);
  if (underLimit && isNumber) {
    return null;
  } else {
    return {
      validateReasonableTime: {
        valid: false
      }
    };
  }
}
