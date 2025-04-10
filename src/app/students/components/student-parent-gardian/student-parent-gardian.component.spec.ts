import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentParentGardianComponent } from './student-parent-gardian.component';

describe('StudentParentGardianComponent', () => {
  let component: StudentParentGardianComponent;
  let fixture: ComponentFixture<StudentParentGardianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentParentGardianComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentParentGardianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
