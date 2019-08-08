import { Component, OnInit } from '@angular/core';
import {DatePipe} from '@angular/common';
import { UserAddService } from '../services/userAdd.service';
import { Users } from '../users';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addProject',
  templateUrl: './addProject.component.html',
  styleUrls: ['./addProject.component.css']
})
export class AddProjectComponent implements OnInit {

  shown: boolean
  model : boolean=false
  users: Users[]
  errorMessage: string;
  setpoint: any
  constructor(private datePipe: DatePipe,  private userService: UserAddService, private http: HttpClient, private router: Router,) { 
  }
  
  ngOnInit() {
    
      var today = this.datePipe.transform(new Date(),"dd-MM-yyyy");
      console.log(today);
      
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
      
    this.userService.getUsers().subscribe(
      users => {
        this.users = users;
        // this.filteredProducts = this.products;
      },
      error => this.errorMessage = <any>error
    )

  }

  //   range: any = 0;
  // onRangeValueChange(event: any) {
  //   console.log(1);
    
  //   const value = event.value;
  //   this.range = value;
  //   console.log(this.range);
    
  // }
 

 putSetpoint( value: number) {
    console.log(value);
    this.setpoint = value;
}

}
