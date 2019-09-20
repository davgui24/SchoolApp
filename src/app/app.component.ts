import { Component, OnInit } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { User } from './models/user';
import { UserService } from './services/user.service';
import { ConfigOptionsService } from './services/config-options-service';
import { homedir } from 'os';


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
    // recibimos el evento ta sea de login o de homedir, recivimos el usuario y segun el rol carga el menú
    this._configOptionservice.roleLogin.subscribe(user =>{
     if(user==null){
       this.appPages[0].validation = false;
       this.appPages[1].validation = false;
       this.appPages[2].validation = false;
       this.appPages[3].validation = false;
       this.appPages[4].validation = false;
       this.appPages[5].validation = false;
       this.appPages[6].validation = false;
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
