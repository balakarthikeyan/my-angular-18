import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, Component, ContentChild, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { RxjsService } from '../services/rxjs.service';
import { CommonModule } from '@angular/common';
import { addIcons } from "ionicons";

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './home.component.html',
	styleUrl: './home.component.css',
	encapsulation: ViewEncapsulation.ShadowDom, // ViewEncapsulation.Emulated or ViewEncapsulation.None or ViewEncapsulation.ShadowDom
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeComponent implements OnInit, AfterContentInit, AfterViewInit {
	@Input()
	inputProperty!: string;

	@Output()
	childEvent: EventEmitter<string> = new EventEmitter<string>();

	@ContentChild('myContent')
	myContent!: ElementRef;

	@ViewChild('myDiv')
	myDiv!: ElementRef;

	cabinets: any = [
		{
			imageUrl: 'https://via.placeholder.com/64x64/11b7d2',
			name: 'Mappy Mini-cabinet',
			description: 'The original cat and mouse game.',
			addedAt: new Date(2021, 12, 22),
			storeCount: 2,
			price: 27.99,
		},
	];

	constructor(
		public rxjsObj: RxjsService,
	) {
	}

	ngOnInit(): void {
		// this.rxjsObj.fnForkJoin();
		// this.rxjsObj.fnCatchError();
		// this.rxjsObj.fnBackpressure();
		// this.rxjsObj.fnDebounce();
		// this.rxjsObj.fnSwitchMap();
		// this.rxjsObj.fnRetry();
		// this.rxjsObj.fnScheduler();
		// this.rxjsObj.fnPiped();
		// this.rxjsObj.fnReplaySubject();
		// this.rxjsObj.fnMergeMap();
		// this.rxjsObj.fnScan();
		// this.rxjsObj.fnReduce();
		// this.rxjsObj.fnColdObservable();
		this.rxjsObj.fnHotObservable();
	}

	ngAfterContentInit() {
		// This code will run after the content has been projected into the component
		// console.log('Content initialized:', this.myContent.nativeElement.textContent);
	}

	ngAfterViewInit() {
		// This code will run after the component's view has been initialized
		// console.log('View initialized:', this.myDiv.nativeElement.textContent);
	}

	status: string = 'Not started';
	simulateAsyncTask() {
		this.status = 'Processing...';

		setTimeout(() => {
			// Simulating an asynchronous task completion
			this.status = 'Completed';
		}, 2000);
	}

	// Emit event from child component
	triggerChildEvent() {
		console.log("Hello Emit, Home Component !!");
		this.childEvent.emit(this.inputProperty);
	}

	altFor(cabinet: any): string {
		return `Image of ${cabinet.name}`;
	}

}