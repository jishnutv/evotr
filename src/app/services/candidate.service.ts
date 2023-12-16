import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CandidatesResponse } from '../interfaces/candidates-response';
import { Observable, catchError } from 'rxjs';
import { Candidate } from '../interfaces/candidate';
import { CandidateResponse } from '../interfaces/candidate-response';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private http: HttpClient) { }

  url = 'http://127.0.0.1:8000/api/v1';

  getCandidates(id: string): Observable<CandidatesResponse> {
    return this.http.get<CandidatesResponse>(`${this.url}/candidates/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        throw new Error(error.statusText);
      })
    );
  }

  createCandidate(data: Candidate): Observable<CandidateResponse> {
    return this.http.post<CandidateResponse>(`${this.url}/create-candidate`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        throw error;
      })
    );
  }

  deleteCandidate(id: string): Observable<CandidateResponse> {
    return this.http.delete<CandidateResponse>(`${this.url}/delete-candidate/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        throw error;
      })
    );
  }
}
