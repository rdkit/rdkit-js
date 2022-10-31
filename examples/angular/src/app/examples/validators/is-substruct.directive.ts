/* eslint-disable @angular-eslint/directive-selector */

import { Directive, Input } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RDKitLoaderService } from '../rdkit-loader/rdkit-loader.service';

@Directive({
  selector: '[isSubstruct]',
  providers: [{
    provide: NG_ASYNC_VALIDATORS,
    multi: true,
    useExisting: IsSubstructDirective
  }]
})
export class IsSubstructDirective implements AsyncValidator {

  @Input('isSubstruct') refMol!: string;

  constructor(private rdkitService: RDKitLoaderService) { }

  validate(control: AbstractControl<any, any>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    if (!control.value || !this.refMol) {
      return Promise.resolve(null)
    }

    return this.rdkitService.getRDKit().pipe(
      map(
        rdkit => {
          const mol = rdkit.get_mol(this.refMol)
          const isMol = !!mol && mol.is_valid()

          if (!isMol) {
            mol?.delete()
            return null
          }

          const qmol = rdkit.get_qmol(control.value)
          const isQMol = !!qmol && qmol.is_valid()

          if (!isQMol) {
            mol?.delete()
            qmol?.delete()
            return { isSubstruct: 'Input is not a valid Molecule'}
          }

          // Check if its not "{}". No need to parse as JSON this way
          const rtn = mol.get_substruct_match(qmol).length > 2

          mol?.delete()
          qmol?.delete()

          return rtn ? null : { isSubstruct: 'Input is not a substructure of the given Molecule' }
        }
      )
    )
  }
}
