import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { ElectionsResponse } from '../interfaces/elections-response';
import { ElectionResponse } from '../interfaces/election-response';

@Injectable({
  providedIn: 'root'
})
export class ElectionService {

  constructor(private http: HttpClient) { }

  url = 'http://127.0.0.1:8000/api/v1';

  getElections(): Observable<ElectionsResponse> {
    return this.http.get<ElectionsResponse>(`${this.url}/elections`).pipe(
      catchError((error: HttpErrorResponse) => {
        throw new Error(error.statusText);
      })
    );
  }

  createElection(data: { title: string }): Observable<ElectionResponse> {
    return this.http.post<ElectionResponse>(`${this.url}/create-election`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        throw error;
      })
    );
  }

  deleteElection(id: string): Observable<ElectionResponse> {
    return this.http.delete<ElectionResponse>(`${this.url}/delete-election/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        throw error;
      })
    );
  }
}
