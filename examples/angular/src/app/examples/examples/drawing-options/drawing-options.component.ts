import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { DrawColour, MolDrawOptions } from '../../molecule-structure/mol-draw-options';

@Component({
  selector: 'app-drawing-options',
  templateUrl: './drawing-options.component.html',
  styleUrls: ['./drawing-options.component.css']
})
export class DrawingOptionsComponent {

  drawOptionsForm: FormGroup

  molOptions: MolDrawOptions = {};

  constructor() {


    this.drawOptionsForm = new FormGroup({
      mainStructureInput: new FormControl("CSCC[C@H](NC(=O)[C@H](CC1=CNC2=C1C=CC=C2)NC(=O)CCNC(=O)OC(C)(C)C)C(=O)N[C@@H](CC(O)=O)C(=O)N[C@@H](CC1=CC=CC=C1)C(N)=O", [Validators.required]),
      substructureInput: new FormControl("[n,O]"),
      legend: new FormControl("Legend Text"),
      legendFontSize: new FormControl(16),
      width: new FormControl(500),
      height: new FormControl(450),
      bondLineWidth: new FormControl(1),
      scaleBondWidth: new FormControl(false),
      addStereoAnnotation: new FormControl(true),
      addAtomIndices: new FormControl(true),
      addBondIndices: new FormControl(false),
      explicitMethyl: new FormControl(true),
      centerMoleculesBeforeDrawing: new FormControl(false),
      highlightColour: new FormControl("#fd5c63", [Validators.pattern('#[a-fA-F0-9]{6}')]),
      legendColour: new FormControl("#000000", [Validators.pattern('#[a-fA-F0-9]{6}')]),
      symbolColour: new FormControl("#000000", [Validators.pattern('#[a-fA-F0-9]{6}')]),
      backgroundColour: new FormControl("#ffffff", [Validators.pattern('#[a-fA-F0-9]{6}')]),
      rotate: new FormControl(0.0),
      annotationFontScale: new FormControl(0.5),
      comicMode: new FormControl(false),
      svgMode: new FormControl(true)
    })

    this.parseFormValue(this.drawOptionsForm.value)

    this.drawOptionsForm.valueChanges.pipe(debounceTime(500)).subscribe(
      val => {
        this.parseFormValue(val)
      }
    )
  }

  parseFormValue(formValue: any) {
    const temp = { ...formValue }

    const l = temp.highlightColour.match('#([a-fA-f0-9]{2})([a-fA-f0-9]{2})([a-fA-f0-9]{2})')

    temp.highlightColour = this.parseRGBToDrawColour(temp.highlightColour)
    temp.legendColour = this.parseRGBToDrawColour(temp.legendColour)
    temp.symbolColour = this.parseRGBToDrawColour(temp.symbolColour)
    temp.backgroundColour = this.parseRGBToDrawColour(temp.backgroundColour)

    this.molOptions = temp as MolDrawOptions
  }

  parseRGBToDrawColour(rgb: string): DrawColour {

    return (
      rgb
        .match('#([a-fA-f0-9]{2})([a-fA-f0-9]{2})([a-fA-f0-9]{2})')
        ?.map((c: string) => Number.parseInt(c, 16) / 255.0)
        ?.slice(1)
    ) as DrawColour
  }


}
