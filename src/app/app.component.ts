import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { User } from './models/user';
import { UserService } from './services/user.service';
import { ConfigOptionsService } from './services/config-options-service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  user: User;
  sideOption: any;

  public appPages = [];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _userService: UserService,
    private _configOptionservice: ConfigOptionsService
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    // ***   Creacion auxiliar de un usuario
    // const userAux: User = new User('Global 1', 'userGlobal1', '123456', 'Global'); 
    // this._userService.crearUsuario(userAux);

  this.user = this._userService.getLocalStorage();

    if(this.user==null){
      // this.sideOption.user=false;
    }else{
      this.sideOption = this._configOptionservice.configOptionSidemenu(this.user.role);
      this.appPages = this._configOptionservice.upLoadMenu(this.sideOption, this.user);
    }

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
