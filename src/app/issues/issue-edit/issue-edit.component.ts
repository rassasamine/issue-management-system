import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { User } from '../../domain/User';
import { Issue } from '../../domain/Issue';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from './../../shared/auth.service';
import { IssuesService } from '../../shared/issues.service';
import { UsersService } from '../../shared/users.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-issue-edit',
  templateUrl: './issue-edit.component.html',
  styleUrls: ['./issue-edit.component.css']
})
export class IssueEditComponent implements OnInit {
  users: User[]; // drop down list of users
  public issueForm: FormGroup;
  issue: Issue;
  comment: string;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private issuesService: IssuesService,
    private authService: AuthService,
    fb: FormBuilder) {
    this.issueForm = fb.group({
      id: null,
      label: [null, [Validators.required, Validators.minLength(2)], null],
      description: [null, Validators.required],
      assignedTo: [null, Validators.required],
      created: null
    });
  }

  ngOnInit() {
    this.usersService.getAll().subscribe(res => {
      this.users = res;
    });

    this.route.params.subscribe((params: Params) => {
      const id = +params['id'];
      console.log('loading issue', id);

      /* The below is commented, but is a simple call to fetch issue list */
      // this.issuesService.get(id).subscribe( (issue: Issue) => {
      //   this.issue = issue;
      // })
      //  We fetch both issue detail and comments for the given issue in parallel
      const issueDetail = this.issuesService.get(id);
      const issueComments = this.issuesService.getComments(id);

      //  parallel call
      forkJoin([issueDetail, issueComments]).subscribe(results => {
        // results[0] is our issue
        // results[1] is our comments
        this.issue = results[0];
        this.issue.comments = results[1];
        console.log(this.issue);
        this.updateForm();
      });
    });
  }

  updateForm() {
    this.issueForm.patchValue({
      id: this.issue.id,
      label: this.issue.label,
      description: this.issue.description,
      assignedTo: {
        id: this.issue.assignedTo.id,
        name: this.issue.assignedTo.name
      }
    });
  }


  deleteIssue() {
    if (confirm('Are you sure you wish to delete?')) {
      this.issuesService.delete(this.issue.id).subscribe(res => {
        this.backToList();
      });
    }
  }

  backToList() {
    this.router.navigate(['/issues']);
  }

  reset() {
    this.issueForm.reset();
  }

  onSave() {
    this.issuesService.update(this.issueForm.value).subscribe(res => {
      this.reset();
    });
  }

}
