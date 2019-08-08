import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewtask',
  templateUrl: './viewTask.component.html',
  styleUrls: ['./viewTask.component.css']
})
export class ViewTaskComponent implements OnInit {

  public dummyTasks: any = [
    {
      id: 1,
      task: 'task1',
      parent: 'parent1',
      priority: 1,
      startDate: '10/31/2010',
      endDate: '10/11/2020',
      completed: false
    },
    {
      id: 2,
      task: 'task2',
      parent: 'parent2',
      priority: 2,
      startDate: '10/28/2010',
      endDate: '10//10/2020',
      completed: false
    },
    {
      id: 3,
      task: 'task3',
      parent: 'parent3',
      priority: 4,
      startDate: '12/12/2014',
      endDate: '11/10/2050',
      completed: true
    },
    {
      id: 4,
      task: 'task4',
      parent: 'parent4',
      priority: 3,
      startDate: '05/05/2015',
      endDate: '11/10/2020',
      completed: true
    }
  ];

  public taskCopy: Array<any> = [];

  public viewTaskForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { }

  public ngOnInit(): void {
    this.viewTaskForm = this.fb.group({
      project: ['']
    });
    this.dummyTasks.forEach( i => {
      this.taskCopy.push(
      {
        id: i.id,
        task: i.task,
        parent: i.parent,
        priority: i.priority,
        startDate: i.startDate,
        endDate: i.endDate,
        completed: i.completed
      });
   });
  }

  public searchProject(): void {
    console.log(this.viewTaskForm.controls.project.value);
  }

  public sortStartDate(): void {
    this.dummyTasks.sort((a, b) =>
    new Date(a.startDate) < new Date(b.startDate) ? -1 : new Date(a.startDate) > new Date(b.startDate) ? 1 : 0);
  }

  public sortEndDate(): void {
    this.dummyTasks.sort((a, b) => new Date(a.endDate) < new Date(b.endDate) ? -1 : new Date(a.endDate) > new Date(b.endDate) ? 1 : 0);
  }

  public sortPriority(): void {
    this.dummyTasks.sort((a, b) => a.priority < b.priority ? -1 : a.priority > b.priority ? 1 : 0)
  }

  public sortCompleted(): void {
    this.dummyTasks = this.dummyTasks.filter(data => data.completed === true);
  }

  public refresh(): void {
    this.dummyTasks = [];
    this.taskCopy.forEach( i => {
      this.dummyTasks.push(
      {
        id: i.id,
        task: i.task,
        parent: i.parent,
        priority: i.priority,
        startDate: i.startDate,
        endDate: i.endDate,
        completed: i.completed
      });
   });
  }

  public endTask(): void {

  }

  public editTask(ID: number): void {
    this.router.navigate(['/updatetask'], { queryParams: { page: 'updateTask', id: ID} });
  }


}
