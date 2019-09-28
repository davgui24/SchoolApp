import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ConfigOptionsService } from 'src/app/services/config-options-service';
import { NavController } from '@ionic/angular';
import { SchoolService } from '../../services/school.service';
import { User } from 'src/app/models/user';
import { School } from 'src/app/models/school';

@Component({
  selector: 'app-list-admin',
  templateUrl: './list-admin.page.html',
  styleUrls: ['./list-admin.page.scss'],
})
export class ListAdminPage implements OnInit {

  userlogin: User;
  schools: School[] = [];
  admins: User[] = [];

  constructor(private _userService: UserService,
    private _schoolService: SchoolService,
    private _configOptionservice: ConfigOptionsService,
    private navCtrl: NavController,) { }

  ngOnInit() {
      // Traemos el usuario logeado desde el localStorage
      this.userlogin = this._userService.getLocalStorage();

      // Emitimos el rol del usuario logeado para que lo reciba el appComponent (ver linea 41 del appComponent) y cargue el menú
    this._configOptionservice.roleLogin.emit(this.userlogin.role);
    this.loadAdmins();
  }



  // Cargamos a los admins 
  loadAdmins(){
    this._schoolService.getSchools().then((schools: School[]) =>{
      this.schools = schools;

      for(let school of schools){
        for(let admin of school.admin){
          this.admins.push(admin)
        }
      }
      console.log(this.admins);
    })
  }



  editAdmin(admin){
    localStorage.setItem('adminList', JSON.stringify(admin));
    this.navCtrl.navigateBack("register/" + 'Admin');
  }

}
