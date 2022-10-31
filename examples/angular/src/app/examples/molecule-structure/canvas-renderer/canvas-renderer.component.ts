import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { RDKitLoaderService } from '../../rdkit-loader/rdkit-loader.service';

@Component({
  selector: 'app-canvas-renderer',
  templateUrl: './canvas-renderer.component.html',
  styleUrls: ['./canvas-renderer.component.css']
})
export class CanvasRendererComponent implements OnChanges, AfterViewInit{
 
  @Input() structure!: string;
  @Input() drawingDetails: any;

  @ViewChild('molCanvas', {read: ElementRef}) canvasContainer!: ElementRef<HTMLCanvasElement>

  constructor(private rdkit:RDKitLoaderService) { }

  ngAfterViewInit(): void {
    this.renderMolecule()    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (Object.keys(changes).every(k => {
      if (typeof changes[k].currentValue == 'object') {
        return JSON.stringify(changes[k].currentValue) == JSON.stringify(changes[k].previousValue)
      }
      return changes[k].currentValue == changes[k].previousValue
    })) { return }

    // Use setTimeout here to push it off of the main thread, otherwise, it can block the mian rendering thread.
    setTimeout(
      () => this.renderMolecule()
    )
  }

  renderMolecule(){
    if(! (!!this.canvasContainer)){
      return
    }

    if((!!this.structure && !!this.drawingDetails)){
      this.rdkit.getRDKit().pipe(first()).subscribe(
        rdkit => {
          const mol = rdkit.get_mol(this.structure)
          if(!(!!mol && mol.is_valid())){
            return;
          }

          mol.draw_to_canvas_with_highlights(this.canvasContainer.nativeElement, JSON.stringify(this.drawingDetails))
          mol.delete()
          
        }
      )
    }
  }
}
