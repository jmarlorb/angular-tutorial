import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { dateIsAfterCurrentDateValidator, priorityValueIsWithinBounds } from './taskform.validators';
import { Task, TaskStatus } from '../../../models/task.model';

@Component({
  selector: 'app-taskform',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './taskform.component.html',
  styleUrl: './taskform.component.css'
})
export class TaskformComponent {
  @Input() taskToEdit: Task | null = null;
  @Output() taskCreated = new EventEmitter<Task>();
  formTaskEdit:FormGroup;

  constructor(formBuilder:FormBuilder){
    this.formTaskEdit = formBuilder.group({
      'name': ['',[Validators.required, Validators.maxLength(50)]],
      'description': ['',[Validators.maxLength(250)]],
      'priority': ['',[Validators.required, priorityValueIsWithinBounds()]],
      'expirationDate': ['',[Validators.required, dateIsAfterCurrentDateValidator()]]
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['taskToEdit'] && this.taskToEdit) {
      // Populate the form with the received task's data
      this.formTaskEdit.patchValue({
        name: this.taskToEdit.name,
        description: this.taskToEdit.description,
        priority: this.taskToEdit.priority,
        expirationDate: this.taskToEdit.expirationDate.toISOString().slice(0,16),
      });
    }
  }
  onSubmit():void{
    if (this.formTaskEdit.valid){
      const updatedTask = new Task(
        this.taskToEdit ? this.taskToEdit.id : Math.ceil(Math.random() * 500000), // Use existing ID or generate a new one
        this.formTaskEdit.value.name,
        this.formTaskEdit.value.description,
        this.formTaskEdit.value.priority,
        this.taskToEdit ? this.taskToEdit.status : TaskStatus.PENDING, // Retain the current status or set to PENDING
        this.taskToEdit ? this.taskToEdit.creationDate : new Date(), // Retain the creation date or use current date
        new Date(this.formTaskEdit.value.expirationDate),
        this.taskToEdit ? this.taskToEdit.isDelete : false // Retain the completed flag or default to false
      );
      this.taskCreated.emit(updatedTask);
    }
   else console.log(`El formulario tiene errores: ${JSON.stringify(this.formTaskEdit.get("name")?.errors)}`); 
  }
}
