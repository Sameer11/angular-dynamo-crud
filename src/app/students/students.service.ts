import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
    
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
   
import { Student } from './students';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private apiURL = "http://localhost:3000";
    
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
   
  constructor(private httpClient: HttpClient) { }
    
  getAll(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.apiURL + '/students/')
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  create(student: Student): Observable<Student> {
    return this.httpClient.post<Student>(this.apiURL + '/students/', JSON.stringify(student), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  
    
  find(studentId: string): Observable<Student> {
    return this.httpClient.get<Student>(this.apiURL + '/students/' + studentId)
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  update(studentId: string, students: any): Observable<Student> {
    return this.httpClient.put<Student>(this.apiURL + '/posts/' + studentId, JSON.stringify(students), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  delete(studentId: string){
    return this.httpClient.delete<Student>(this.apiURL + '/students/' + studentId, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
     
   
  errorHandler(error: any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}
