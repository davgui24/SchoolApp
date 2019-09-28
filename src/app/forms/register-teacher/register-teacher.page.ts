import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-register-teacher',
  templateUrl: './register-teacher.page.html',
  styleUrls: ['./register-teacher.page.scss'],
})
export class RegisterTeacherPage implements OnInit {

  user: User;


  constructor( private _userService: UserService) { }

  ngOnInit() {

    this.user=this._userService.getLocalStorage();
    
  }

}
