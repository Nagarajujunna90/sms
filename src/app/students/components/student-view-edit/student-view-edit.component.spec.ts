import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentViewEditComponent } from './student-view-edit.component';

describe('StudentViewEditComponent', () => {
  let component: StudentViewEditComponent;
  let fixture: ComponentFixture<StudentViewEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentViewEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentViewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
