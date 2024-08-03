import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Comment {
  id?: number;
  postId: number;
  userId: number;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:3002/api/comments';

  constructor(private http: HttpClient) { }

  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.apiUrl, comment);
  }

  getComments(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/${postId}`);
  }
}