import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../domain/User';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IssuesService } from '../../shared/issues.service';
import { UsersService } from '../../shared/users.service';


@Component({
  selector: 'app-issue-add',
  templateUrl: './issue-add.component.html',
  styleUrls: ['./issue-add.component.css']
})
export class IssueAddComponent implements OnInit {
  users: User[]; // drop down list of users
  public issueForm: FormGroup;

  constructor(
    private router: Router,
    private issuesService: IssuesService,
    private usersService: UsersService,
    fb: FormBuilder) {
      this.issueForm = fb.group({
        id: null,
        label:
          [null, // defaultvalue
          [Validators.required, Validators.minLength(2)],
          null], // no async validators
        description: [null, Validators.required],
        assignedTo: [null, Validators.required]
      });
  }

  ngOnInit() {
    this.usersService.getAll().subscribe(res => {
      this.users = res;
    });
  }

  reset() {
    this.issueForm.reset();
  }

  onSave() {
    console.log(this.issueForm.value);
    this.issuesService.add(this.issueForm.value).subscribe(res => {
      this.router.navigate(['issues']);
      // this.reset();
    });
  }

}
