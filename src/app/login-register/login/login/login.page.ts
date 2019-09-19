import { Component, OnInit } from '@angular/core';
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
  user: any;
  username: string = 'userGlobal1';
  password: string = '123456';
  role: string = 'Global';

  constructor(private _userService: UserService,
             private _schoolService: SchoolService,
             private _configOptionsService: ConfigOptionsService,
             private navCtrl: NavController,
             public loadingController: LoadingController
             ) { }

  ngOnInit() {
  localStorage.clear();
  }



  loginForm(){
    this._userService.getUsuarios().then(async(users: any[]) =>{
       users[0].date

      // buscamos los adminstradores de colegios
      this._schoolService.getSchools().then((schools: School[]) =>{
        schools.forEach(school => {
         school.admin.forEach(async admin => {
          users.push(admin);

          const loading = await this.loadingController.create({
            message: 'Hellooo',
            // duration: 2000
          });
    
          if(users){
            this.users = users;
            for(let i=0; i<this.users.length; i++){
              if(this.username == this.users[i].username && this.password == this.users[i].password && this.role == this.users[i].role){
                loading.onDidDismiss();
                this.navCtrl.navigateBack("home/" + this.users[i].id);
                this.users[i].lastLogin = new Date().toString();
                this._userService.editarUsuario(this.users[i]);
                break;
              }else{
               console.log('No se pudo loguear');
              }
            }
          }
         });
        });
      })
      

  
    })
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

}
