import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VotePayload } from './vote.payload';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private httpClient: HttpClient) { }

  submitVote(votePayload: VotePayload): Observable<VotePayload> {
    console.log(votePayload);
    return this.httpClient.post<VotePayload>('http://localhost:8080/api/votes/', votePayload);
  }
}
