import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Issue } from '../domain/Issue';

@Injectable()
export class IssuesService {
  constructor(private http: HttpClient) { }

  public getAll(): Observable<Array<Issue>> {
    return this.http.get<Array<Issue>>('/assets/issues.json');
  }

  public get(id: number): Observable<any> {
    return this.http.get('/assets/issue.json');
 }

  public getComments(id: number): Observable<any> {
    return this.http.get(`/assets/comments.json/${id}`);
  }

 // by me xD
  public add(issue: any): Observable<any> {
    return this.http.post('/assets/issues.json', issue);
  }

  public delete(issue: any): Observable<any> {
    return this.http.delete('/assets/issue.json', issue);
  }

  public update(issue: any): Observable<any> {
   return this.http.post('/assets/issue.json', issue);
  }

}
