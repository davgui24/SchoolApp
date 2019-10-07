import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';
import { SchoolService } from '../../services/school.service';
import { ConfigOptionsService } from 'src/app/services/config-options-service';
import { NavController, LoadingController } from '@ionic/angular';
import { School } from 'src/app/models/school';
import { Group } from '../../models/group';

@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.page.html',
  styleUrls: ['./list-group.page.scss'],
})
export class ListGroupPage implements OnInit {

  userLogin: User;
  school: School;
  groups: Group[] = [];

  constructor(private _userService: UserService,
              private _configOptionService: ConfigOptionsService,
              private navCtrl: NavController,
              private _schoolService: SchoolService,
              public loadingController: LoadingController) { }

  ngOnInit() {
    this.userLogin= this._userService.getLocalStorage();
    this._configOptionService.roleLogin.emit(this.userLogin.role);
    this.uploadGroups();
  }


  async uploadGroups(){
    const loading = await this.loadingController.create({
      message: 'Wait a few seconds',
    });
    loading.present();


    this._schoolService.verificarSchool(this.userLogin.school).then((school: School) =>{
      this.school = school;

      for(let group of school.groups){
        this.groups.push(group);
      }
      loading.dismiss();
    });
  }
  
  // ------------------------------

  addGroup(){
    this.navCtrl.navigateBack("register-group");
  }

  editGroup(group){
    localStorage.setItem('groupEdit', JSON.stringify(group));
    this.navCtrl.navigateBack('register-group');
  }
}
