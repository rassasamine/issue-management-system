import { Component, OnInit, Input } from '@angular/core';
import { Issue } from '../../domain/Issue';
import { Observable } from 'rxjs';
import { IssuesService } from '../../shared/issues.service';
import * as EventSource from 'eventsource';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  @Input()
  latestFirst = true;
  issues: Array<Issue>;
  url = 'http://localhost:8082/ims-issues/resources/feed';

  constructor(private issuesService: IssuesService) {
    this.issues = [];
  }

  ngOnInit() {
    this.getFeedData(this.url).subscribe(data => {
      if (this.latestFirst) {
        this.issues.unshift(data.instance);
      } else {
        this.issues.push(data.instance);
      }
    }, err => console.error('Error occurred: ' + err));
  }

  getFeedData(url): Observable<any> {
    const observable = Observable.create(observer => {
    const eventSource = new EventSource(url);

    eventSource.onmessage = x => observer.next(JSON.parse(x.data));
    eventSource.onerror = x => observer.error(console.log('EventSource failed'));

    return () => { eventSource.close(); };
    });
    return observable;
  }
}
