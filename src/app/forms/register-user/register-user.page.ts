import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';
import { School } from 'src/app/models/school';
import { Group } from 'src/app/models/group';
import { UserService } from 'src/app/services/user.service';
import { ConfigOptionsService } from 'src/app/services/config-options-service';
import { inputFormUser } from 'src/app/config';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.page.html',
  styleUrls: ['./register-user.page.scss'],
})
export class RegisterUserPage implements OnInit {

  @Output() form = new EventEmitter<string>();

  inputFormUser: any = inputFormUser;
  userlogin: User;

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
    private _configOptionservice: ConfigOptionsService,) { }

    ngOnInit() {
      this.userlogin = this._userService.getLocalStorage();
      this.inputFormUser = this._configOptionservice.configFormUser(this.userlogin.role);
      this._userService.getUsuarios().then((users: any) =>{
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
