import { Component, OnInit } from "@angular/core";
import { SMILES_LIST } from "../common/smiles";

@Component({
  selector: "app-mol-list",
  templateUrl: "./mol-list.component.html",
  styleUrls: ["./mol-list.component.css"]
})
export class MolListComponent {
  exampleSmiles = SMILES_LIST;
}
