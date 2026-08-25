import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, delay, from, forkJoin, catchError, map, retry, bufferTime, interval, throttleTime, debounceTime, fromEvent, sampleTime, switchMap, mergeMap, observeOn, asyncScheduler, filter, ReplaySubject, reduce, scan, Observable, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class RxjsService {
	apiUrl = 'https://jsonplaceholder.typicode.com/posts';

	// constructor(private http: HttpClient) { }

	// fetchData(): Promise<any> {
	// 	return this.http.get<any>(this.apiUrl).toPromise();
	// }

	// forkJoin will return last emitted values of each observable:
	fnForkJoin(): void {
		const observables = [
			of(1, 2, 3).pipe(delay(500)),
			from([10, 11, 12])
		]
		const $forkJoin = forkJoin(observables);
		$forkJoin.subscribe((data: any) => {
			console.log('forkjoin data', data);
		});
	}

	// catchError method
	fnCatchError(): void {
		of(1, 2, 3).pipe(
			map(num => {
				if (num === 2) {
					throw new Error('Oops!');
				}
				return num;
			}),
			catchError(err => {
				console.error(err.message);
				return of(4, 5, 6);
			}),
		).subscribe(
			num => console.log(num),
			err => console.error(err),
			() => console.log('Complete')
		);
	}

	// Backpressure including `buffer`, `throttle`, `debounce`, `sample`, and `switchMap`.
	fnBackpressure(): void {
		interval(100).pipe(
			bufferTime(1000),
			throttleTime(1000),
			sampleTime(1000),
		).subscribe(
			values => console.log(values),
			err => console.error(err),
			() => console.log('Complete')
		);
	}

	fnDebounce(): void {
		fromEvent(document, 'keyup').pipe(
			debounceTime(1000)
		).subscribe(
			(event: any) => {
				console.log(event.key)
			},
			err => console.error(err),
			() => console.log('Complete')
		);
	}

	fnSwitchMap(): void {
		// An Observable that emits a value every 100ms
		const source$ = interval(100);
		// An Observable that processes values
		const processValue = (value: number) => {
			return from(new Promise<void>(resolve => {
				// Simulate processing time
				setTimeout(() => {
					console.log(`Processed value: ${value}`);
					resolve();
				}, 2000);
			}));
		};
		// Use switchMap to limit the number of concurrent emissions
		const limitedSource$ = source$.pipe(
			switchMap(value => processValue(value), index => 2) // Only allow 2 concurrent emissions
		);
		limitedSource$.subscribe(
			value => console.log(`Received value: ${value}`),
			err => console.error(err),
			() => console.log('Complete')
		);

		// 4 as switchMap cancels all previous observables when new observable is emitted
		const $switchMap = from([1, 2, 3, 4]).pipe(switchMap(data => {
			return of(data).pipe(delay(500))
		}));

		$switchMap.subscribe(data => {
			console.log('switch map data', data);
		})
	}

	fnRetry(): void {
		const source$ = of(this.apiUrl);
		const data$ = source$.pipe(
			mergeMap(url => fetch(url)), // Assume fetch() returns a promise with the data
			map(response => response.json()),
			retry(3) // Retry up to 3 times if an error occurs
		);
		data$.subscribe(
			data => console.log(data),
			err => console.error(err),
			() => console.log('Complete')
		);
	}

	// RxJS scheduler
	fnScheduler(): void {
		const source$ = from([this.apiUrl, 2, 3]);
		const async$ = source$.pipe(
			observeOn(asyncScheduler) // Emit values on the async scheduler
		);
		async$.subscribe(
			value => console.log(value), // Output: 1, 2, 3
			err => console.error(err),
			() => console.log('Complete')
		);
	}

	// Pipe
	fnPiped(): void {
		const source$ = of(1, 2, 3, 4, 5);
		const filtered$ = source$.pipe(
			filter(value => value % 2 === 0),
			map(value => value * 2)
		);
		filtered$.subscribe(
			value => console.log(value), // Output: 4, 8, 10
			err => console.error(err),
			() => console.log('Complete')
		);
	}

	fnReplaySubject(): void {

		// Create a ReplaySubject with a buffer size of 3
		const subject = new ReplaySubject(3);

		// Emit values to the ReplaySubject
		subject.next('Value 1');
		subject.next('Value 2');
		subject.next('Value 3');

		// Subscribe to the ReplaySubject
		subject.subscribe(value => console.log('Received:', value));
	}

	fnMergeMap(): void {

		// Create an observable that emits three values
		const sourceObservable = of(1, 2, 3);
		// Use mergeMap to merge the values from the inner observables
		const resultObservable = sourceObservable.pipe(
			mergeMap((value) => {
				// Create an inner observable that emits the value after a delay
				return of(value).pipe(delay(1000));
			})
		);
		// Subscribe to the result observable
		resultObservable.subscribe((value) => {
			console.log(value); // 1 2 3 
		});
	}

	fnScan(): void {
		const $reduceOperator = from([1, 2, 3, 4]).pipe(
			scan((sum, num) => {
				return sum + num;
			})
		);

		$reduceOperator.subscribe(data => {
			console.log('scan operator data', data);
		})
	}

	fnReduce(): void {
		const $reduceOperator = from([1, 2, 3, 4]).pipe(
			reduce((sum, num) => {
				return sum + num;
			})
		);

		$reduceOperator.subscribe(data => {
			console.log('reduce operator data', data);
		})
	}

	fnColdObservable(): void {
		const coldObservable = new Observable(observer => {
			console.log('Observable logic');
			observer.next(1);
			observer.next(2);
			observer.next(3);
		});

		coldObservable.subscribe(value => console.log('Subscriber 1:', value));
		coldObservable.subscribe(value => console.log('Subscriber 2:', value));
	}

	fnHotObservable(): void {
		const hotObservable = new Subject<number>();

		hotObservable.next(1);
		hotObservable.next(2);
		hotObservable.next(3);

		hotObservable.subscribe(value => console.log('Subscriber 1:', value));

		hotObservable.next(4);
		hotObservable.next(5);

		hotObservable.subscribe(value => console.log('Subscriber 2:', value));

		hotObservable.next(6);
		hotObservable.next(7);
	}
}
