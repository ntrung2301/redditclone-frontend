import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentPayload } from './comment.payload';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }

  postComment(comment: CommentPayload): Observable<any> {
    return this.httpClient.post<any>('http://localhost:8080/api/comments/', comment);
  }

  getAllCommentsByPost(postId: number): Observable<CommentPayload[]> {
    return this.httpClient.get<CommentPayload[]>('http://localhost:8080/api/comments/by-post/'+ postId + "/");
  }


  getAllCommentsByUser(username: string): Observable<CommentPayload[]> {
    return this.httpClient.get<CommentPayload[]>('http://localhost:8080/api/comments/by-user/' + username);
  }
}
