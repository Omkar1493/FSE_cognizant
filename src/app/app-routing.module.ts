

import { AddTaskComponent } from './addTask/addTask.component';
import { AddProjectComponent } from './addProject/addProject.component';
import { AddUserComponent } from './addUser/addUser.component';
import { ViewTaskComponent } from './viewTask/viewTask.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [ 
    { path: '', component: AddUserComponent},

  { path: 'addtask', component: AddTaskComponent},
  // { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'addproject', component: AddProjectComponent },
  { path: 'viewtask', component: ViewTaskComponent },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule, ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }