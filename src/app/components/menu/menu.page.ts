import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ConfigOptionsService } from 'src/app/services/config-options-service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  user: User;
  sideOption: any;

  public appPages = [];

  constructor( private menu: MenuController,
               private _userService: UserService,
               private _configOptionservice: ConfigOptionsService) { }

  ngOnInit() {
    this.user = this._userService.getLocalStorage();
    this.menu.open();
    if(this.user==null){
      // this.sideOption.user=false;
    }else{
      this.sideOption = this._configOptionservice.configOptionSidemenu(this.user.role);
      this.appPages = this._configOptionservice.upLoadMenu(this.sideOption, this.user);
    }
  }



  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

}
