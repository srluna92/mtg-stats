import { Component, OnInit } from '@angular/core';
import { User } from '../models';

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.css']
})
export class BracketComponent implements OnInit {

  users = new Array<User>();

  addUser(): void {
    this.users.push(new User());
  }

  createBracket(): void {

  }

  constructor() { }

  ngOnInit() {
    for (let i = 0; i < 3; i++) {
      this.users.push(new User());
    }
  }

}
