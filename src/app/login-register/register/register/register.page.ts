import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user: User = null;
  name: string;
  username: string;
  password: string;
  role: string;

  constructor(private _userService: UserService) { }

  ngOnInit() {
  }

  private logForm(){
    this.user = new User(this.name, this.username, this.password, this.role);
    this._userService.crearUsuario(this.user);
    console.log(this.user);
  }

}
