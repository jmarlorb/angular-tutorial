import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateIsAfterCurrentDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let valorCampo = control.value
      let expirationDate = new Date(valorCampo);
      let today = new Date();
      if (expirationDate >= today){
        return null;
      }
      return {invalidDate : true}

    };
  }

export function priorityValueIsWithinBounds(): ValidatorFn {
    return (control: AbstractControl):ValidationErrors | null =>{
        let valorCampo = control.value;
        if (valorCampo == "H" || valorCampo == "M" || valorCampo == "L"){
            return null;
        }
        return {invalidPriorityValue : true};
    }
}