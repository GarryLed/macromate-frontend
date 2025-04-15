import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GoalsComponent } from './components/goals/goals.component';
import { MealsComponent } from './components/meals/meals.component';
import { WeightProgressComponent } from './components/weight-progress/weight-progress.component';
import { SearchComponent } from './components/search/search.component';
import { CalendarComponent } from './components/calendar/calendar.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent}, // Default route
    { path: 'goals', component: GoalsComponent }, 
    { path: 'meals', component: MealsComponent }, 
    { path: 'progress', component: WeightProgressComponent }, 
    { path: 'search', component: SearchComponent },
    { path: 'calendar', component: CalendarComponent }, // New route for calendar

    { path: '**', redirectTo: '' } // Wildcard route for a 404 page

    
];
