import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksummaryComponent } from './tasksummary.component';

describe('TasksummaryComponent', () => {
  let component: TasksummaryComponent;
  let fixture: ComponentFixture<TasksummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
