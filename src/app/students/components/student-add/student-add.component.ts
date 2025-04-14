import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { StudentService } from '../../services/student.service';
import { filter } from 'rxjs';


@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  standalone: true,
  imports: [SharedModule],
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent implements OnInit {

  constructor(
    private studentService: StudentService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  selectedTab: number = 0;
  previousTab: number = 0; // to track last tab
  tabRoutes = ['personal-info', 'parent-guardian', 'address', 'academic', 'previous-education', 'reports'];


  ngOnInit(): void {
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      const activeTab = this.route.firstChild?.snapshot.url[0]?.path;
      const index = this.tabRoutes.indexOf(activeTab ?? '');
      this.selectedTab = index !== -1 ? index : 0;
      // Navigate to default tab if none selected
      if (!activeTab) {
        this.router.navigate(['personal-info'], { relativeTo: this.route });
      }
    });
      
  }

  onTabChange(index: number): void {
    console.log('Tab changed to index:', index);
    this.selectedTab = index;

    if (this.selectedTab === 0 && index !== 0) {
      // Leaving "Personal Info" tab
      const isConfirmed = confirm('You will be logged out if you leave Personal Info tab. Continue?');
      if (!isConfirmed) {
        // Stay on current tab
        setTimeout(() => {
          this.selectedTab = 0;
        });
        return;
      } else {
        console.log('Confirmed leave from personal info');
      }
    }

    // ✅ Update selected tab only after confirmation
    this.selectedTab = index;
    this.previousTab = index;

    const selectedRoute = this.tabRoutes[index];
    console.log('Navigating to route:', selectedRoute);

    // ✅ Correct navigation
    this.router.navigate([selectedRoute], { relativeTo: this.route });

  }

}
