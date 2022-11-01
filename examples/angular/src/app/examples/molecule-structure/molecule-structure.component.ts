import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SecurityContext, SimpleChanges, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { first, shareReplay } from 'rxjs/operators';
import { RDKitModule } from '../../../../../../typescript';
import { RDKitLoaderService } from '../rdkit-loader/rdkit-loader.service';
import { MolDrawOptions, MolHighlight } from './mol-draw-options';

@Component({
  selector: 'app-molecule-structure',
  templateUrl: './molecule-structure.component.html',
  styleUrls: ['./molecule-structure.component.css']
})
export class MoleculeStructureComponent implements OnChanges, AfterViewInit {

  @Input() width: number = 200;
  @Input() height: number = 200;
  @Input() structure!: string;
  @Input() substructure?: string;
  @Input() refreshDelay?: number
  @Input() svgMode: boolean = false;
  @Input() molDrawOptions?: MolDrawOptions

  drawDetails: any = {}

  rdkit$!: Observable<RDKitModule>

  error: string | null = null;

  loading: boolean;

  refreshTimeout?: any

  @ViewChild('molCanvas', { read: ElementRef }) canvasContainer!: ElementRef<HTMLCanvasElement>


  constructor(private rdkitService: RDKitLoaderService, private domSanitizer: DomSanitizer, private el: ElementRef) {
    this.loading = true;
    this.rdkit$ = this.rdkitService.getRDKit().pipe(shareReplay(1))
    this.rdkit$.pipe(first()).subscribe(
      _ => {
        this.loading = false;
        this.error = null
      },
      error => {
        this.loading = false;
        console.error(error)
        this.error = 'RDKit failed to load'
      }
    )
  }

  ngAfterViewInit(): void {
    this.renderStructure()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!Object.keys(changes).some(k => changes[k].currentValue !== changes[k].previousValue)) {
      return
    }

    if (this.refreshDelay) {
      if (this.refreshTimeout) {
        clearTimeout(this.refreshTimeout)
      }
      this.refreshTimeout = setTimeout(
        () => this.renderStructure()
        , this.refreshDelay
      )
    } else {
      this.renderStructure()
    }
  }

  renderStructure() {
    this.error = null

    this.rdkit$.pipe(first()).subscribe(
      rdkit => {
        const mol = rdkit.get_mol(this.structure)
        const qmol = rdkit.get_qmol(this.substructure || '')
        try {
          if (!(!!mol && mol.is_valid())) {
            this.error = 'Invalid structure'
            return;
          }

          let highlightDetails: MolHighlight = { bonds: [], atoms: [] }

          if (!!qmol && qmol.is_valid()) {
            const highlights: any = JSON.parse(mol.get_substruct_matches(qmol))

            if (highlights?.length) {
              highlightDetails = (highlights as MolHighlight[]).reduce(
                (acc, { atoms, bonds }) => ({
                  atoms: [...acc.atoms, ...atoms],
                  bonds: [...acc.bonds, ...bonds]
                }),
                { bonds: [], atoms: [] }
              )
            } else {
              highlightDetails = highlights as MolHighlight
            }
          }

          this.drawDetails = {
            width: this.width,
            height: this.height,
            bondLineWidth: 1,
            addStereoAnnotation: true,
            ...(this.molDrawOptions || {}),
            ...highlightDetails
          }
        } finally {
          mol.delete()
          qmol.delete()
        }
      }
    )
  }
}
