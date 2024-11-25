import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskresumeComponent } from './taskresume.component';

describe('TaskresumeComponent', () => {
  let component: TaskresumeComponent;
  let fixture: ComponentFixture<TaskresumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskresumeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskresumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
