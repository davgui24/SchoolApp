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
    // emitimos un evento indicando que no hay usuario logueado, para que lo reciba el app.Component y no cargue ninguna opcion en el menú
    this._configOptionsService.roleLogin.emit(this.user);

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
      this.presentAlert(form);
    }else if(form.value.role == ''){
      this.validateRole = true;
      console.log('Entró 2');
    }else if(form.value.username.trim().length < 6){
      this.validateUser = true;
      console.log('Entró 3');
    }else if(form.value.password.trim().length < 6){
        this.validatePassword = true;
        console.log('Entró 4');
    }else{

    }
    


          const loading = await this.loadingController.create({
            message: 'Hellooo',
            // duration: 2000
          });

          if(this.role == 'Global' && this.username.trim().length===0 && this.password.trim().length===0){
            // for(let user of this.users =>{
               console.log('Entra como global');
            // })
          }else if(this.role == 'Global' && this.username.trim().length>0 && this.password.trim().length>0){

          }

            for(let i=0; i<this.admins.length; i++){
              if(this.username == this.admins[i].username && this.password == this.admins[i].password && this.role == this.admins[i].role){
                loading.onDidDismiss();
                if(this.admins[i].school != null){
                  this._schoolService.getSchools().then((schools: School[]) =>{
                    for(let j=0; j<schools.length; j++){
                      if(schools[j].id == this.admins[i].school){
                        for(let k=0; k<schools[j].admin.length; k++){
                          if(schools[j].admin[k].id == this.admins[i].id){
                            schools[j].admin[k].lastLogin = new Date().toString();
                            console.log(this._schoolService.editarSchool(schools[j]));
                            this.navCtrl.navigateBack("home/" + this.admins[i].id);
                            break;
                          }
                        }
                        break;
                      }else{
                        console.log('No se encontro el colegio');
                      }
                    }
                  })
                }else{
                  console.log(this._userService.editarUsuario(this.admins[i]));
                  this.navCtrl.navigateBack("home/" + this.admins[i].id);
                }
                break;
              }else{
               console.log('No se pudo loguear');
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
  async presentAlert(form) {

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
      inputs: [
        {
          name: 'username',
          type: 'text',
          placeholder: 'Enter username'
        },
        {
          name: 'password',
          type: 'password',
          placeholder: 'Enter password'
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
            this.validateRole = false;
            this.validatePassword = false;
            this.validateUser = false;
            console.log('Entró 1');
            for(let user of this.users){
              if(dataLogin.username == user.username && dataLogin.password == user.password){
                loading.onDidDismiss();
                user.lastLogin = new Date().toString();
                console.log(this._userService.editarUsuario(user));
                this.navCtrl.navigateBack("home/" + user.id);
              }else{
                console.log('Salio mal 1');
              }
            }
          }
        }
      ]

    });

    await alert.present();
  }

}
