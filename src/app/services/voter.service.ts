import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { VoterResponse } from '../interfaces/voter-response';
import { VotersResponse } from '../interfaces/voters-response';

@Injectable({
  providedIn: 'root'
})
export class VoterService {

  constructor(private http: HttpClient) { }

  url = 'http://127.0.0.1:8000/api/v1';

  getVoters(): Observable<VotersResponse> {
    return this.http.get<VotersResponse>(`${this.url}/voters`).pipe(
      catchError((error: HttpErrorResponse) => {
        throw new Error(error.statusText);
      })
    );
  }

  getVoter(id: string): Observable<VoterResponse> {
    return this.http.get<VoterResponse>(`${this.url}/voters/${id}`).pipe(
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

  updateVoter(data: { fname: string, lname: string, phone: string }, id: string): Observable<VoterResponse> {
    return this.http.put<VoterResponse>(`${this.url}/update-voter/${id}`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        throw error;
      })
    );
  }

  changePassword(data: { password: string, current_password: string }, id: string): Observable<VoterResponse> {
    console.log(`${this.url}/change-password/${id}`);
    return this.http.put<VoterResponse>(`${this.url}/change-password/${id}`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        throw error;
      })
    );
  }
}