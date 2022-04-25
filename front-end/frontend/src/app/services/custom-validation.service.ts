import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidationService {

  constructor() { }

  camposIguales(newPassword: string, confirmPassword: string) {

    return (formGroup: AbstractControl): ValidationErrors | null => {


      const pass1 = formGroup.get(newPassword)?.value;
      const pass2 = formGroup.get(confirmPassword)?.value;


      if (pass1 !== pass2) {

        formGroup.get(confirmPassword)?.setErrors({ noIguales: true});
        return { noIguales: true }
      }

      formGroup.get(confirmPassword)?.setErrors(null);


      return null;

    }

  }

}


