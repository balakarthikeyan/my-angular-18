import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
	selector: '[appHighlight]',
	standalone: true
})
export class HighlightDirective {

	constructor(private el: ElementRef, private renderer: Renderer2) { }

	ngOnInit() {
		this.renderer.setStyle(this.el.nativeElement, 'background-color', 'yellow');
	}

	ngOnDestroy() {
		this.renderer.removeStyle(this.el.nativeElement, 'background-color');
	}

}
