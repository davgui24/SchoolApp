import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-list-admins',
  templateUrl: './list-admins.page.html',
  styleUrls: ['./list-admins.page.scss'],
})
export class ListAdminsPage implements OnInit {
  user: User;
  users: User[] = [];

  constructor(
               private _userService: UserService) { }

  ngOnInit() {
    this.user = this._userService.getLocalStorage();
    this.users = this._userService.getTeachersByAdmin(this.user);
    console.log('Estos son los Teachers', this.users);
  }

}
