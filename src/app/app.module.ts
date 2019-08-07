import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddUserComponent } from './addUser/addUser.component';
import { AddProjectComponent } from './addProject/addProject.component';
import { ViewTaskComponent } from './viewTask/viewTask.component';
import { AddTaskComponent } from './addTask/addTask.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateTaskComponent } from './updateTask/updateTask.component';
import { HttpClientModule , HttpClient} from '@angular/common/http';
import {DatePipe} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    AddProjectComponent,
    ViewTaskComponent,
    AddTaskComponent,
    UpdateTaskComponent
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule 
  ],
  providers: [HttpClientModule,HttpClient, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
