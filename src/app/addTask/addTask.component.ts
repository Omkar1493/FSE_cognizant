import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskData } from '../dummyData/taskData';
import { ProjectData } from '../dummyData/projectData';
import { UsersData } from '../dummyData/usersData';

@Component({
  selector: 'app-addtask',
  templateUrl: './addTask.component.html',
  styleUrls: ['./addTask.component.css']
})
export class AddTaskComponent implements OnInit {

  public addTaskGroup: FormGroup;
  public isUpdatePage = false;
  public updateId: number;
  public show = false;
  public isProjectSearched = false;
  public isParentTaskSearched = false;
  public isUserSearched = false;

  public modalProjectData: any;
  public modalParentTaskData: any;
  public modalUserData: any;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute ) { }

  public ngOnInit(): void {
    if (this.route.snapshot.queryParamMap.get('page') != null) {
      this.isUpdatePage = true;
      this.updateId =  +this.route.snapshot.queryParamMap.get('id');
      // call the service and get values
      this.initializeDataForUpdatedForm(this.updateId);
    } else {
     this.initializeDataForNewForm();
   }
  }

  public initializeDataForNewForm(): void {
    this.addTaskGroup = this.fb.group({
      project: ['', Validators.required],
      task: ['', Validators.required],
      parentTaskCheckbox: [ true ],
      priority: [50],
      parentTask: [''],
      startDate: [''],
      endDate: [''],
      user: ['', Validators.required]
    });
  }

  public initializeDataForUpdatedForm(Id: number): void {
    // code to be removed after API is developed
    // ----------------------- //

    let task: any;
    let project: any;
    let person: any;
    TaskData.taskArray.forEach(element => {
      if (element.taskId === Id) { task = element; }
    });
    ProjectData.projectArray.forEach(element => {
      if (element.projectId === task.projectId) { project = element; }
    });
    UsersData.usersArray.forEach(element => {
      if (element.taskId === Id) { person = element; }
    });

    // ----------------------- //
    this.addTaskGroup = this.fb.group({
      project: [ project.projectName, Validators.required],
      task: [ task.taskName, Validators.required],
      parentTaskCheckbox: [ true ],
      priority: [ task.priority],
      parentTask: [ task.parentId],
      startDate: [ task.startDate],
      endDate: [ task.endDate ],
      user: [`${person.firstName} ${person.lastName}`, Validators.required]
    });
  }

  public reset(): void {
    this.addTaskGroup.controls.project.setValue(null);
    this.addTaskGroup.controls.task.setValue(null);
    this.addTaskGroup.controls.parentTaskCheckbox.setValue(false);
    this.addTaskGroup.controls.priority.setValue(50);
    this.addTaskGroup.controls.parentTask.setValue(null);
    this.addTaskGroup.controls.startDate.setValue(null);
    this.addTaskGroup.controls.endDate.setValue(null);
    this.addTaskGroup.controls.user.setValue(null);
  }

  public cancel(): void {
    this.router.navigate(['/viewtask']);
  }

  public isParentTaskEnabled(): boolean {
    if (!this.addTaskGroup.controls.parentTaskCheckbox.value) {
      this.addTaskGroup.controls.parentTask.setValue(null);
      return false;
    }
    return true;
  }

  public searchProject(): void {
    console.log(this.addTaskGroup.controls.project.value);
    // call service and pass the value
    this.show = true;
    this.isProjectSearched = true;
    this.modalProjectData = ProjectData.projectArray;
  }

  public searchUser(): void {
    console.log(this.addTaskGroup.controls.user.value);
    // call service and pass the value
    this.show = true;
    this.isUserSearched = true;
    this.modalUserData = UsersData.usersArray;
  }

  public searchParentTask(): void {
    console.log(this.addTaskGroup.controls.parentTask.value);
    // call service and pass the value
    this.show = true;
    this.isParentTaskSearched = true;
    this.modalParentTaskData = TaskData.taskArray;
  }

  public addTask(): void {
    const newTaskData = {
      project: this.addTaskGroup.controls.project.value,
      task: this.addTaskGroup.controls.task.value,
      priority: this.addTaskGroup.controls.priority.value,
      parentTask: this.addTaskGroup.controls.parentTask.value,
      startDate: this.addTaskGroup.controls.startDate.value,
      endDate: this.addTaskGroup.controls.endDate.value,
      user: this.addTaskGroup.controls.user.value,
    };
    // call the service for sending the data
    console.log(newTaskData);
  }

  public updateTask(): void {
    const updateTaskData = {
      project: this.addTaskGroup.controls.project.value,
      task: this.addTaskGroup.controls.task.value,
      priority: this.addTaskGroup.controls.priority.value,
      parentTask: this.addTaskGroup.controls.parentTask.value,
      startDate: this.addTaskGroup.controls.startDate.value,
      endDate: this.addTaskGroup.controls.endDate.value,
      user: this.addTaskGroup.controls.user.value,
    };
    // call the service for sending the data
    console.log(updateTaskData);
  }

  public setUserName(data: any) {
    this.addTaskGroup.controls.user.setValue(data);
    this.show = false;
    this.isUserSearched = false;
    this.modalUserData = [];
  }

  public setTaskName(data: any) {
    this.addTaskGroup.controls.parentTask.setValue(data);
    this.show = false;
    this.isParentTaskSearched = false;
    this.modalParentTaskData = [];
  }

  public setProjectName(data: any) {
    this.addTaskGroup.controls.project.setValue(data.projectName);
    this.show = false;
    this.isProjectSearched = false;
    this.modalProjectData = [];
  }

  public setShowFlag(data: any) {
    this.show = data;
    this.isUserSearched = false;
    this.modalUserData = [];
    this.isProjectSearched = false;
    this.modalProjectData = [];
    this.isParentTaskSearched = false;
    this.modalParentTaskData = [];
  }

}
