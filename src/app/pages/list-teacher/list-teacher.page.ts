import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { ConfigOptionsService } from '../../services/config-options-service';
import { NavController } from '@ionic/angular';
import { SchoolService } from '../../services/school.service';
import { School } from '../../models/school';

@Component({
  selector: 'app-list-teacher',
  templateUrl: './list-teacher.page.html',
  styleUrls: ['./list-teacher.page.scss'],
})
export class ListTeacherPage implements OnInit {

  userLogin : User;
  schools: School[] = [];
  school: School;
  teachers: User[] = [];

  constructor(private _userService: UserService,
              private _configOptionService: ConfigOptionsService,
              private navCtrl: NavController,
              private _schoolService: SchoolService) { }

  ngOnInit() {
  this.userLogin= this._userService.getLocalStorage();
  this._configOptionService.roleLogin.emit(this.userLogin.role);
  this.uploadteachers();
  }

   uploadteachers(){
     this._schoolService.getSchools().then((schools: School[]) =>{
       this.schools = schools;

       for(let school of this.schools){
         if(school.id == this.userLogin.school){
           this.school = school;

           if(this.school.teachers){
            for(let teacher of this.school.teachers){
              this.teachers.push(teacher)
            }
           }else{
            this.school.teachers = [];
           }
           break;
         }
       }
     })
   }


  //  ------------------


  editTeacher(teacher){
    localStorage.setItem('teacherList', JSON.stringify(teacher));
    this.navCtrl.navigateBack("register/" + 'Teacher');
  }

  // ----------------

  logScrollStart(){

  }

  loadData(event){
    console.log(event);
  }

}
