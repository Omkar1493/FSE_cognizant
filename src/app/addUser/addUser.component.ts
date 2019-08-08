import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAddService } from '../services/userAdd.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adduser',
  templateUrl: './addUser.component.html',
  styleUrls: ['./addUser.component.css']
})
export class AddUserComponent implements OnInit {
  public users = [
    {
      firstName: 'abcccczzzz',
      lastName: 'Patel',
      ID: '12'
    }, {
      firstName: 'abccaaaaaa',
      lastName: 'Bapat',
      ID: '50'
    }, {
      firstName: 'xyz',
      lastName: 'abc',
      ID: '100'
    }
  ];

  public useradd: FormGroup;
  public isEdit = false;
  public errorMessage: string;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserAddService) { }

  public ngOnInit(): void {
    this.useradd = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      ID: ['' , Validators.required]
    });
  }

  public reset(): void {
    this.useradd.controls.firstName.setValue('');
    this.useradd.controls.lastName.setValue('');
    this.useradd.controls.ID.setValue('');
  }

  public editData(user: any): void {
    this.isEdit = true;
    this.useradd.controls.firstName.setValue(user.firstName);
    this.useradd.controls.lastName.setValue(user.lastName);
    this.useradd.controls.ID.setValue(user.ID);
  }

  public cancel(): void {
    this.isEdit = false;
    this.useradd.controls.firstName.setValue('');
    this.useradd.controls.lastName.setValue('');
    this.useradd.controls.ID.setValue('');
  }

  public sortFirstName(): void {
    this.users.sort((a, b) =>
      a.firstName.toLowerCase() < b.firstName.toLowerCase() ? -1 : a.firstName.toLowerCase() > b.firstName.toLowerCase() ? 1 : 0);
  }

  public sortLastName(): void {
    this.users.sort((a, b) =>
      a.lastName.toLowerCase() < b.lastName.toLowerCase() ? -1 : a.lastName.toLowerCase()> b.lastName.toLowerCase() ? 1 : 0);
  }

  public sortID(): void {
    this.users.sort((a, b) => +a.ID < +b.ID ? -1 : +a.ID > +b.ID ? 1 : 0);
  }


  public update(): void {

  }

  // public getUser(): void {
  //   this.userService.getUsers().subscribe(users => {
  //       this.users = users;
  //     },
  //     error => this.errorMessage = <any>error
  //   );
  // }

  // public signUp(): void {
  //   if (this.useradd.valid) {
  //     this.userService.createUser(this.useradd.value).subscribe(response =>  {
  //         this.userService.getUsers().subscribe(users => {
  //         this.users = users;
  //         this.router.navigate([''])
  //     },
  //     error => this.errorMessage = <any>error
  //     );
  //   },
  //     error => this.errorMessage = error as any
  //   );
  //   }
  // }

  // public deleteUser(ID: string): void {
  //   this.userService.deleteUserById(ID).subscribe(response =>  {
  //     this.userService.getUsers().subscribe(
  //     users => {
  //       this.users = users;
  //       this.router.navigate([''])
  //     },
  //     error => this.errorMessage = <any>error
  //     );
  //   },
  //   error => this.errorMessage = error as any
  //   );
  // }

}
