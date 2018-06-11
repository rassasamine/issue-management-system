import { Injectable } from '@angular/core';
import { User } from '../domain/User';

const DUMMY: User = {
  id: 1,
  name: 'bob'
};

@Injectable()
export class AuthService {
  constructor() { }

  public get currentUser() {
    return DUMMY;
  }
}
