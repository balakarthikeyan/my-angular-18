import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { ChildComponent } from './child/child.component';
import { ParentComponent } from './parent/parent.component';

function redirectBasedOnAuth(authService: AuthService) {
    return authService.isAuthenticated() ? 'home' : 'login';
}

export const routes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'about', component: AboutComponent },
    { path: 'login', component: LoginComponent },
    // {
    //     path: 'redirect',
    //     redirectTo: (route) => redirectBasedOnAuth(route.injector.get(AuthService))
    // },
    {
        path: 'parent',
        component: ParentComponent,
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'child',
                component: ChildComponent
            }
        ]
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home' }
];
