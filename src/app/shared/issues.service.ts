import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Issue } from '../domain/Issue';
import { Comment } from './../domain/Comment';

@Injectable()
export class IssuesService {
  private BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

/*
  public getAll(): Observable<Array<Issue>> {
    return this.http.get<Array<Issue>>('/assets/issues.json');
  }

  public get(id: number): Observable<any> {
    return this.http.get('/assets/issue.json');
  }

  public getComments(id: number): Observable<any> {
    return this.http.get('/assets/comments.json');
  }
*/

  public getAll(): Observable<Array<Issue>> {
    return this.http.get<Array<Issue>>(`${this.BASE_URL}/issues`, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`)
    });
  }

  public get(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/issues/${id}`);
  }

  public getComments(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/comments/${id}`);
  }

  public addComment(id: number, comment: Comment): Observable<any> {
    return this.http.post(`${this.BASE_URL}/comments/${id}`, comment ,
      { responseType: 'text' }
    );
  }

  public add(issue: Issue): Observable<any> {
    return this.http.post(`${this.BASE_URL}/issues`, issue,
       { responseType: 'text' }
    );
  }

  public update(issue: Issue): Observable<any> {
    return this.http.put(`${this.BASE_URL}/issues/${issue.id}`, issue);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/issues/${id}`,
      { responseType: 'text' }
    );
  }
}
