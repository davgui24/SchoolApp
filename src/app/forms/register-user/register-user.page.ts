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
import { AlertController, NavController } from '@ionic/angular';

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
  globals: User[] = [];
  admins: User[] = [];
  teachers: User[] = [];
  students: User[] = [];
  fathers: User[] = [];
  user: User = null;
  userUrl: User = null;
  name: string = '';
  username: string = '';
  password: string = '';
  school: School = null;
  schoolId: string;
  role: string = '';
  group: Group = null;
  groups: Group[] = [];
  groupCurrent: string;

  schools: School[] = [];
  courses: Course[] = [];
  subjects: any[] = [];
  subjectsTeacher: any[] = [];

  roleUrl: string;
  urlBackGlobal: boolean = false;
  urlBackAdmin: boolean = false;
  urlBackTeacher: boolean = false;
  urlBackStudent: boolean = false;
  urlBackFather: boolean = false;
  

  constructor(private _userService: UserService,
              private _schoolService: SchoolService,
              private _configOptionservice: ConfigOptionsService,
              private activatedRoute: ActivatedRoute,
              public alertController: AlertController,
              private navCtrl: NavController) { }

    ngOnInit() {

      // caragamos el usuario del localStorage
      this.userlogin = this._userService.getLocalStorage();

      // Recibimos el rol que viene de la lista (por la url) para asi caragar el formilario
      this.roleUrl = this.activatedRoute.snapshot.paramMap.get('role');

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
      
      this.viewBotonBack();
      this.upLoadUserEdit();
      this.initForm();
    }

 // CONFIGURAMOS LA RUTA DEL BOTON BACK DEPENDIENDO DE QUE LISTA VIENE
 viewBotonBack(){
  if(this.roleUrl == 'Global'){
    this.urlBackGlobal = true;
  }else if(this.roleUrl == 'Admin'){
    this.urlBackAdmin = true;
  }else if(this.roleUrl == 'Teacher'){
    this.urlBackTeacher = true;
  }else if(this.roleUrl == 'Student'){
    this.urlBackStudent = true;
  }else if(this.roleUrl == 'Father'){
    this.urlBackFather = true;
  }
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
        this.userUrl = JSON.parse(localStorage.getItem('teacherEdit'));
        this._schoolService.getSchools().then((schools: School[]) =>{

          this.schools = schools;

          for(let school of this.schools){
             if(school.id == this.userlogin.school){
               this.school = school;
               
               
            for( let subject of this.school.subcjet){
              if(!subject.stateTeacher){
                this.subjects.push(subject);
              } 
            }

            for(let subjectCurrent of this.userUrl.subject){
              this.subjects.push(subjectCurrent);
            }
            break;
           }
          }
        })

        // SELECIONAMOS LAS ID DE LAS ASIGNATURAS QUE DA ESTE PROFESOR Y LAS MARCAMOS EN EL SELECT DE HTML
        for(let subjectTeacher of this.userUrl.subject){
          subjectTeacher.stateTeacher = false;
          this.subjectsTeacher.push(subjectTeacher.id);
        }    
      }else if(JSON.parse(localStorage.getItem('studentEdit'))){
        this.userUrl = JSON.parse(localStorage.getItem('studentEdit'));
        this.groupCurrent = this.userUrl.group.id;

        this._schoolService.getSchools().then((schools: School[]) =>{

          this.schools = schools;

          for(let school of this.schools){
             if(school.id == this.userlogin.school){
               this.school = school;
               
            for( let group of this.school.groups){
             this.groups.push(group);
            }
            break;
           }
          }
        })
      }

    

      // CUANDO EL USURIO NO VIENE DE UNA LISTA
      if(this.userUrl == null){
        let course = new Course('','','');
        let subject = new Subject('','','',course);
        let group = new Group('','','','',[subject])
        this.userUrl = new User('', '', '', this.roleUrl);
        this.userUrl.group = group;
        this.userUrl.subject = [subject];
        this.userUrl.students = [];


        this._schoolService.verificarSchool(this.userlogin.school).then((schoolDB: School) =>{
          for(let subject of schoolDB.subcjet){
            if(!subject.stateTeacher){
              this.subjects.push(subject);
            }
          }

          for(let groupDB of schoolDB.groups){
            this.groups.push(groupDB);
          }
        })
      }
    }

    // ====================================
 
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
        name: new FormControl(this.userUrl.name, [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(50)
        ]),
        username: new FormControl(this.userUrl.username, [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30)
      ]),

        password: new FormControl(this.userUrl.password, [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(15),
        ]),

        school: new FormControl(this.userUrl.school, school),

        role: new FormControl(this.userUrl.role, [
            Validators.required
      ]),

        group: new FormControl(this.userUrl.group, group),

        course: new FormControl(null, course),

        students: new FormControl(this.userUrl.students, student),

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
                 this.presentAlert('😃', 'Good!', 'The Global is updated successfully.');
               }else{
                 this.presentAlert('😞', 'Bad!', 'The user could not be updated.');
               }
              })

            }else if(JSON.parse(localStorage.getItem('adminEdit'))  && this.userlogin.role == 'Global'){
              userEdit = JSON.parse(localStorage.getItem('adminEdit'));
              let userEditAux: User = new User(this.FormEntity.value.name, this.FormEntity.value.username, this.FormEntity.value.password, this.FormEntity.value.role);
              
              this._schoolService.verificarSchool(this.FormEntity.value.school.id).then((schoolDB: School) =>{
                for(let i in schoolDB.admin){
                  if(userEdit.id == schoolDB.admin[i].id){
                    schoolDB.admin[i].name = userEditAux.name;
                    schoolDB.admin[i].username = userEditAux.username;
                    schoolDB.admin[i].password = userEditAux.password;
                    schoolDB.admin[i].role = userEditAux.role;
                    schoolDB.admin[i].school = this.FormEntity.value.school.id;
                    schoolDB.admin[i].dateUpdate = new Date().toString();
                    schoolDB.admin[i] = userEdit;
                    console.log(schoolDB.admin[i]);
                    if(this._schoolService.editarSchool(schoolDB)){
                      this.navCtrl.navigateBack('list-user');
                      this.presentAlert('😃', 'Good!', 'The Admin is updated successfully.');
                    }else{
                      this.presentAlert('😞', 'Bad!', 'The Admin could not be updated.');
                    }
                    break;
                  }else{
                    // this.presentAlertError();
                  }
                }
              }).catch(err => console.log(err));
              

            }else if(JSON.parse(localStorage.getItem('teacherEdit'))  && this.userlogin.role == 'Admin'){
              userEdit = JSON.parse(localStorage.getItem('teacherEdit'));
              let userEditAux: User = new User(this.FormEntity.value.name, this.FormEntity.value.username, this.FormEntity.value.password, this.FormEntity.value.role);             
              
              this._schoolService.verificarSchool(userEdit.school).then((schoolDB: School) =>{
                for(let i in schoolDB.teachers){
                if(schoolDB.teachers[i].id === userEdit.id){
                  schoolDB.teachers[i].name = userEditAux.name;
                  schoolDB.teachers[i].username = userEditAux.username;
                  schoolDB.teachers[i].password = userEditAux.password;
                  schoolDB.teachers[i].role = userEditAux.role;
                  schoolDB.teachers[i].school = userEdit.school;
                  schoolDB.teachers[i].dateUpdate = new Date().toString();

                  for(let subjectCurrent of schoolDB.teachers[i].subject){
                    for(let j in schoolDB.subcjet){
                      if(subjectCurrent.id == schoolDB.subcjet[j].id){
                        schoolDB.subcjet[j].stateTeacher = false;
                      }
                    }
                  }

                  for(let j in schoolDB.teachers[i].subject){
                    schoolDB.teachers[i].subject = [];
                  }

                  for(let j in schoolDB.subcjet){
                    for (let subject of this.FormEntity.value.subject){
                      if(subject === schoolDB.subcjet[j].id)
                      schoolDB.subcjet[j].stateTeacher = false;
                    }
                  }
                  
                  for(let subjectCurrent of this.FormEntity.value.subject){
                    for(let j in schoolDB.subcjet){
                      if(subjectCurrent === schoolDB.subcjet[j].id){
                        schoolDB.subcjet[j].stateTeacher = true;
                        schoolDB.teachers[i].subject.push(schoolDB.subcjet[j]);
                      }
                    }
                  }
                  break;
                }
              }
              
              if(this._schoolService.editarSchool(schoolDB)){
                this.presentAlert('😃', 'Good!', 'The teacher is updated successfully.');
                this.navCtrl.navigateBack('list-teacher');
              }else{
                this.presentAlert('😞', 'Bad!', 'The teacher could not be updated.');
              }
            })
            

            }else if(JSON.parse(localStorage.getItem('studentEdit')) && this.userlogin.role == 'Admin'){
              userEdit = JSON.parse(localStorage.getItem('studentEdit'));
              let group: Group;
              for(let groupCurrent of this.school.groups){
                if(groupCurrent.id == this.FormEntity.value.group){
                  group = groupCurrent;
                  break;
                }
              }

              userEdit.dateUpdate = new Date().toString();
              userEdit.name = this.FormEntity.value.name;
              userEdit.password = this.FormEntity.value.password;
              userEdit.group = group;

              for(let i in this.school.students){
                if(this.school.students[i].id == userEdit.id){
                  this.school.students[i] = userEdit;
                  break;
                }
              }

              if(this._schoolService.editarSchool(this.school)){
                this.presentAlert('😃', 'Good!', 'The student is updated successfully.');
                this.navCtrl.navigateBack('list-student');
              }else{
                this.presentAlert('😞', 'Bad!', 'The student could not be updated.');
              }

            }else if(JSON.parse(localStorage.getItem('fatherEdit')) && this.userlogin.role == 'Admin'){
              userEdit = JSON.parse(localStorage.getItem('fatherEdit'));
              
            }else{
// ***************************************************** CODIGO CUANDO NO HAY NINGUN USUARIO PARA EDITAR, ENTONCES SE CREA

              if(this.roleUrl == 'Admin' && this.userlogin.role == 'Global'){
                this._schoolService.getSchools().then((schoolsDB: School[]) =>{
                  let validateAdmin: boolean = false;
                  for(let schoolDB of schoolsDB){
                    if(schoolDB.admin){
                      for(let adminDB of schoolDB.admin){
                        if(this.FormEntity.value.username === adminDB.username){
                          validateAdmin = true;
                          break;
                        }
                      }
                     }
                     else{
                      validateAdmin = true;
                     }
                    }
                  if(validateAdmin){
                    this.presentAlert('🤔', 'Bad!', 'This admin is already registered.');
                  }else{
                    userCreate = new User(this.FormEntity.value.name, this.FormEntity.value.username, this.FormEntity.value.password, this.FormEntity.value.role);
                    userCreate.school = this.FormEntity.value.school;
                    userCreate.dateCreate = new Date().toString();
                      this._schoolService.verificarSchool(this.FormEntity.value.school.id).then((schoolDB: School) =>{
                        if(schoolDB.admin){
                          schoolDB.admin.push(userCreate);
                        }else{
                          schoolDB.admin == [];
                          schoolDB.admin.push(userCreate);
                        }
                        if(this._schoolService.editarSchool(schoolDB)){
                          this.presentAlert('😃', 'Good!', 'The Admin was created successfully.');
                        }
                      })
                      this.FormEntity.reset();
                  }
                })
              }else if(this.roleUrl == 'Teacher' && this.userlogin.role == 'Admin'){
                this._schoolService.getSchools().then((schoolsDB: School[]) =>{
                  let validateTeacher: boolean = false;
                  for(let schoolDB of schoolsDB){
                    if(schoolDB.teachers){
                      for(let teacherDB of schoolDB.teachers){
                        if(this.FormEntity.value.username === teacherDB.username){
                          validateTeacher = true;
                          break;
                        }
                      }
                    }else{
                      // validateTeacher = true;
                    }
                   
                  }
                  if(validateTeacher){
                    this.presentAlert('🤔', 'Bad!', 'This Teacher is already registered.');
                  }else{
                    userCreate = new User(this.FormEntity.value.name, this.FormEntity.value.username, this.FormEntity.value.password, this.FormEntity.value.role);
                    userCreate.school = this.userlogin.school;
                    userCreate.dateCreate = new Date().toString();
                    userCreate.subject = [];
             
                    let subjectObjects: Subject[] = [];
                    this._schoolService.verificarSchool(this.userlogin.school).then((school: School) =>{
                      for(let i in school.subcjet){
                         for(let subjectSelect of this.FormEntity.value.subject){
                           if (school.subcjet[i].id === subjectSelect){
                            school.subcjet[i].stateTeacher = true;
                            school.subcjet[i].teacher = userCreate.id;
                            subjectObjects.push(school.subcjet[i]);
                           }
                         }
                       
                      }
                      userCreate.subject = subjectObjects;
                      if(school.teachers){
                       school.teachers.push(userCreate);
                      }else{
                       school.teachers = [];
                       school.teachers.push(userCreate);
                      }

                      if(this._schoolService.editarSchool(school)){
                        this.presentAlert('😃', 'Good!', 'The teacher was created successfully.');
                        this.FormEntity.reset();
                        this.navCtrl.navigateBack('list-teacher');
                      }else{
                        this.presentAlert('🤔', 'Bad!', 'The teacher could not be registered.');
                      }

                    })
                  }
                })

  
              }else if(this.roleUrl == 'Student' && this.userlogin.role == 'Admin'){
                this._schoolService.verificarSchool(this.userlogin.school).then((school: School) =>{
                  let groupCurrent: Group;
                  for(let groupDB of school.groups){
                    if(groupDB.id == this.FormEntity.value.group){
                      groupCurrent = groupDB;
                      break;
                    }
                  }

                    let validateStudent: boolean = false;
                    if(!school.students){
                      school.students = [];
                    }else{
                      for(let student of school.students){
                        if(student.username == this.FormEntity.value.username){
                          validateStudent = true;
                          break;
                        }
                      }
                    }

                    if(validateStudent){
                      this.presentAlert('🤔', 'Bad!', 'The student could not be registered.');
                    }else{
                      let student = new User(this.FormEntity.value.name, this.FormEntity.value.username, this.FormEntity.value.password, this.FormEntity.value.role);
                      student.group = groupCurrent;
                      school.students.push(student);
                      if(this._schoolService.editarSchool(school)){
                        this.presentAlert('😃', 'Good!', 'The student was created successfully.');
                        this.FormEntity.reset();
                      }else{
                        this.presentAlert('😞', 'Error!', 'The student was created correctly.');
                      }
                    }
                 
                })



              }else if(this.roleUrl == 'Father' && this.userlogin.role == 'Admin'){

  
              }else if(this.roleUrl == 'Global' && this.userlogin.role == 'Global'){
                this._userService.getUsuarios().then((globalsDB: User[]) =>{
                  let validateGlobal: boolean = false;
                  for(let globalDB of globalsDB){
                    if(this.FormEntity.value.username === globalDB.username){
                      validateGlobal = true;
                      break;
                    }
                  }
                  if(validateGlobal){
                    this.presentAlert('😞', 'Bad!', 'The user could not be created.');
                  }else{
                  userCreate = new User(this.FormEntity.value.name, this.FormEntity.value.username, this.FormEntity.value.password, this.FormEntity.value.role);
                    userCreate.dateCreate = new Date().toString();
                    if(this._userService.editarUsuario(userCreate)){
                      this.FormEntity.reset();
                      this.presentAlert('😃', 'Good!', 'The Global was created successfully.');
                    }else{
                      this.presentAlert('😞', 'Bad!', 'The Global could not be updated.');
                    }
                  }
                })
               
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
      localStorage.removeItem('studentEdit')
    }

    // ---------------------

      async presentAlert(header: string, subHeader: string, message: string) {
        const alert = await this.alertController.create({
          header: header,
          subHeader: subHeader,
          message: message,
          buttons: ['OK']
        });
    
        await alert.present();
      }
}
