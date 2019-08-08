import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import {Users} from '../users';
@Injectable({
  providedIn: 'root'
})
export class UserAddService {

    private productURL='http://localhost:3000/users';
    private productpostURL='http://localhost:3000/users';
  //private signUpAPI = 'https://apigatewayff.herokuapp.com/api/user/signup';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

constructor(private http: HttpClient) { }


getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.productURL).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

createUser(UserObj): Observable<any> {
    console.log(UserObj);
    
  return this.http.post<any>(this.productURL, JSON.stringify(UserObj), this.httpOptions).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
  );
}

deleteUserById(ID){
  console.log(ID);
  
  return this.http.delete(this.productURL + '/' + ID).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
}
private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
        errorMessage = `An Error Occured: ${errorMessage}`;
    } else {
        errorMessage = `Server returned code: ${err.status}, error message is ${err.message}`;
    }

    return throwError(errorMessage);
}


}