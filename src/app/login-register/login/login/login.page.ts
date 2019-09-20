import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ConfigOptionsService } from 'src/app/services/config-options-service';
import { NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { SchoolService } from '../../../services/school.service';
import { School } from 'src/app/models/school';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  users: User[] = [];
  admins: User[] = [];
  user: User;
  username: string = 'userAdmin1';
  password: string = '123456';
  role: string = 'Admin';

  constructor(private _userService: UserService,
             private _schoolService: SchoolService,
             private _configOptionsService: ConfigOptionsService,
             private navCtrl: NavController,
             public loadingController: LoadingController,
             ) { }

  ngOnInit() {
    this._configOptionsService.roleLogin.emit(null);

  localStorage.clear();
  this. upLoadusers();
  }

  upLoadusers(){
    this._userService.getUsuarios().then((users: User[]) =>{
      // llenamos el arreglo de usuarios globales
      users.forEach(user => {
        this.users.push(user);
      });

      // Seguimos llenando el arreglo de los demas usuarios
      this._schoolService.getSchools().then((schools: School[]) =>{
        schools.forEach(school => {
          school.admin.forEach(admin => {
            this.users.push(admin);
          });
          if(school.teachers==null){
            school.teachers = [];
          }
          school.teachers.forEach(teacher => {
            this.users.push(teacher);
          });
          if(school.students==null){
            school.students = [];
          }
          school.students.forEach(student => {
            this.users.push(student);
          });
          if(school.fathers==null){
            school.fathers = [];
          }
          school.fathers.forEach(father => {
            this.users.push(father)
          })
        });
      })
    })
  }



  async  loginForm(){
          const loading = await this.loadingController.create({
            message: 'Hellooo',
            // duration: 2000
          });

            for(let i=0; i<this.users.length; i++){
              if(this.username == this.users[i].username && this.password == this.users[i].password && this.role == this.users[i].role){
                loading.onDidDismiss();
                if(this.users[i].school != null){
                  this._schoolService.getSchools().then((schools: School[]) =>{
                    for(let j=0; j<schools.length; j++){
                      if(schools[j].id == this.users[i].school){
                        for(let k=0; k<schools[j].admin.length; k++){
                          if(schools[j].admin[k].id == this.users[i].id){
                            schools[j].admin[k].lastLogin = new Date().toString();
                            console.log(this._schoolService.editarSchool(schools[j]));
                            this.navCtrl.navigateBack("home/" + this.users[i].id);
                            break;
                          }
                        }
                        break;
                      }else{
                        console.log('No se encontro el colegio');
                      }
                    }
                  })
                }else{
                  console.log(this._userService.editarUsuario(this.users[i]));
                  this.navCtrl.navigateBack("home/" + this.users[i].id);
                }
                break;
              }else{
               console.log('No se pudo loguear');
              }
            }
      }




  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Hellooo',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

     console.log('Loading dismissed!');
  }


  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }
}
