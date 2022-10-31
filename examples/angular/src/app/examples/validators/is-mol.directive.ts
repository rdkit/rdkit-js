/* eslint-disable @angular-eslint/directive-selector */

import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RDKitLoaderService } from '../rdkit-loader/rdkit-loader.service';

@Directive({
  selector: '[isMol]',
  providers: [{
    provide: NG_ASYNC_VALIDATORS,
    multi: true,
    useExisting: IsMolDirective
  }]
})
export class IsMolDirective implements AsyncValidator {

  constructor(private rdkitService: RDKitLoaderService) { }

  validate(control: AbstractControl<any, any>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    if (!control.value) {
      return Promise.resolve(null)
    }

    return this.rdkitService.getRDKit().pipe(
      map(
        rdkit => {
          const mol = rdkit.get_mol(control.value)
          const isMol = !!mol && mol.is_valid()

          mol?.delete()
          return isMol ? null : { isMol: 'Input is not a valid Molecule' }
        }
      )
    )
  }
}
