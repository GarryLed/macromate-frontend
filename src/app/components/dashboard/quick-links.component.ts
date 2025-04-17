import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-quick-links',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './quick-links.component.html',
 //styleUrls: ['./quick-links.component.scss']
})
export class QuickLinksComponent {
  links = [
    { label: 'Goals', route: '/goals', icon: '🎯' },
    { label: 'Meals', route: '/meals', icon: '🍽️' },
    { label: 'Calendar', route: '/calendar', icon: '📅' },
    { label: 'Search', route: '/search', icon: '🔍' }
  ];
}

