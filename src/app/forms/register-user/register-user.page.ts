import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';
import { School } from 'src/app/models/school';
import { Group } from 'src/app/models/group';
import { UserService } from 'src/app/services/user.service';
import { ConfigOptionsService } from 'src/app/services/config-options-service';
import { inputFormUser, selectRole } from 'src/app/config';
import { SchoolService } from 'src/app/services/school.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.page.html',
  styleUrls: ['./register-user.page.scss'],
})
export class RegisterUserPage implements OnInit {

  @Output() form = new EventEmitter<string>();

  inputFormUser: any = inputFormUser;
  selectRole: any = selectRole;
  userlogin: User;

  users: User[] = [];
  user: User = null;
  name: string = '';
  username: string = '';
  password: string = '';
  school: School = null;
  role: string = '';
  group: Group = null;
  students: User = null;

  admins: User[] = [];
  schools: School[] = [];
  

  constructor(private _userService: UserService,
              private _schoolService: SchoolService,
              private _configOptionservice: ConfigOptionsService,) { }

    ngOnInit() {
      this.userlogin = this._userService.getLocalStorage();
      console.log(this.userlogin);
      this.inputFormUser = this._configOptionservice.configFormUser(this.userlogin.role);
      this.selectRole = this._configOptionservice.configSelectRole(this.userlogin.role);
      this._configOptionservice.roleLogin.emit(this.userlogin);

      // Carga de colegios
      this._schoolService.getSchools().then((schools: School[]) =>{
        this.schools = schools;
      })
    }
  
    // ======================================

    validateName = false;
    validateUserName = false;
    validatePassword = false;
    validateRole = false;
    validateSchool= false;
    validateGroup = false;
    validateStudent = false;
    private registerForm(form){
  if(form.value.name.trim().length < 6 ){
    this.validateName = true;
  }
  if(form.value.username.trim().length < 6){
    this.validateUserName = true;
  }
  if(form.value.password.trim().length < 6){
    this.validatePassword = true;
  }
  if(form.value.school == null){
    this.validateSchool = true;
  }
  if(form.value.role == null){
    this.validateRole = true;
  }
  if(form.value.group == null){
    this.validateGroup = true;
  }
  if(form.value.students == null){
    this.validateStudent = true;
  }


      if(form.value.role  == 'Admin' || form.value.role  == 'Teacher' || form.value.role == 'Student' || form.value.role  == 'Father'){
        this.user = new User(form.value.name, form.value.username, form.value.password, form.value.role);
        this.user.school = this.school.id;
        
        // creamos el admin y le asignamos un colegio  
        // al asignar un Admons a un colegio, le asignamos a ese colegio el mismo admin
        if(this.school.admin == null){
          this.school.admin = [];
          this.school.admin.push(this.user);
          this.school.admin.push(this.user);
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
      }else if(form.value.role  == 'Global'){
        this.user = new User(form.value.name, form.value.username, form.value.password, form.value.role);
        this._userService.crearUsuario(this.user);
        this.name = '';
        this.username = '';
        this.password = '';
        this.role = '';
        this.school = null;
        this.group = null;
        this.students = null;
      }
    }


    // ----------------------

    validate(form){

      // if(!form.value.name.touched){
      //   this.validateName = false;
      //   }else{
      //     if(form.value.name.trim().length < 6){
      //       this.validateName = true;
      //     }
      //   }
        
      //   if(!form.value.username.touched){
      //     this.validateUserName = false;
      //   }else{
      //     if(form.value.username.trim().length < 6 ){
      //       this.validateUserName = true;
      //     }
      //   }

      //   if(!form.value.password.touched){
      //     this.validatePassword = false;
      //   }else{
      //     if(form.value.password.trim().length < 6){
      //       this.validatePassword = true;
      //     }
      //   }

      //   // if(!form.value.school.touched){
      //     if(form.value.school != null ){
      //       console.log(form.value.school);
      //       this.validateSchool = true;
      //     }else{
      //         this.validateSchool = false;
      //     }
      //   // }

      //   // if(!form.value.role.touched){
      //     if(form.value.role == ''){
      //       console.log(form.value.role);
      //       this.validateRole = true;
      //     }else{
      //         this.validateRole = false;
      //     }
      //   // }

      //   // if(!form.value.group.touched){
      //     if(form.value.group != null){
      //       this.validateGroup = true;
      //     }else{
      //         this.validateGroup = false;
      //     }
      //   // }

      //   // if(!form.value.students.touched){
      //     if(form.value.students != null){
      //       this.validateStudent= true;
      //     }else{
      //         this.validateStudent = false;
      //     }
      //   // }
     
    }
}
