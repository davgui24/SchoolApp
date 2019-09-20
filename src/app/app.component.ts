import { Component, OnInit } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
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
    private _configOptionservice: ConfigOptionsService,
    private menu: MenuController,
  ) {
    this.initializeApp();
  }

  ngOnInit() {

    this._configOptionservice.roleLogin.subscribe(user =>{
      console.log('Emiter', user);
     if(user==null){
       console.log('Entro');
       this.appPages[0].validation = false;
       this.appPages[1].validation = false;
       this.appPages[2].validation = false;
       this.appPages[3].validation = false;
       this.appPages[4].validation = false;
       this.appPages[5].validation = false;
       this.appPages[6].validation = false;
      //  this.appPages[].validation = false;

      // this.sideOption = this._configOptionservice.configOptionSidemenu('No-Role');
      // this.appPages = this._configOptionservice.upLoadMenu(this.sideOption, user);
    }else{
      this.sideOption = this._configOptionservice.configOptionSidemenu(user.role);
      this.appPages = this._configOptionservice.upLoadMenu(this.sideOption, user);
    }
    });
    // ***   Creacion auxiliar de un usuario
    this.user = this._userService.getLocalStorage();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
