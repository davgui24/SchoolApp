import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { School } from 'src/app/models/school';
import { Subject } from '../../models/subject';
import { SchoolService } from 'src/app/services/school.service';
import { NavController, LoadingController } from '@ionic/angular';
import { ConfigOptionsService } from 'src/app/services/config-options-service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-subject',
  templateUrl: './list-subject.page.html',
  styleUrls: ['./list-subject.page.scss'],
})
export class ListSubjectPage implements OnInit {

  userlogin: User;
  school: School;
  schools: School[] = [];
  subjects: Subject[] = [];

  constructor(private _schoolService: SchoolService,
    private navCtrl: NavController,
    private _configOptionservice: ConfigOptionsService,
    private _userService: UserService,
    public loadingController: LoadingController) { }


  ngOnInit() {
    this.userlogin = this._userService.getLocalStorage();
    this._configOptionservice.roleLogin.emit(this.userlogin.role);
    this. upLoadSchool();
  }

  // ---------------

  async upLoadSchool(){
    const loading = await this.loadingController.create({
      message: 'Wait a few seconds',
    });
    loading.present();



    this._schoolService.getSchools().then((schools: School[]) =>{
      this.schools = schools;

      for(let school of this.schools){
         if(school.id === this.userlogin.school){
          loading.dismiss();
            this.school = school;

            if(this.school.subcjet){
              for(let subject of this.school.subcjet){
                this.subjects.push(subject);
              }
            }else{
              this.school.subcjet = [];
            }
            break;
         }else{
          //  console.log('No lo encontró');
         }
         
      }
    })
  }

  // ------------------------------------

  editSubject(subject){
    localStorage.setItem('subjectList', JSON.stringify(subject));
    this.navCtrl.navigateBack("register-subjects");
  }


  addSubject(){
    this.navCtrl.navigateBack("register-subjects");
  }

    // -----------------------
    logScrollStart(){

    }
  
    loadData(event){
      console.log(event);
    }
  


}
