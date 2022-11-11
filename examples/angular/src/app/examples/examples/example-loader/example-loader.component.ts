import { Component, OnInit } from "@angular/core";
import { RDKitModule } from "../../../../../../../typescript";
import { RDKitLoaderService } from "../../rdkit-loader/rdkit-loader.service";

@Component({
  selector: "app-example-loader",
  templateUrl: "./example-loader.component.html",
  styleUrls: ["./example-loader.component.css"]
})
export class ExampleLoaderComponent {
  loading = false;
  rdkit?: RDKitModule;

  constructor(private rdkitService: RDKitLoaderService) {}

  clickToLoad() {
    this.loading = true;
    this.rdkitService.getRDKit().subscribe((rdkit) => {
      this.rdkit = rdkit;
      this.loading = false;
    });
  }
}
