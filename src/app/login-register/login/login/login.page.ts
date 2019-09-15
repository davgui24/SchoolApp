import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ConfigOptionsService } from 'src/app/services/config-options-service';
import { NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  users: User[] = [];
  user: User = null;
  username: string;
  password: string;
  role: string;

  constructor(private _userService: UserService,
             private _configOptionsService: ConfigOptionsService,
             private navCtrl: NavController,
             public loadingController: LoadingController
             ) { }

  ngOnInit() {

  }



  loginForm(){
    this._userService.getUsuarios().then(async(users: any) =>{
       
      const loading = await this.loadingController.create({
        message: 'Hellooo',
        // duration: 2000
      });

      if(users){
        this.users = users;
        for(let i=0; i<this.users.length; i++){
          if(this.username == this.users[i].username && this.password == this.users[i].password && this.role == this.users[i].role){
            loading.onDidDismiss();
            this._userService.setLocalStorage(this.role)
            this.navCtrl.navigateBack("/home");
            break;
          }else{

          }
        }
        // console.log(this._configOptionsService.configFormUser(this.users[0].role));;
      }
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
