import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAddService } from '../services/userAdd.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsersData } from '../dummyData/usersData';

@Component({
  selector: 'app-adduser',
  templateUrl: './addUser.component.html',
  styleUrls: ['./addUser.component.css']
})
export class AddUserComponent implements OnInit {
  public users: Array<any> = UsersData.usersArray;

  public useradd: FormGroup;
  public isEdit = false;
  public errorMessage: string;
  public userIdCurrentlyInEdit: number;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserAddService) { }

  public ngOnInit(): void {
    this.useradd = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      employeeId: ['' , Validators.required],
      search: ['']
    });
  }

  public reset(): void {
    this.useradd.controls.firstName.setValue('');
    this.useradd.controls.lastName.setValue('');
    this.useradd.controls.employeeId.setValue('');
  }

  public editData(user: any): void {
    this.isEdit = true;
    this.userIdCurrentlyInEdit = user.userId;
    this.useradd.controls.firstName.setValue(user.firstName);
    this.useradd.controls.lastName.setValue(user.lastName);
    this.useradd.controls.employeeId.setValue(user.employeeId);
  }

  public cancel(): void {
    this.isEdit = false;
    this.useradd.controls.firstName.setValue('');
    this.useradd.controls.lastName.setValue('');
    this.useradd.controls.employeeId.setValue('');
  }

  public sortFirstName(): void {
    this.users.sort((a, b) =>
      a.firstName.toLowerCase() < b.firstName.toLowerCase() ? -1 : a.firstName.toLowerCase() > b.firstName.toLowerCase() ? 1 : 0);
  }

  public sortLastName(): void {
    this.users.sort((a, b) =>
      a.lastName.toLowerCase() < b.lastName.toLowerCase() ? -1 : a.lastName.toLowerCase() > b.lastName.toLowerCase() ? 1 : 0);
  }

  public sortEmployeeId(): void {
    this.users.sort((a, b) => +a.employeeId < +b.employeeId ? -1 : +a.employeeId > +b.employeeId ? 1 : 0);
  }

  public update(): void {
    const editedUserData = this.users.forEach(user => {
      if (user.userId === this.userIdCurrentlyInEdit) {
        user.firstName = this.useradd.controls.firstName.value;
        user.lastName = this.useradd.controls.lastName.value;
        user.employeeId = this.useradd.controls.employeeId.value;
        user.projectId = 0;
        user.taskId = 0;
      }
    });
    alert('user updated');
    this.reset();
  }

  public searchOnChange(): void {
      this.users = UsersData.usersArray.filter(user => user.firstName.includes(this.useradd.controls.search.value));
  }

  public signUp(): void {
    const id: number = UsersData.usersArray.length + 2;
    const newUser: any = {
      userId: id,
      firstName: this.useradd.controls.firstName.value,
      lastName: this.useradd.controls.lastName.value ,
      employeeId: this.useradd.controls.employeeId.value,
      projectId: 0,
      taskId: 0
    };
    if (this.useradd.valid) {
      UsersData.usersArray.push(newUser);
      alert('User Added');
      this.reset();
    }
  }

  public deleteUser(employeeId: string): void {
    // this.userService.deleteUserById(+employeeId).subscribe();
  }

  // public getUser(): void {
  //   this.userService.getUsers().subscribe(users => {
  //       this.users = users;
  //     },
  //     error => this.errorMessage = <any>error
  //   );
  // }
}
