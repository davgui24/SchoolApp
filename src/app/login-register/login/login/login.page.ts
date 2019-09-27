import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ConfigOptionsService } from 'src/app/services/config-options-service';
import { NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { SchoolService } from '../../../services/school.service';
import { School } from 'src/app/models/school';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  users: User[] = [];
  admins: User[] = [];
  admin: User;
  school: School;
  user: User;
  username: string = 'userAdmin1';
  password: string = '123456';
  role: string = 'Admin';

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
  }

  upLoadusers(){
    this._userService.getUsuarios().then((users: User[]) =>{
      // llenamos el arreglo de usuarios globales
      users.forEach(user => {
        this.users.push(user);
      });

      // Seguimos llenando el arreglo de los demas usuarios
      this._schoolService.getSchools().then((schools: School[]) =>{
        schools.forEach(school => {
          school.admin.forEach(admin => {
            this.admins.push(admin);
          });
          if(school.teachers==null){
            school.teachers = [];
          }
          school.teachers.forEach(teacher => {
            this.admins.push(teacher);
          });
          if(school.students==null){
            school.students = [];
          }
          school.students.forEach(student => {
            this.admins.push(student);
          });
          if(school.fathers==null){
            school.fathers = [];
          }
          school.fathers.forEach(father => {
            this.admins.push(father)
          })
        });
      })
    })
  }


  
  validateUser = false;
  validatePassword = false;
  validateRole = false;
  async  loginForm(form){
    if(form.value.role == '' && (form.value.password.trim().length <= 0  || form.value.username.trim().length <= 0)){
      this.presentAlertLoginGlobal(form);
    }else if(form.value.role == ''){
      this.validateRole = true;
    }else if(form.value.username.trim().length < 6){
      this.validateUser = true;
      console.log('Entró 3');
    }else if(form.value.password.trim().length < 6){
        this.validatePassword = true;
        console.log('Entró 4');
    }else{
      const loading = await this.loadingController.create({
        message: 'Hellooo',
        // duration: 2000
      });
      
      let validateLogin: boolean = false;
        for(let i=0; i<this.admins.length; i++){
          if(this.username == this.admins[i].username && this.password == this.admins[i].password && this.role == this.admins[i].role){
            validateLogin = true;
            loading.onDidDismiss();
              this._schoolService.getSchools().then((schools: School[]) =>{
                for(let j=0; j<schools.length; j++){
                  if(schools[j].id == this.admins[i].school){
                    for(let k=0; k<schools[j].admin.length; k++){
                      if(schools[j].admin[k].id == this.admins[i].id){
                        this.admin = this.admins[i];
                        this.admin.lastLogin = new Date().toString();
                        schools[j].admin[k] = this.admin;
                        this.school = schools[j];
                        console.log(this._schoolService.editarSchool(this.school));
                        this.navCtrl.navigateBack("home/" + this.admins[i].id);
                        break;
                      }else{
                        
                      }
                    }
                    break;
                  }else{
                    console.log('No se encontro el colegio');
                  }
                }
              })
            break;
          }else{
            
          }
          
        }
        if(validateLogin){
          this.navCtrl.navigateBack("home/" + this.admin.id);
        }else{
          this.presentAlertError();
        }
      }
    }
    





  validate(form){
    if(form.value.username.trim().length < 6){
      this.validateUser = true;
      }else{
      this.validateUser = false;
      }
      
    if(form.value.password.trim().length < 6){
        this.validatePassword = true;
      }else{
      this.validatePassword = false;
      }
      
      if(form.value.role == ''){
        this.validateRole = true;
      }else{
      this.validateRole = false;
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
  async presentAlertLoginGlobal(form) {

    const loading = await this.loadingController.create({
      message: 'Hellooo',
      // duration: 2000
    });


    this._userService.getUsuarios().then((users: User[]) =>{
      // llenamos el arreglo de usuarios globales
      users.forEach(user => {
        this.users.push(user);
      });
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
            let validateLogin: boolean = false;
            this.validateRole = false;
            this.validatePassword = false;
            this.validateUser = false;
            for(let user of this.users){
              if(dataLogin.username == user.username && dataLogin.password == user.password){
                this.user = user;
                loading.onDidDismiss();
                validateLogin = true;
                // user.lastLogin = new Date().toString();
                // console.log(this._userService.editarUsuario(user));
                // this.navCtrl.navigateBack("home/" + user.id);
                break;
              }else{
                // this.presentAlertError();
              }
            }


            if(validateLogin){
              this.user.lastLogin = new Date().toString();
              console.log(this._userService.editarUsuario(this.user));
              this.navCtrl.navigateBack("home/" + this.user.id);
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
