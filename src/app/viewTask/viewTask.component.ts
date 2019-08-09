import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectData } from '../dummyData/projectData';
import { TaskData } from '../dummyData/taskData';

@Component({
  selector: 'app-viewtask',
  templateUrl: './viewTask.component.html',
  styleUrls: ['./viewTask.component.css']
})
export class ViewTaskComponent implements OnInit {

  public show = false;
  public isProjectSearched = false;
  public modalProjectData: any;

  public dummyTasks: Array<any> = TaskData.taskArray;

  public viewTaskForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { }

  public ngOnInit(): void {
    this.viewTaskForm = this.fb.group({
      project: ['']
    });
  }

  public searchProject(): void {
    console.log(this.viewTaskForm.controls.project.value);
    // call service to backend for data
    this.show = true;
    this.isProjectSearched = true;
    this.modalProjectData = ProjectData.projectArray;
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
    this.dummyTasks = this.dummyTasks.filter(data => data.status === true);
  }

  public refresh(): void {
    this.dummyTasks = [];
    this.dummyTasks = TaskData.taskArray;
    this.viewTaskForm.controls.project.setValue('');
  }

  public endProject(): void {
  }

  public editTask(ID: number): void {
    this.router.navigate(['/updatetask'], { queryParams: { page: 'updateTask', id: ID} });
  }

  public setProjectName(data: any) {
    this.viewTaskForm.controls.project.setValue(data.projectName);
    this.show = false;
    this.isProjectSearched = false;
    this.modalProjectData = [];
    this.dummyTasks = [];
    TaskData.taskArray.forEach(element => {
      if (element.projectId === data.Id) {
        this.dummyTasks.push(element);
      }
    });
  }

  public setShowFlag(data: any) {
    this.show = data;
    this.isProjectSearched = false;
    this.modalProjectData = [];
  }

}

