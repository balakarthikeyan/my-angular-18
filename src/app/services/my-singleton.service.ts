import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class MySingletonService {

	private users: string[] = [];

	constructor() { }

	addUser(user: string) {
		this.users.push(user);
	}

	getUserCount() {
		return this.users.length;
	}

	deleteUser(user: string) {
		const index = this.users.indexOf(user);
		if (index !== -1) {
			this.users.splice(index, 1);
		}
	}
}
