import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent {
  
  constructor(private router: Router) {
    console.log("initilized");

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

  onInit() {
    console.log("initilized") 
    console.log(this.selectedTab);
    console.log(this.tabs);

    //I need routing when it is initialized to the first tab
    this.router.navigate(['/students/personal-info']);
  } // This method is called when the component is initialized
}
