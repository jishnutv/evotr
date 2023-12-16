import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { MainComponent } from './layouts/main/main.component';
import { CandidatesComponent } from './pages/candidates/candidates.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { authGuard } from './guards/auth.guard';
import { noAuthGuard } from './guards/noauth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MainComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'home',
        children: [
          {
            path: 'candidates',
            component: CandidatesComponent
          }
        ]
      },
      {
        path: 'my-account',
        loadChildren: () => import('../app/pages/my-account/my-account.routes').then((m) => m.routes),
      }
    ]
  },
  {
    path: 'admin',
    component: AdminComponent,
    loadChildren: () => import('../app/pages/admin/admin.routes').then((m) => m.routes),
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [noAuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [noAuthGuard]
  },
];