import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Issue } from '../domain/Issue';
import { IssuesService } from '../shared/issues.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  issues$: Observable<Issue[]>;

  constructor(private issuesService: IssuesService) { }

  ngOnInit() {
    this.issues$ = this.issuesService.getAll();
  }

}
