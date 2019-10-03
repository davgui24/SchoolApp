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
import { Course } from 'src/app/models/course';
import { Subject } from '../../models/subject';
import { AlertController } from '@ionic/angular';

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
  courses: Course[] = [];
  subjects: Subject[] = [];

  roleUrl: string;
  

  constructor(private _userService: UserService,
              private _schoolService: SchoolService,
              private _configOptionservice: ConfigOptionsService,
              private activatedRoute: ActivatedRoute,
              public alertController: AlertController) { }

    ngOnInit() {

      // caragamos el usuario del localStorage
      this.userlogin = this._userService.getLocalStorage();

      // Recibimos el rol que viene de la lista (por la url) para asi caragar el formilario
      this.roleUrl = this.activatedRoute.snapshot.paramMap.get('role');


      // cargamos el usuario del localStorage
      this.userlogin = this._userService.getLocalStorage();

      // Confuguramos el formulario para que muestre solo los campos segun el rol a editar
      this.inputFormUser = this._configOptionservice.configFormUser(this.roleUrl);
           
       // Confuguramos el selectRole para que muestre solo los options segun el rol a editar
      this.selectRole = this._configOptionservice.configSelectRole(this.roleUrl);
      
      // Emitimos el rol del usuario logeado para que lo reciba el appComponent (ver linea 41 del appComponent) y cargue el menú
      this._configOptionservice.roleLogin.emit(this.userlogin.role);

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
      if(JSON.parse(localStorage.getItem('userEdit'))){
        this.userUrl = JSON.parse(localStorage.getItem('userEdit'));
      }else if(JSON.parse(localStorage.getItem('adminEdit'))){
        this.userUrl = JSON.parse(localStorage.getItem('adminEdit'));
        this._schoolService.getSchools().then((schools: School[]) =>{

          this.schools = schools;

          for(let school of this.schools){
             if(school.id == this.userUrl.school){
               this.school = school;
               
               
            for( let subject of this.school.subcjet){
              this.subjects.push(subject);
            }
            break;
          }
        }
      })
      }else if(this.userUrl = JSON.parse(localStorage.getItem('teacherEdit'))){
        this._schoolService.getSchools().then((schools: School[]) =>{

          this.schools = schools;

          for(let school of this.schools){
             if(school.id == this.userlogin.school){
               this.school = school;
               
               
            for( let subject of this.school.subcjet){
              this.subjects.push(subject);   
            }
            break;
           }
          }
        })
      }
      


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


  private initForm() {
    // creamos arreglo de validacion de campo requerido segun el rol
  
    let group; 
    let school;
    let student;
    let course;
    let subject;
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
    if(inputFormUser.ImputCourse){
      course = [Validators.required]
    }else{
      course = [] 
    }if(inputFormUser.InputSubject){  
      subject = [Validators.required];
    }else{
      subject = [] 
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

        school: new FormControl(this.school, school),

        role: new FormControl(this.roleUrl, [
            Validators.required
      ]),

        group: new FormControl(null, group),

        course: new FormControl(null, course),

        students: new FormControl(null, student),

        subject: new FormControl(null, subject),
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

              // CODIGO PARA EDITAR (SI EL USUARIO A EDITAR VIENE POR EL LOCALSTORAGE)
            let userEdit: User;
            let userCreate: User;
            if(JSON.parse(localStorage.getItem('userEdit'))  && this.userlogin.role == 'Global'){
              userEdit = JSON.parse(localStorage.getItem('userEdit'));
              let userEditAux: User = new User(this.FormEntity.value.name, this.FormEntity.value.username, this.FormEntity.value.password, this.FormEntity.value.role);
              userEdit.name = userEditAux.name;
              userEdit.username = userEditAux.username;
              userEdit.password = userEditAux.password;
              userEdit.role = userEditAux.role;
              userEdit.dateCreate = new Date().toString();
              this._userService.verificarUsuario(userEdit.id).then((userDB: User) =>{
               userDB = userEdit;
               userDB.dateUpdate = new Date().toString();
               if(this._userService.editarUsuario(userDB)){
                 this.presentAlertEdit();
               }else{
                 this.presentAlertErrorEdit();
               }
              })

            }else if(JSON.parse(localStorage.getItem('adminEdit'))  && this.userlogin.role == 'Global'){
              userEdit = JSON.parse(localStorage.getItem('adminEdit'));
              let userEditAux: User = new User(this.FormEntity.value.name, this.FormEntity.value.username, this.FormEntity.value.password, this.FormEntity.value.role);
              userEdit.name = userEditAux.name;
              userEdit.username = userEditAux.username;
              userEdit.password = userEditAux.password;
              userEdit.role = userEditAux.role;
              userEdit.school = this.FormEntity.value.school.id;
              userEdit.dateCreate = new Date().toString();
              this._schoolService.verificarSchool(this.FormEntity.value.school.id).then((schoolDB: School) =>{
                for(let i in schoolDB.admin){
                  if(userEdit.id == schoolDB.admin[i].id){
                    userEdit.dateUpdate = new Date().toString();
                    schoolDB.admin[i] = userEdit;
                    console.log(schoolDB.admin[i]);
                    if(this._schoolService.editarSchool(schoolDB)){
                      this.presentAlertEdit();
                    }else{
                      this.presentAlertErrorEdit();
                    }
                    break;
                  }else{
                    // this.presentAlertError();
                  }
                }
              }).catch(err => console.log(err));
              

            }else if(JSON.parse(localStorage.getItem('teacherEdit'))  && this.userlogin.role == 'Admin'){
              userEdit = JSON.parse(localStorage.getItem('teacherEdit'));
            }else if(JSON.parse(localStorage.getItem('studentEdit')) && this.userlogin.role == 'Admin'){
              userEdit = JSON.parse(localStorage.getItem('studentEdit'));

            }else if(JSON.parse(localStorage.getItem('fatherEdit')) && this.userlogin.role == 'Admin'){
              userEdit = JSON.parse(localStorage.getItem('fatherEdit'));
              
            }else{
              // CODIGO CUANDO NO HAY NINGUN USUARIO PARA EDITAR, ENTONCES SE CREA

              if(this.roleUrl == 'Admin'){
                userCreate = new User(this.FormEntity.value.name, this.FormEntity.value.username, this.FormEntity.value.password, this.FormEntity.value.role, this.FormEntity.value.school.id);
                userCreate.dateCreate = new Date().toString();
                  this._schoolService.verificarSchool(this.FormEntity.value.school.id).then((schoolDB: School) =>{
                    if(schoolDB.admin){
                      schoolDB.admin.push(userCreate);
                    }else{
                      schoolDB.admin == [];
                      schoolDB.admin.push(userCreate);
                    }
                    console.log(this._schoolService.editarSchool(schoolDB));
                  })
                  this.FormEntity.reset();
              }else if(this.roleUrl == 'Teacher' && this.userlogin.role == 'Admin'){

  
              }else if(this.roleUrl == 'Student' && this.userlogin.role == 'Admin'){


              }else if(this.roleUrl == 'Father' && this.userlogin.role == 'Admin'){

  
              }else if(this.roleUrl == 'Global' && this.userlogin.role == 'Global'){
                userCreate = new User(this.FormEntity.value.name, this.FormEntity.value.username, this.FormEntity.value.password, this.FormEntity.value.role);
                userCreate.dateCreate = new Date().toString();
                if(this._userService.editarUsuario(userCreate)){
                  this.presentAlertCreate();
                }else{
                  this.presentAlertErrorCreate();
                }
              }

            }
      
        


      }else{
        this.markAsDirty(this.FormEntity);
      }

    }


    // *********************
    // Cuando se destruya el componente elimine el arreglo "userEdit, adminEdit" del localStorage
    ngOnDestroy(): void {
      localStorage.removeItem('userEdit');
      localStorage.removeItem('adminEdit');
      localStorage.removeItem('teacherEdit')
    }

    // ---------------------
    async presentAlertEdit() {
      const alert = await this.alertController.create({
        header: ':)',
        subHeader: 'Good!',
        message: 'The user is updated successfully.',
        buttons: ['OK']
      });
  
      await alert.present();
    }


    async presentAlertErrorEdit() {
      const alert = await this.alertController.create({
        header: ':(',
        subHeader: 'Bad!',
        message: 'The user could not be updated.',
        buttons: ['OK']
      });
  
      await alert.present();
    }

       // ---------------------
       async presentAlertCreate() {
        const alert = await this.alertController.create({
          header: ':)',
          subHeader: 'Good!',
          message: 'The user was created successfully.',
          buttons: ['OK']
        });
    
        await alert.present();
      }
  
  
      async presentAlertErrorCreate() {
        const alert = await this.alertController.create({
          header: ':(',
          subHeader: 'Bad!',
          message: 'The user could not be created.',
          buttons: ['OK']
        });
    
        await alert.present();
      }
}
