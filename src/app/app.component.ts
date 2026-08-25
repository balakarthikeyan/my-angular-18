import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DomSanitizer } from '@angular/platform-browser';
import { HighlightDirective } from './directives/highlight.directive';
import { SanitizePipe } from './pipes/sanitize.pipe';
import { SafeType } from './safe-type';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, RouterLink, RouterLinkActive, HomeComponent, HighlightDirective, SanitizePipe],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [SanitizePipe]
})
export class AppComponent {
	title = 'my-angular-18';
	trustedScript; trustedUrl; trustedResourceUrl; trustedHtml; trustedStyle; htmlInjection;
	_userInput = '{{constructor.constructor(\'alert(1)\'()}}';
	htmlSnippet: string = "<script>console.log(sanitizePipe HTML)</script>";
	videoURL: string = 'https://www.w3schools.com/html/mov_bbb.mp4';

	constructor(public sanitizer: DomSanitizer, public sanitizePipe : SanitizePipe) {
		this.trustedUrl = this.sanitizer.bypassSecurityTrustUrl('javascript:alert()');
		this.trustedResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/images/branding/googlelogo/1x/googlelogo_light_color_272x92dp.png");
		this.trustedScript = this.sanitizer.bypassSecurityTrustScript("<script>console.log('bypass Security TrustScript')</script>");
		this.trustedHtml = this.sanitizer.bypassSecurityTrustHtml("<h1>html tag</h1><svg onclick=\"alert('bypassSecurityTrustHtml')\" style=display:block>blah</svg>");
		this.trustedStyle = this.sanitizer.bypassSecurityTrustStyle('background-image: url(https://example.com/exfil/a)');
		this.htmlInjection = "<script>alert('HTML Injection')</script><h1>test</h1>";
		this.sanitizePipe.transform(`<a href="javascript:alert('sanitizePipe transform')">click</a>`, SafeType.HTML)
	}

	// Update state in parent component
	eventReceived: boolean = false;
	handleChildEvent() {
		console.log("Hello Emit, App Component !!");
		this.eventReceived = true;
	}

	// Event triggered in the parent component
	inputProperty: string = 'Initial value';
	triggerParentEvent() {
		this.inputProperty = 'New value';
	}
}
