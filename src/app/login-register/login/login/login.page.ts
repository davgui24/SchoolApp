import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ConfigOptionsService } from 'src/app/services/config-options-service';
import { NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { SchoolService } from '../../../services/school.service';
import { School } from 'src/app/models/school';
import { FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public FormEntity: FormGroup;

  usersGlobals: User[] = [];
  users: User[] = [];
  admin: User;
  school: School;
  user: User = null;
  userGlobal: User = null;
  username: string;
  password: string;
  role: string;

  constructor(private _userService: UserService,
             private _schoolService: SchoolService,
             private _configOptionsService: ConfigOptionsService,
             private navCtrl: NavController,
             public loadingController: LoadingController,
             public alertController: AlertController
             ) { }

  ngOnInit() {

    localStorage.clear();
    this. upLoadusers();
    this.initForm();
  }


  // --------------------------

    // Con este metodo iniciamos el  formulario
    private initForm(){
      this.FormEntity = new FormGroup({
        username: new FormControl('userAdmin1', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(50)
      ]),
        password: new FormControl('123456', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15)
      ]),
        role: new FormControl('Admin', [
          Validators.required,
      ]),
      })
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

  upLoadusers(){
    this._userService.getUsuarios().then((users: User[]) =>{
      // llenamos el arreglo de usuarios globales
      users.forEach(user => {
        this.usersGlobals.push(user);
      });

      // Seguimos llenando el arreglo de los demas usuarios
      this._schoolService.getSchools().then((schools: School[]) =>{
        schools.forEach(school => {
          school.admin.forEach(admin => {
            this.users.push(admin);
          });
          if(school.teachers==null){
            school.teachers = [];
          }
          school.teachers.forEach(teacher => {
            this.users.push(teacher);
          });
          if(school.students==null){
            school.students = [];
          }
          school.students.forEach(student => {
            this.users.push(student);
          });
          if(school.fathers==null){
            school.fathers = [];
          }
          school.fathers.forEach(father => {
            this.users.push(father)
          })
        });
      })
    })
  }


  

  async  loginForm(){
    if(this.FormEntity.valid){
     for(let user of this.users){
      if(this.FormEntity.value.username == user.username && this.FormEntity.value.password == user.password && this.FormEntity.value.role == user.role){
        this.user = user;
        break;
      }else{
        this.user = null;
      }
     }

    //  Se valida que exista el usuario despues de los filtros hechos
     if(this.user != null){

      this._schoolService.verificarSchool(this.user.school).then((school: School) =>{
        this.school = school;
        if(this.user.role == 'Admin'){
          for(let admin of this.school.admin)
            if(this.user.id == admin.id){
              admin.lastLogin = new Date().toString();
              this.user = admin;
              console.log(this._schoolService.editarSchool(this.school));
              this._userService.setLocalStorage(this.user);
              this.navCtrl.navigateBack("home");
            }
        }else if(this.user.role == 'Teacher'){

          for(let teacher of this.school.teachers)
            if(this.user.id == teacher.id){
              teacher.lastLogin = new Date().toString();
              this.user = teacher;
              console.log(this._schoolService.editarSchool(this.school));
              this._userService.setLocalStorage(this.user);
              this.navCtrl.navigateBack("home" );
            }
        }else if(this.user.role == 'Student'){
          for(let student of this.school.students)
            if(this.user.id == student.id){
              student.lastLogin = new Date().toString();
              this.user = student;
              console.log(this._schoolService.editarSchool(this.school));
              this._userService.setLocalStorage(this.user);
              this.navCtrl.navigateBack("home" );
            }
        }else if(this.user.role == 'Father'){
          for(let father of this.school.fathers)
            if(this.user.id == father.id){
              father.lastLogin = new Date().toString();
              this.user = father;
              console.log(this._schoolService.editarSchool(this.school));
              this._userService.setLocalStorage(this.user);
              this.navCtrl.navigateBack("home" );
            }
        }
      })

    
     }else{
      this.presentAlertError();
     }
    }else{
      this.presentAlertLoginGlobal()
    }
     
   }
  
    







  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Hellooo',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

     console.log('Loading dismissed!');
  }


  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }




  // ==========  Alert
  async presentAlertLoginGlobal() {

    const loading = await this.loadingController.create({
      message: 'Hellooo',
      // duration: 2000
    });


    const alert = await this.alertController.create({
      header: 'Login',
      subHeader: 'Global Admin',
      message: 'Enter your credentials',
      id: 'global',
      inputs: [
        {
          name: 'username',
          type: 'text',
          placeholder: 'Enter username',
          value: ''
        },
        {
          name: 'password',
          type: 'password',
          placeholder: 'Enter password',
          value: ''
        },
      ], buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (dataLogin) => {
            for(let user of this.usersGlobals){
              if(dataLogin.username == user.username && dataLogin.password == user.password){
                this.userGlobal = user;
                loading.onDidDismiss();
                break;
              }else{
                // this.presentAlertError();
              }
            }

            if(this.userGlobal != null){
              this.userGlobal.lastLogin = new Date().toString();
              this._userService.editarUsuario(this.userGlobal);
              this._userService.setLocalStorage(this.userGlobal);
              this.navCtrl.navigateBack("home" );
            }else{
              this.presentAlertError();
            }
          }
        }
      ]

    });
    await alert.present().then(() =>{
      document.getElementById('global').focus();
    })
  }

  // -----------------------------

  async presentAlertError() {
    const alert = await this.alertController.create({
      header: 'Error!!',
      subHeader: 'Check',
      message: 'Bad credentials',
      buttons: ['OK']
    });

    await alert.present();
  }


}