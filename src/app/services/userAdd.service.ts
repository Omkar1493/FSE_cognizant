import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { tap, catchError, map, takeLast } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserAddService {
  private BASE_URL = 'http://localhost:3000';

  public projectData: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>(null);
  public taskDataByTaskNumber: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>(null);
  public taskDataByProjectId: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>(null);
  public userData: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>(null);

  public httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) { }

  // handle error
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }

  // get user by user name
  public getUsers(userName): BehaviorSubject<Array<any>> {
    this.http.get<any>(this.BASE_URL + '/users', {
      params: {
        search: userName,
      }, observe: 'response'
    }).subscribe(response => {
      const users: Array<any> = [];
      if (response.body.length > 0) {
        response.body.forEach(user => users.push({
          userID: user.userID,
          firstName: user.firstName,
          lastName: user.lastName,
          employeeId: user.employeeId,
          projectId: user.projectId,
          taskId: user.taskId,
          status: user.Status
        }));
      }
      return this.userData.next(users);
    });
    return this.userData;
  }

  // get projects by projectName
  public getProject(projectName): BehaviorSubject<Array<any>> {
    this.http.get<any>(this.BASE_URL + '/users', {
      params: {
        search: projectName,
      }, observe: 'response'
    }).subscribe(response => {
      const projects: Array<any> = [];
      if (response.body.length > 0) {
        response.body.forEach(project => projects.push({
          projectId: project.projectId,
          projectName: project.projectName,
          startDate: project.startDate,
          endDate: project.endDate,
          priority: project.priority,
        }));
      }
      return this.projectData.next(projects);
    });
    return this.projectData;
  }

  // get task by ProjectId
  public getTaskByProjectId(taskNumber): BehaviorSubject<Array<any>> {
    this.http.get<any>(this.BASE_URL + '/tasks', {
      params: {
        search: taskNumber,
      }, observe: 'response'
    }).subscribe(response => {
      const tasks: Array<any> = [];
      if (response.body.length > 0) {
        response.body.forEach(task => tasks.push({
          taskId: task.taskId,
          parentId: task.parentId,
          projectId: task.projectId,
          taskName: task.taskName,
          startDate: task.startDate,
          endDate: task.endDate,
          priority: task.priority,
        }));
      }
      return this.taskDataByProjectId.next(tasks);
    });
    return this.taskDataByProjectId;
  }

  // get task by task number
  public getTaskByTaskNumber(taskNumber): BehaviorSubject<Array<any>> {
    this.http.get<any>(this.BASE_URL + '/tasks', {
      params: {
        search: taskNumber,
      }, observe: 'response'
    }).subscribe(response => {
      const tasks: Array<any> = [];
      if (response.body.length > 0) {
        response.body.forEach(task => tasks.push({
          taskId: task.taskId,
          parentId: task.parentId,
          projectId: task.projectId,
          taskName: task.taskName,
          startDate: task.startDate,
          endDate: task.endDate,
          priority: task.priority,
        }));
      }
      return this.taskDataByTaskNumber.next(tasks);
    });
    return this.taskDataByTaskNumber;
  }

  // post task
  public postTask(task): BehaviorSubject<boolean> {
    const taskAdded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    this.http.post(this.BASE_URL + '/task', {
      parentID: task.parentID,
      projectID: task.projectID,
      task: task.task,
      startDate: task.startDate,
      endDate: task.endDate,
      priority: task.priority,
      status: task.status
    }, { responseType: 'text' }).subscribe((value) => {
      if (value.includes('Added')) {
        taskAdded.next(true);
      }
    });
    return taskAdded;
  }

  // post user
  public postUser(user): BehaviorSubject<boolean> {
    const userAdded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    this.http.post(this.BASE_URL + '/user', {
      firstName: user.firstName,
      lastName: user.lastName,
      employeeId: user.employeeId
    }, { responseType: 'text' }).subscribe((value) => {
      if (value.includes('Added')) {
        userAdded.next(true);
      }
    });
    return userAdded;
  }

  // put user by id
  public updateUser(user): void {
    this.http.put<any>(`${this.BASE_URL}/users/${user.ID}`, user, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // delete user by id
  public deleteUserById(id: number): Observable<{}> {
    const url = `${this.BASE_URL}/users/${id}`;
    return this.http.delete(url, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

}
