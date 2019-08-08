import { Component, OnInit } from '@angular/core';
import {DatePipe} from '@angular/common';
import { UserAddService } from '../services/userAdd.service';
import { Users } from '../users';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder , Validators} from '@angular/forms';

@Component({
  selector: 'app-addProject',
  templateUrl: './addProject.component.html',
  styleUrls: ['./addProject.component.css']
})
export class AddProjectComponent implements OnInit {
  
  public addProject: FormGroup;
  shown: boolean
  model : boolean=false
  users: Users[]
  errorMessage: string;
  setpoint: any;
  display: false;
  public isUpdatePage = false;
  public updateId: number;

  constructor(private datePipe: DatePipe,private fb: FormBuilder, private route: ActivatedRoute ,  private userService: UserAddService, private http: HttpClient, private router: Router,) { 
  }
  
  public dummyProjects: any = [
    {
      id:1,
      project:'Aetna',
      priority: 1,
      nooftask: 6,
      startDate: '10/28/2010',
      endDate:'10//10/2020',
      completed: false
    },
    {
      id:2,
      project:'Cigna',
      priority: 3,
      nooftask: 6,
      startDate: '10/28/2015',
      endDate:'10//10/2025',
      completed: false
    },
    {
      id:3,
      project:'Wells Fargo',
      priority: 4,
      nooftask: 11,
      startDate: '10/28/2015',
      endDate:'10//10/2021',
      completed: true
    },
    {
      id:3,
      project:'Bofa',
      priority: 2,
      nooftask: 5,
      startDate: '10/28/2011',
      endDate:'10//10/2026',
      completed: true
    }
  ];

  public taskCopy: Array<any> = [];



  public ngOnInit(): void {
      
      var today = this.datePipe.transform(new Date(),"dd-MM-yyyy");
      console.log(today);
      this.addProject = this.fb.group({
      project: [''],
      startDate: [''],
      endDate: [''],
      priority: [''],
      manager  : [''],
    });


    this.dummyProjects.forEach( i => {
      this.taskCopy.push(
      {
        id: i.id,
        project:i.project,
        priority: i.priority,
        nooftask: i.nooftask,
        startDate: i.startDate,
        endDate: i.endDate,
        completed: i.completed
      });
   });


    if (this.route.snapshot.queryParamMap.get('page') != null) {
      this.isUpdatePage = true;
      this.updateId =  +this.route.snapshot.queryParamMap.get('id');
      // call the service and get values
      this.initializeDataForUpdatedForm();
    } else {
     this.initializeDataForNewForm();
   }

  }


  public initializeDataForNewForm(): void {
    this.addProject = this.fb.group({
          project: [''],
          priority: [''],
          startDate: [''],
          endDate: [''],
          manager  : [''], 
        });
  }



  public initializeDataForUpdatedForm(): void {
    this.addProject = this.fb.group({
      project: ['prefilled', Validators.required],
      priority: [20],
 
      startDate: ['20/20/2020'],
      endDate: ['20/20/2020'],
      manager: ['Shlok Patel', Validators.required]
    });
  }
  

public reset(): void {
    this.addProject.controls.project.setValue(null);
    this.addProject.controls.priority.setValue(50);
    this.addProject.controls.startDate.setValue(null);
    this.addProject.controls.endDate.setValue(null);
    this.addProject.controls.manager.setValue(null);
  }

  public addnewProject(): void {
    const newTaskData = {
      project: this.addProject.controls.project.value,
      priority: this.addProject.controls.priority.value,
      startDate: this.addProject.controls.startDate.value,
      endDate: this.addProject.controls.endDate.value,
      manager: this.addProject.controls.manager.value,
    };
    // call the service for sending the data
    console.log(newTaskData);
  }



  public updateProject(): void {
    const updateTaskData = {
      project: this.addProject.controls.project.value,
      priority: this.addProject.controls.priority.value,
      startDate: this.addProject.controls.startDate.value,
      endDate: this.addProject.controls.endDate.value,
      manager: this.addProject.controls.user.value,
    };
    // call the service for sending the data
    console.log(updateTaskData);
  }


  selectmanager(){
    manager: this.addProject.controls.manager.value;
    this.display!=this.display;


  }
  checked(value){
    const ele = document.getElementById("abc") as HTMLInputElement;

    if(ele.checked==true){
      this.shown= true
    }
    else if(ele.checked==false)
      this.shown= false;
  }

  onClick(){
    this.model=true
      
    // this.userService.getUsers().subscribe(
    //   users => {
    //     this.users = users;
    //     // this.filteredProducts = this.products;
    //   },
    //   error => this.errorMessage = <any>error
    // )

  }
 public searchProject(): void {
    console.log(this.addProject.controls.project.value);
  }

  public sortStartDate(): void {
    this.dummyProjects.sort((a, b) =>
    new Date(a.startDate) < new Date(b.startDate) ? -1 : new Date(a.startDate) > new Date(b.startDate) ? 1 : 0);
  }

  public sortEndDate(): void {
    this.dummyProjects.sort((a, b) => new Date(a.endDate) < new Date(b.endDate) ? -1 : new Date(a.endDate) > new Date(b.endDate) ? 1 : 0);
  }

  public sortPriority(): void {
    this.dummyProjects.sort((a, b) => a.priority < b.priority ? -1 : a.priority > b.priority ? 1 : 0)
  }

  public sortCompleted(): void {
    this.dummyProjects = this.dummyProjects.filter(data => data.completed === true);
  }

  public endTask(): void {

  }

 putSetpoint( value: number) {
    console.log(value);
    this.setpoint = value;
}




  public editProject(ID: number): void {
    this.router.navigate(['/updateProject'], { queryParams: { page: 'updateProject', id: ID} });
  }

}
