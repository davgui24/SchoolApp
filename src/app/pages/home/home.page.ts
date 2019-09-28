import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { SchoolService } from 'src/app/services/school.service';
import { School } from '../../models/school';
import { ConfigOptionsService } from 'src/app/services/config-options-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  userlogin: User;
  user: User;
  users: User[] = [];


  constructor(private activatedRoute: ActivatedRoute,
              private _userService: UserService,
              private _schoolService: SchoolService,
              private _configOptionservice: ConfigOptionsService) {  }

  ngOnInit() {
    this.userlogin = this._userService.getLocalStorage();
    this._configOptionservice.roleLogin.emit(this.userlogin.role);
  }

}
