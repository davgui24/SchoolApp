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
    // recibimos el evento ta sea de login o de homedir, recivimos el usuario y segun el rol carga el menú
    this._configOptionservice.roleLogin.subscribe(user =>{
     if(user==null){
       this.appPages = [
        {
          title: 'User',
          url: 'list-admins',
          icon: 'person-add',
          validation: false
        },
        {
          title: 'School',
          url: 'home/',
          icon: 'home',
          validation: false
        },
        {
          title: 'Course',
          url: 'home/' ,
          icon: 'person-add',
          validation: false
        },
        {
          title: 'Group',
          url: 'home/',
          icon: 'person-add',
          validation: false
        },
        {
          title: 'Subjects',
          url: 'home/',
          icon: 'person-add',
          validation: false
        },
        {
          title: 'Activity',
          url: 'home/',
          icon: 'person-add',
          validation: false
        },
        {
          title: 'LogOut',
          url: 'login',
          icon: 'power',
          validation: false
        },
      ];
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
