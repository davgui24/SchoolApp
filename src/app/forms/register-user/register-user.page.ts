import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';
import { School } from 'src/app/models/school';
import { Group } from 'src/app/models/group';
import { UserService } from 'src/app/services/user.service';
import { ConfigOptionsService } from 'src/app/services/config-options-service';
import { inputFormUser } from 'src/app/config';
import { SchoolService } from 'src/app/services/school.service';

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

  admins: User[] = [];
  schools: School[] = [];

  constructor(private _userService: UserService,
              private _schoolService: SchoolService,
              private _configOptionservice: ConfigOptionsService,) { }

    ngOnInit() {
      this.userlogin = this._userService.getLocalStorage();
      this.inputFormUser = this._configOptionservice.configFormUser(this.userlogin.role);
      console.log( this.inputFormUser );
      // this._userService.getUsuarios().then((users: User[]) =>{
      //   this.users = users;
      // })

      // Carga de colegios
      this._schoolService.getSchools().then((schools: School[]) =>{
        this.schools = schools;
      })
    }
  
    private registerForm(){
      if(this.role == 'Admin' || this.role == 'Teacher' || this.role == 'Admin' || this.role == 'Student' || this.role == 'Father'){
        this.user = new User(this.name, this.username, this.password, this.role);
        this.user.school = this.school.id;

        
        // creamos el admin y le asignamos un colegio  
        // al asignar un Admons a un colegio, le asignamos a ese colegio el mismo admin
        if(this.school.admin == null){
          this.school.admin = [];
          this.school.admin.push(this.user.id);
        }else{
          this.school.admin.push(this.user.id);
        }

        // una vez agregado el admin se actualiza el colegio
        if(this._schoolService.editarSchool(this.school)){
          this.name = '';
          this.username = '';
          this.password = '';
          this.role = '';
          this.school = null;
          this.group = null;
          this.students = null;
        }else{
          console.log('Nos e pudeo asignar el usuario: ' + this.user.id + 'al colegio: ' + this.school);
        }
      }
    }
}
