import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { VoterResponse } from '../interfaces/voter-response';

@Injectable({
  providedIn: 'root'
})
export class VoterService {

  constructor(private http: HttpClient) { }

  url = 'http://127.0.0.1:8000/api/v1';

  getVoter(): Observable<VoterResponse> {
    return this.http.get<VoterResponse>(`${this.url}/voters/1`).pipe(
      catchError((error: HttpErrorResponse) => {
        throw new Error(error.statusText);
      })
    );
  }

  regVoter(data: { email: string, password: string }): Observable<VoterResponse> {
    return this.http.post<VoterResponse>(`${this.url}/voter-register`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        throw error;
      })
    );
  }
}