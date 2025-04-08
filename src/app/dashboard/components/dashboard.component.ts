import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule], // ✅ Import RouterModule here
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
