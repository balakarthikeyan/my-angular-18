import { TestBed } from '@angular/core/testing';

import { MySingletonService } from './my-singleton.service';

describe('MySingletonService', () => {
	let service: MySingletonService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(MySingletonService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should add a user', () => {
		service.addUser('John');
		expect(service.getUserCount()).toBe(1);
	});

	it('should delete a user', () => {
		service.addUser('John');
		service.addUser('Jane');
		service.deleteUser('John');
		expect(service.getUserCount()).toBe(1);
	});

});
