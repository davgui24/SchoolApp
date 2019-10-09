import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { School } from 'src/app/models/school';
import { SchoolService } from 'src/app/services/school.service';
import { NavController, LoadingController } from '@ionic/angular';
import { ConfigOptionsService } from 'src/app/services/config-options-service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-school',
  templateUrl: './list-school.page.html',
  styleUrls: ['./list-school.page.scss'],
})
export class ListSchoolPage implements OnInit {

  userlogin: User;
  school: School;
  schools: School[] = [];

  constructor(private _schoolService: SchoolService,
    private navCtrl: NavController,
    private _configOptionservice: ConfigOptionsService,
    private _userService: UserService,
    public loadingController: LoadingController) { }


  ngOnInit() {
    this.userlogin = this._userService.getLocalStorage();
    this._configOptionservice.roleLogin.emit(this.userlogin.role);

   this.upLoadSchool();
  }



  async upLoadSchool(){
    const loading = await this.loadingController.create({
      message: 'Wait a few seconds',
    });
    loading.present();



    this._schoolService.getSchools().then((schools: School[]) =>{
      this.schools = schools;
      loading.dismiss();
      for(let school of this.schools){
         if(school.id === this.userlogin.school){
          
            this.school = school;
            break;
         }else{
          //  console.log('No lo encontró');
         }
         
      }
    })
  }


  // --------------------

  
  editSchool(school){
    localStorage.setItem('schoolList', JSON.stringify(school));
    this.navCtrl.navigateBack("register-school");
  }

  addSchool(){
    this.navCtrl.navigateBack("register-school");
  }


  // -----------------------
  logScrollStart(){

  }

  loadData(event){
    console.log(event);
  }


}
