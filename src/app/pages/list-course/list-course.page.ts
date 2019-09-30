import { Component, OnInit, OnDestroy } from '@angular/core';
import { SchoolService } from '../../services/school.service';
import { User } from '../../models/user';
import { School } from 'src/app/models/school';
import { Course } from 'src/app/models/course';
import { NavController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { ConfigOptionsService } from 'src/app/services/config-options-service';

@Component({
  selector: 'app-list-course',
  templateUrl: './list-course.page.html',
  styleUrls: ['./list-course.page.scss'],
})
export class ListCoursePage implements OnInit {



  userlogin: User;
  school: School;
  schools: School[] = [];
  courses: Course[] = [];

  constructor(private _schoolService: SchoolService,
              private navCtrl: NavController,
              private _configOptionservice: ConfigOptionsService,
              private _userService: UserService,) { }

  ngOnInit() {
    this.userlogin = this._userService.getLocalStorage();
    this._configOptionservice.roleLogin.emit(this.userlogin.role);

   this.upLoadSchool();
  }



  upLoadSchool(){
    this._schoolService.getSchools().then((schools: School[]) =>{
      this.schools = schools;

      for(let school of this.schools){
         if(school.id === this.userlogin.school){
            this.school = school;

            if(this.school.courses){
              for(let course of this.school.courses){
                this.courses.push(course);
              }
            }else{
              this.school.courses = [];
            }
            break;
         }else{
          //  console.log('No lo encontró');
         }
         
      }
    })
  }


  // ---------------------------------


  editCourse(course){
    localStorage.setItem('courseList', JSON.stringify(course));
    this.navCtrl.navigateBack("register-course");
  }


  // -----------------------
  logScrollStart(){

  }

  loadData(event){
    console.log(event);
  }

}
