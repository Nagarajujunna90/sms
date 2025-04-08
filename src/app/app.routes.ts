import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/components/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Login Page
  {  path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),canActivate: [AuthGuard] },// ✅ Protecting dashboard routes},,
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirect to login initially
  { path: '**', redirectTo: 'login' } // Handle unknown routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
