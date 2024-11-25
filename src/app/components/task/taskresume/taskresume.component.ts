import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task, TaskPriority, TaskStatus } from '../../../models/task.model';
import { CommonModule } from '@angular/common';
import { TaskEvent } from '../../../models/taskevent.model';

@Component({
  selector: 'app-taskresume',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './taskresume.component.html',
  styleUrl: './taskresume.component.css'
})
export class TaskresumeComponent {
  @Input()
  taskInput:Task = new Task (1,"Tarea 1", "Descripción Tarea 1", TaskPriority.LOW, TaskStatus.PENDING, new Date("11/1/2024"), new Date("11/18/2024"),false);

  @Output()
  eventsTaskModify = new EventEmitter<TaskEvent>();

  raiseTaskPriority(taskId:number){
    this.eventsTaskModify.emit(new TaskEvent("raiseTaskPriority", taskId));
  }

  lowerTaskPriority(taskId:number){
    this.eventsTaskModify.emit(new TaskEvent("lowerTaskPriority", taskId));
  }

  changeTaskStatus(taskId:number){
    this.eventsTaskModify.emit(new TaskEvent("changeTaskStatus", taskId));
  }

  editTask(taskId:number){
    this.eventsTaskModify.emit(new TaskEvent("editTask", taskId));
  }
  
  deleteTask(taskId:number){
    this.eventsTaskModify.emit(new TaskEvent("deleteTask", taskId));
  }
}
