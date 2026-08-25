import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MySingletonService } from './services/my-singleton.service';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';

@NgModule({
	declarations: [

	],
	imports: [
		CommonModule
	],
	providers: [
		MySingletonService,
		AuthService, 
		AuthGuard
	]
})
export class AppModule { }
