import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { IssueListingComponent } from './issues/issue-listing/issue-listing.component';
import { IssueAddComponent } from './issues/issue-add/issue-add.component';
import { IssueEditComponent } from './issues/issue-edit/issue-edit.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './shared/auth-guard.service';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'issues', component: IssueListingComponent, canActivate: [ AuthGuardService ]},
  {path: 'issues/create', component: IssueAddComponent},
  {path: 'issues/:id', component: IssueEditComponent},
  {path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
