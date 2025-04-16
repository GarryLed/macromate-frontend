import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GoalsComponent } from './components/goals/goals.component';
import { MealsComponent } from './components/meals/meals.component';
import { WeightProgressComponent } from './components/weight-progress/weight-progress.component';
import { SearchComponent } from './components/search/search.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AboutComponent } from './components/about/about.component';

// Importing components for routing
export const routes: Routes = [
    { path: '', component: DashboardComponent}, // Default route
    { path: 'goals', component: GoalsComponent }, 
    { path: 'meals', component: MealsComponent }, 
    { path: 'progress', component: WeightProgressComponent }, 
    { path: 'search', component: SearchComponent },
    { path: 'calendar', component: CalendarComponent }, 
    { path: 'about', component: AboutComponent },
    { path: '**', redirectTo: '' } // Redirect for a 404 page   
];
