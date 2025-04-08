import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPreviousEducationComponent } from './student-previous-education.component';

describe('StudentPreviousEducationComponent', () => {
  let component: StudentPreviousEducationComponent;
  let fixture: ComponentFixture<StudentPreviousEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentPreviousEducationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentPreviousEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
