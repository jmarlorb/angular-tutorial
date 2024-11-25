import { Component, OnInit } from '@angular/core';
import { Task, TaskPriority, TaskStatus } from '../../../models/task.model';
import { CommonModule } from '@angular/common';
import { TaskresumeComponent } from '../taskresume/taskresume.component';
import { TaskEvent } from '../../../models/taskevent.model';
import { TaskformComponent } from '../taskform/taskform.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasklist',
  standalone: true,
  imports: [CommonModule, TaskresumeComponent,FormsModule,TaskformComponent],
  templateUrl: './tasklist.component.html',
  styleUrl: './tasklist.component.css'
})
export class TasklistComponent implements OnInit{
  taskList:Task[] = [];
  
  ngOnInit(): void {
    let task1:Task = new Task (1,"Tarea 1", "Tarea 1",TaskPriority.LOW,TaskStatus.PENDING,new Date("11/1/2024"),new Date("11/18/2024"),false);
    let task2:Task = new Task (2,"Tarea 2", "Tarea 2",TaskPriority.HIGH,TaskStatus.IN_PROGRESS,new Date("11/5/2024"),new Date("11/16/2024"),false);
    let task3:Task = new Task (3,"Tarea 3", "Tarea 3",TaskPriority.LOW,TaskStatus.IN_PROGRESS,new Date("11/21/2024"),new Date("11/30/2024"),false);
    let task4:Task = new Task (4,"Tarea 4", "Tarea 4",TaskPriority.HIGH,TaskStatus.COMPLETED,new Date("11/8/2024"),new Date("11/21/2024"),false);
    let task5:Task = new Task (5,"Tarea 5", "Tarea 5",TaskPriority.MEDIUM,TaskStatus.PENDING,new Date("11/10/2024"),new Date("11/30/2024"),false);
    this.taskList = [task1,task2,task3,task4,task5];
  }

  modifyTask(taskevent: TaskEvent){
    switch(taskevent.action){
      case "raiseTaskPriority": this.raiseTaskPriority(taskevent.taskId); break;
      case "lowerTaskPriority": this.lowerTaskPriority(taskevent.taskId); break;
      case "changeTaskStatus": this.changeTaskStatus(taskevent.taskId); break;
      case "editTask": this.editTask(taskevent.taskId); break;
      case "deleteTask": this.deleteTask(taskevent.taskId); break;
    }
  }

  getTask(taskId:number):Task[]{
    return this.taskList.filter((tarea:Task)=>{
      return tarea.id == taskId;
    });
  }

  raiseTaskPriority(taskId:number){
    let tarea:Task = this.getTask(taskId)[0];
    tarea.raisePriority();
  }

  lowerTaskPriority(taskId:number){
    let tarea:Task = this.getTask(taskId)[0];
    tarea.lowerPriority();
  }

  changeTaskStatus(taskId:number){
    let tarea:Task = this.getTask(taskId)[0];
    tarea.changeStatus();
  }

  editTask(taskId:number){
   console.log(`Editing Task with identifier ${taskId}`);
  }

  deleteTask(taskId:number){
    this.taskList = this.taskList.filter((tarea:Task)=>{
      return tarea.id != taskId;
    });
  }
}