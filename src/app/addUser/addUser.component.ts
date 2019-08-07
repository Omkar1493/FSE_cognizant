import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAddService } from '../services/userAdd.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Users } from '../users';

@Component({
  selector: 'app-addUser',
  templateUrl: './addUser.component.html',
  styleUrls: ['./addUser.component.css']
})
export class AddUserComponent implements OnInit {
        show: boolean = true
        user: Users[]
        user1: Users[];
        useradd: FormGroup;
        input: any
        errorMessage: string;
        users: Users[] = [];
    constructor(private fb: FormBuilder,private http: HttpClient, private router: Router, private userService: UserAddService) { }

  ngOnInit() {
    
        // initialize form value
        this.useradd = this.fb.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          ID: ['', Validators.required],
         });



        
    // this.userService.getUsers().subscribe(
    //   users => {
    //     this.users = users;
    //     // this.filteredProducts = this.products;
    //   },
    //   error => this.errorMessage = <any>error
    // )
  }

   
     signup() {
        if (this.useradd.value.firstName && this.useradd.value.lastName &&  this.useradd.value.ID) {
          this.userService.createUser(this.useradd.value).subscribe(
            response =>  {console.log(response.firstName);
             this.userService.getUsers().subscribe(
      users => {
        this.users = users;
        this.router.navigate([''])
        // this.filteredProducts = this.products;
      },
      error => this.errorMessage = <any>error
    ) },
            error => this.errorMessage = error as any
        );
        }
    
  }

  toggleview(user){
    this.user1=user
    this.show=false;

  }

}
