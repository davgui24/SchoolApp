import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { School } from 'src/app/models/school';
import { UserService } from 'src/app/services/user.service';
import { SchoolService } from 'src/app/services/school.service';
import { ConfigOptionsService } from 'src/app/services/config-options-service';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-list-father',
  templateUrl: './list-father.page.html',
  styleUrls: ['./list-father.page.scss'],
})
export class ListFatherPage implements OnInit {

  userlogin: User;
  schools: School[] = [];
  fathers: User[] = [];

  constructor(private _userService: UserService,
              private _schoolService: SchoolService,
              private _configOptionservice: ConfigOptionsService,
              private navCtrl: NavController,
              public loadingController: LoadingController) { }

  ngOnInit() {
      // Traemos el usuario logeado desde el localStorage
      this.userlogin = this._userService.getLocalStorage();

      // Emitimos el rol del usuario logeado para que lo reciba el appComponent (ver linea 41 del appComponent) y cargue el menú
      this._configOptionservice.roleLogin.emit(this.userlogin.role);
      this.loadFather();
  }



  async loadFather(){
    const loading = await this.loadingController.create({
      message: 'Wait a few seconds',
    });
    loading.present();

    this._schoolService.getSchools().then((schools: School[]) =>{
      this.schools = schools;

      for(let school of schools){
        if(school.fathers){
          loading.dismiss();
          for(let father of school.fathers){
            this.fathers.push(father)
          }
        }else{
          school.fathers = [];
        }
      }
      console.log(this.fathers);
    })
  }

  // +++++++++++++++++++++++++++++

  
  editFather(father){
    localStorage.setItem('fatherEdit', JSON.stringify(father));
    this.navCtrl.navigateBack("register/" + 'Father');
  }

  addFather(){
    this.navCtrl.navigateBack("register/" + 'Father');
  }


  // +++++++++++++++++++++++++


  viewDetailFather(father){
    // localStorage.setItem('detailFather', JSON.stringify(father));
    // this.navCtrl.navigateBack('detail-father');
    console.log(father);
  }

}
