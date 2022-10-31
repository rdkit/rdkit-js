import { Component } from '@angular/core';

@Component({
  selector: 'app-substructure-highlight',
  templateUrl: './substructure-highlight.component.html',
  styleUrls: ['./substructure-highlight.component.css']
})
export class SubstructureHighlightComponent{
  caffeine = "CN1C=NC2=C1C(=O)N(C(=O)N2C)";
  caffeineSubstruct = "[N,n,O;!H0]";

  aspirin = "CC(=O)Oc1ccccc1C(=O)O"
  aspirinSubstruct = "CC(=O)Oc1ccccc1C";
}
