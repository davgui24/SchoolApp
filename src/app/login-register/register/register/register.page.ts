import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from 'src/app/services/user.service';
import { School } from '../../../models/school';
import { Group } from '../../../models/group';
import { ConfigOptionsService } from 'src/app/services/config-options-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  users: User[] = [];
  user: User = null;
  name: string;
  username: string;
  password: string;
  school: School;
  role: string;
  group: Group;
  students: User;

  constructor(private _userService: UserService,
              private _configOptionsService: ConfigOptionsService) { }

  ngOnInit() {
    this._userService.getUsuarios().then((users: any) =>{
      console.log('Esperando');
      if(users){
        this.users = users;
        // console.log('Usuarios', users);
        // console.log(this._configOptionsService.configFormUser(this.users[0].role));;
      }
    })
  }

  private registerForm(){
    this.user = new User(this.name, this.username, this.password, this.role);
    this._userService.crearUsuario(this.user);
    this.name = '';
    this.username = '';
    this.password = '';
    this.role = '';
    this.school = null;
    this.group = null;
    this.students = null;

    // console.log(this.user);
  }

}
