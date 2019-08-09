import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() data: [];
  @Input() flag: string;

  @Output() projectName = new EventEmitter<string>();
  @Output() taskName = new EventEmitter<string>();
  @Output() userName = new EventEmitter<string>();
  @Output() closFlag = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() { }

  public close(): void {
    this.data = [];
    this.flag = '';
    this.closFlag.emit(false);
  }

  public selectTask(task: string): void {
    this.close();
    this.taskName.emit(task);
  }

  public selectUser(user: any): void {
    this.userName.emit(`${user.firstName} ${user.lastName}`);
    this.close();
  }

  public selectProject(name: string, ID: number): void {
    const projectDetails: any = {
      projectName: name,
      Id: +ID
    };
    this.projectName.emit(projectDetails);
    this.close();
  }

}
