import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentParentGuardianComponent } from './student-parent-gardian.component';

describe('StudentParentGuardianComponent', () => {
  let component: StudentParentGuardianComponent;
  let fixture: ComponentFixture<StudentParentGuardianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentParentGuardianComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentParentGuardianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
