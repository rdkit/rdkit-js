import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ExamplesComponent } from "./examples.component";
import { IntroductionComponent } from "./introduction/introduction.component";
import { ExampleLoaderComponent } from "./examples/example-loader/example-loader.component";
import { RDKitLoaderService } from "./rdkit-loader/rdkit-loader.service";
import { CodeExampleComponent } from "./code-example/code-example.component";
import { MoleculeStructureComponent } from "./molecule-structure/molecule-structure.component";
import { CanvasRendererComponent } from "./molecule-structure/canvas-renderer/canvas-renderer.component";
import { SvgRendererComponent } from "./molecule-structure/svg-renderer/svg-renderer.component";
import { MolListComponent } from "./examples/mol-list/mol-list.component";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SvgRenderingComponent } from "./examples/svg-rendering/svg-rendering.component";
import { CanvasRenderingComponent } from "./examples/canvas-rendering/canvas-rendering.component";
import { SubstructureHighlightComponent } from "./examples/substructure-highlight/substructure-highlight.component";
import { MultiSubstructureHighlightComponent } from "./examples/multi-substructure-highlight/multi-substructure-highlight.component";
import { SubstructureSearchComponent } from "./examples/substructure-search/substructure-search.component";
import { DrawingOptionsComponent } from "./examples/drawing-options/drawing-options.component";
import { MolStructComponent } from "./examples/mol-struct/mol-struct.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IsMolDirective } from "./validators/is-mol.directive";
import { IsSubstructDirective } from "./validators/is-substruct.directive";

@NgModule({
  declarations: [
    ExamplesComponent,
    IntroductionComponent,
    ExampleLoaderComponent,
    CodeExampleComponent,
    MoleculeStructureComponent,
    CanvasRendererComponent,
    SvgRendererComponent,
    MolListComponent,
    SvgRenderingComponent,
    CanvasRenderingComponent,
    SubstructureHighlightComponent,
    MultiSubstructureHighlightComponent,
    SubstructureSearchComponent,
    DrawingOptionsComponent,
    MolStructComponent,
    IsMolDirective,
    IsSubstructDirective
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [ExamplesComponent],
  providers: [RDKitLoaderService]
})
export class ExamplesModule {}
