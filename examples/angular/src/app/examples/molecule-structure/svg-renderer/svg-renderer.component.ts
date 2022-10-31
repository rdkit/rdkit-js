import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { first } from 'rxjs/operators';
import { RDKitLoaderService } from '../../rdkit-loader/rdkit-loader.service';

@Component({
  selector: 'app-svg-renderer',
  templateUrl: './svg-renderer.component.html',
  styleUrls: ['./svg-renderer.component.css'],
})
export class SvgRendererComponent implements OnChanges, AfterViewInit {

  @Input() structure!: string;
  @Input() drawingDetails: any;

  @ViewChild('molSVG', { read: ElementRef }) svgContainer!: ElementRef<HTMLDivElement>

  safeSVG?: SafeHtml

  constructor(private rdkit: RDKitLoaderService, private domSanitizer: DomSanitizer, private cdr: ChangeDetectorRef) { }

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

  renderMolecule() {
    if (!(!!this.svgContainer)) {
      return
    }

    if ((!!this.structure && !!this.drawingDetails)) {
      this.rdkit.getRDKit().pipe(first()).subscribe(
        rdkit => {

          const mol = rdkit.get_mol(this.structure)
          if (!(!!mol && mol.is_valid())) {
            return;
          }

          const svgData = mol.get_svg_with_highlights(JSON.stringify(this.drawingDetails))

          this.safeSVG = this.domSanitizer.bypassSecurityTrustHtml(svgData)
          this.cdr.detectChanges()
          mol.delete()
        }
      )
    }
  }
}
