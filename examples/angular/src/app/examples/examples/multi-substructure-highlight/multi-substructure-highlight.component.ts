import { Component } from '@angular/core';

@Component({
  selector: 'app-multi-substructure-highlight',
  templateUrl: './multi-substructure-highlight.component.html',
  styleUrls: ['./multi-substructure-highlight.component.css']
})
export class MultiSubstructureHighlightComponent {
  caffeine = "CN1C=NC2=C1C(=O)N(C(=O)N2C)";
  caffeineSubstruct = "[N,n,o,O]";

  aspirin = "CC(=O)Oc1ccccc1C(=O)O";
  aspirinSubstruct = "[O,o].c1ccccc1";
}
