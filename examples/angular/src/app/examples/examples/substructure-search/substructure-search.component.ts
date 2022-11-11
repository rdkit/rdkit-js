import { Component } from "@angular/core";
import { map } from "rxjs/operators";
import { RDKitLoaderService } from "../../rdkit-loader/rdkit-loader.service";
import { SMILES_LIST } from "../common/smiles";

@Component({
  selector: "app-substructure-search",
  templateUrl: "./substructure-search.component.html",
  styleUrls: ["./substructure-search.component.css"]
})
export class SubstructureSearchComponent {
  currentQuery = "";
  currentSmilesList = SMILES_LIST;

  filterMask = Array.from(SMILES_LIST, (...arg) => true);

  queryTimer: any;

  loading = false;

  constructor(private rdkitService: RDKitLoaderService) {}

  runSearch(search: any) {
    this.rdkitService
      .getRDKit()
      .pipe(
        map((rdkit) => {
          if (!search) {
            return Array.from(SMILES_LIST, (...arg) => true);
          }
          const qmol = rdkit.get_qmol(search);
          try {
            const rtn = SMILES_LIST.map((smiles) => {
              const mol = rdkit.get_mol(smiles);
              try {
                const matches = mol.get_substruct_match(qmol);
                return matches.length > 2;
              } finally {
                mol.delete();
              }
            });
            return rtn;
          } finally {
            qmol.delete();
          }
        })
      )
      .subscribe((filteredSmiles) => {
        this.filterMask = filteredSmiles;

        this.loading = false;
      });
  }

  handleSearchChange(search: any) {
    this.loading = true;
    if (this.queryTimer) {
      clearTimeout(this.queryTimer);
    }

    this.queryTimer = setTimeout(() => {
      this.runSearch(search.target.value);
    }, 500);
  }

  searchTrackFn(i: any, smiles: any) {
    return smiles;
  }
}
