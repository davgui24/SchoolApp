import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { ConfigOptionsService } from '../../services/config-options-service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-list-teacher',
  templateUrl: './list-teacher.page.html',
  styleUrls: ['./list-teacher.page.scss'],
})
export class ListTeacherPage implements OnInit {

  userLogin : User;

  constructor( private _userService: UserService,
               private _configOptionService: ConfigOptionsService,
               private _navCtrl: NavController                      ) { }

  ngOnInit() {

  this.userLogin= this._userService.getLocalStorage();

  this._configOptionService.roleLogin.emit(this.userLogin.role);

  

  }

  onClick(){
    this._navCtrl.navigateBack('register/' + "Teacher");
  }

}
