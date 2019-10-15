import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { School } from 'src/app/models/school';
import { UserService } from 'src/app/services/user.service';
import { SchoolService } from 'src/app/services/school.service';
import { ConfigOptionsService } from 'src/app/services/config-options-service';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.page.html',
  styleUrls: ['./list-student.page.scss'],
})
export class ListStudentPage implements OnInit {

  userlogin: User;
  schools: School[] = [];
  students: User[] = [];

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
        this.loadStudents();
  }


  
  // Cargamos a los estuduantes 
  async loadStudents(){
    const loading = await this.loadingController.create({
      message: 'Wait a few seconds',
    });
    loading.present();



    this._schoolService.getSchools().then((schools: School[]) =>{
      this.schools = schools;

      for(let school of schools){
        loading.dismiss();
        if(school.students){
          // loading.dismiss();
          for(let studentDB of school.students){
            this.students.push(studentDB)
          }
        }else{
          school.students = [];
        }
      }
      console.log(this.students);
    })
  }



  editStudent(student){
    localStorage.setItem('studentEdit', JSON.stringify(student));
    this.navCtrl.navigateBack("register/" + 'Student');
  }

  addStudent(){
    this.navCtrl.navigateBack("register/" + 'Student');
  }


}
