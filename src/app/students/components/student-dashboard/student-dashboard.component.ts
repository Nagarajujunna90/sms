import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent {
  constructor() {
    console.log("initilized")

  }
  selectedTab: number = 0;  // Initialize with first tab selected
  tabs = [
    { label: 'Personal Info' },
    { label: 'Address' },
    { label: 'Grade & Academic' },
    { label: 'Rewards & Achievements' },
    { label: 'Previous Education' }
  ];
  // Tab switching function
  selectTab(index: number) {
    this.selectedTab = index;
  }

}
