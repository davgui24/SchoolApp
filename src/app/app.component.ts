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

  public appPages = []

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
    this.sideOption.user=false;
  } 
  this.sideOption = this._configOptionservice.configOptionSidemenu(this.user.role);
  this.upLoadMenu();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


  upLoadMenu(){
    this.appPages = [
      {
        title: 'User',
        url: 'list-admins',
        icon: 'person-add',
        validation: this.sideOption.user
      },
      {
        title: 'School',
        url: 'home/' + this.user.id,
        icon: 'home',
        validation: this.sideOption.school
      },
      {
        title: 'Course',
        url: 'home/' + this.user.id,
        icon: 'person-add',
        validation: this.sideOption.course
      },
      {
        title: 'Group',
        url: 'home/' + this.user.id,
        icon: 'person-add',
        validation: this.sideOption.group
      },
      {
        title: 'Subjects',
        url: 'home/' + this.user.id,
        icon: 'person-add',
        validation: this.sideOption.subject
      },
      {
        title: 'Activity',
        url: 'home/' + this.user.id,
        icon: 'person-add',
        validation: this.sideOption.activity
      },
      {
        title: 'Login',
        url: 'login',
        icon: 'power',
        validation: true
      },
    ];
  }
}
