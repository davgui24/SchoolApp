import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/user';
import { School } from 'src/app/models/school';
import { Group } from 'src/app/models/group';
import { UserService } from 'src/app/services/user.service';
import { ConfigOptionsService } from 'src/app/services/config-options-service';
import { inputFormUser, selectRole } from 'src/app/config';
import { SchoolService } from 'src/app/services/school.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.page.html',
  styleUrls: ['./register-user.page.scss'],
})
export class RegisterUserPage implements OnInit, OnDestroy {
 

  @Output() form = new EventEmitter<string>();

  inputFormUser: any = inputFormUser;
  selectRole: any = selectRole;
  public FormEntity: FormGroup;

  userlogin: User;
  users: User[] = [];
  user: User = null;
  userUrl: User = null;
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
              private _configOptionservice: ConfigOptionsService,
              private activatedRoute: ActivatedRoute,) { }

    ngOnInit() {
      // Recibimos el rol que viene de la lista (por la url) para asi caragar el formilario
      let roleUrl = this.activatedRoute.snapshot.paramMap.get('role');

      // caragamos el usuario del localStorage
      this.userlogin = this._userService.getLocalStorage();

      // Confuguramos el formulario para que muestre solo los campos segun el rol a editar
      this.inputFormUser = this._configOptionservice.configFormUser(roleUrl);

       // Confuguramos el selectRole para que muestre solo los options segun el rol a editar
      this.selectRole = this._configOptionservice.configSelectRole(roleUrl);

      // Emitimos el rol del usuario logeado para que lo reciba el appComponent (ver linea 41 del appComponent) y cargue el menú
      this._configOptionservice.roleLogin.emit(roleUrl);

      // Carga de colegios
      this._schoolService.getSchools().then((schools: School[]) =>{
        this.schools = schools;
      })
      this.upLoadUserEdit();
      this.initForm();
    }


    // en este metodo validamos si al formulario llegan valores, si es asi, entonces se va a editar y se agregan los valosres en los inputs
    // sino, de va a agregar, entonces los inputs quedan vacios
    upLoadUserEdit(){
      this.userUrl = JSON.parse(localStorage.getItem('userList'));

      if(this.userUrl == null){
        console.log('no llego nada');
      }else{
        this.name = this.userUrl.name;
        this.username = this.userUrl.username;
        this.password = this.userUrl.password;
        this.role = this.userUrl.role;

        // ESTOS QUEDAN PARA CUANDO TRABAJEMOS LA LISTA DE ADMINS Y TEACHERS
        // this.school = this.userUrl.school
        // this.students = this.userUrl.students;
      }
    }
  
    // =====================================

    // Con este metodo iniciamos el  formulario
  private initForm() {
    // creamos arreglo de validacion de campo requerido segun el rol
    let group; 
    let school;
    let student;
    if(inputFormUser.ImputStudents){
      student = [Validators.required];
    }else{
      student = [] 
    }
    if(inputFormUser.ImputGroup){
      group = Validators.required
    }else{
      group = [] 
    }
    if(inputFormUser.inputSchool){
      school = [Validators.required]
    }else{
      school = [] 
    }

// Aqui le damos los valores iniciales y resticciones a cada input
    this.FormEntity = new FormGroup({
        name: new FormControl(this.name, [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(50)
        ]),
        username: new FormControl(this.username, [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30)
      ]),

        password: new FormControl(this.password, [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(15),
        ]),

        school: new FormControl(null, school),

        role: new FormControl(this.role, [
            Validators.required
      ]),

        group: new FormControl(null, group),

        students: new FormControl(null, student),
    });
  }


  // *************************
  // Esotos dos metodos son para mostrar un mensaje de error en caso que se hayan ingresado datos incorrectos
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
        // al asignar un Admins a un colegio, le asignamos el id del colegio el mismo admin
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


    // *********************
    // Cuando se destruya el componente elimine el arreglo "userList" del localStorage
    ngOnDestroy(): void {
      localStorage.removeItem('userList');
    }
}
