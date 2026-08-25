import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RxjsService } from './rxjs.service';

describe('RxjsServiceService', () => {
	let service: RxjsService;
	let httpMock: HttpTestingController;
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [RxjsService]
		});
		service = TestBed.inject(RxjsService);
		httpMock = TestBed.inject(HttpTestingController);
	});
	afterEach(() => {
		httpMock.verify();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should fetch data from the API', () => {
		const mockResponse = 'Mocked API response';
		service.fetchData().then((data) => {
			expect(data).toBe(mockResponse);
		});
		const req = httpMock.expectOne(service.apiUrl);
		expect(req.request.method).toBe('GET');
		req.flush(mockResponse);
	});
});
