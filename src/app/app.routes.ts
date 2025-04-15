import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
    {path: '', component: DashboardComponent}, // Default route
    { path: '**', redirectTo: '', pathMatch: 'full' } // Wildcard route for a 404 page]}
    // add other routes below 
];
