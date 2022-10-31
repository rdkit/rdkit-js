import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { examplesCode } from '../code-examples';

@Component({
  selector: 'app-code-example',
  templateUrl: './code-example.component.html',
  styleUrls: ['./code-example.component.css'],
  animations: [
    trigger('expandBody', [
      state('hidden, void', style({height: '0px', visibility: 'hidden'})),
      state('show', style({height: '*', visibility: 'visible'})),
      transition(
        'show <=> hidden, void => hidden',
        animate('.2s ease-in'),
      ),
    ])
  ]
})
export class CodeExampleComponent implements OnChanges{

  isOpen = false;

  @Input() files: string[] = []
  codeBodies: {[key: string]:string} = examplesCode;
  currentTab: string | null = null

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.currentTab = this.files[0]
  }
}
