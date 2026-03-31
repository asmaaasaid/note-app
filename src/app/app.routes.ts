import { Routes } from '@angular/router';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { Register } from './pages/register/register';
import { Login } from './pages/login/login';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Home } from './pages/home/home';
import { Notes } from './pages/notes/notes';
import { Gallery } from './pages/gallery/gallery';
import { NotFound } from './pages/not-found/not-found';
import { authGuard } from './core/guards/authentication/auth-guard';
import { loggedGuard } from './core/guards/logged/logged-guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '',
        component: AuthLayout,
        canActivate: [loggedGuard],
        children: [
            {
                path: 'register',
                component: Register,
                title: 'Register'
            },
            {
                path: 'login',
                component: Login,
                title: 'Login'
            }
        ]
    },
    {
        path: '',
        component: MainLayout,
        canActivate: [authGuard],
        children: [
            {
                path: 'home',
                component: Home,
                title: 'Home'
            },
            {
                path: 'notes',
                component: Notes,
                title: 'Notes'
            },
            {
                path: 'gallery',
                component: Gallery,
                title: 'Gallery'
            },
            {
                path: '**',
                component: NotFound,
                title: 'Error'
            },
        ]
    }
];
