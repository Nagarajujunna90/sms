import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [
    SharedModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent {
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
