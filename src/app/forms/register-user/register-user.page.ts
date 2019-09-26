import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';
import { School } from 'src/app/models/school';
import { Group } from 'src/app/models/group';
import { UserService } from 'src/app/services/user.service';
import { ConfigOptionsService } from 'src/app/services/config-options-service';
import { inputFormUser, selectRole } from 'src/app/config';
import { SchoolService } from 'src/app/services/school.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.page.html',
  styleUrls: ['./register-user.page.scss'],
})
export class RegisterUserPage implements OnInit {

  @Output() form = new EventEmitter<string>();

  inputFormUser: any = inputFormUser;
  selectRole: any = selectRole;
  public FormEntity: FormGroup;

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

      this.initForm();
    }
  
    // =====================================

  private initForm() {
    this.FormEntity = new FormGroup({
        name: new FormControl('', [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(50)
        ]),
        username: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30)
      ]),

        password: new FormControl('', [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(15),
        ]),

        school: new FormControl(null, [
            Validators.required
        ]),

        role: new FormControl('', [
            Validators.required
      ]),

        group: new FormControl(null, [
            // Validators.required
        ]),

        students: new FormControl(null, [
          // Validators.required
        ]),
    });
  }


  // *************************
  public frmEntity(){
    return this.FormEntity.controls;
  }

  public markAsDirty(form: FormGroup) {
    let controlKeys = Object.keys(form.controls);
    controlKeys.forEach(key => {
      let control = form.controls[key];
      control.markAsDirty();
    });
  }
// *************************


     registerForm(){
      if(this.FormEntity.valid){
        
      if(this.FormEntity.value.role  == 'Admin' || this.FormEntity.value.role  == 'Teacher' || this.FormEntity.value.role == 'Student' || this.FormEntity.value.role  == 'Father'){
        this.user = new User(this.FormEntity.value.name, this.FormEntity.value.username, this.FormEntity.value.password, this.FormEntity.value.role);
        this.school = this.FormEntity.value.school;
        this.user.school = this.school.id;
        
        // creamos el admin y le asignamos un colegio  
        // al asignar un Admons a un colegio, le asignamos a ese colegio el mismo admin
        if(this.school.admin == null){
          this.school.admin = [];
          this.school.admin.push(this.user);
        }else{
          this.school.admin.push(this.user);
        }

        // una vez agregado el admin se actualiza el colegio
        if(this._schoolService.editarSchool(this.school)){
          this.FormEntity.reset();
        }else{
          console.log('Nos e pudeo asignar el usuario: ' + this.user.id + 'al colegio: ' + this.school);
        }
      }else if(this.FormEntity.value.role  == 'Global'){
        this.user = new User(this.FormEntity.value.name, this.FormEntity.value.username, this.FormEntity.value.password, this.FormEntity.value.role);
        this._userService.crearUsuario(this.user);
        this.FormEntity.reset();
      }

      }else{
        this.markAsDirty(this.FormEntity);
      }

    }
}
