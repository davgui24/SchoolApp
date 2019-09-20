import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { SchoolService } from 'src/app/services/school.service';
import { School } from '../../models/school';
import { ConfigOptionsService } from 'src/app/services/config-options-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  user: User;
  users: User[] = [];


  constructor(private activatedRoute: ActivatedRoute,
              private _userService: UserService,
              private _schoolService: SchoolService,
              private _configOptionservice: ConfigOptionsService) {  }

  ngOnInit() {
    this.getUser();
    // this.user = this._userService.getLocalStorage();
    // console.log('User', this.user);
    // this._configOptionservice.roleLogin.emit(this.user.role);
  }


  getUser(){
    let idUser = this.activatedRoute.snapshot.paramMap.get('idUser');
    this._userService.getUsuarios().then((users: User[]) =>{
      for(let i = 0; i < users.length; i++){
          this.users.push(users[i]);
      }      
    })

    this._schoolService.getSchools().then((schools: School[]) =>{
      schools.forEach(school => {
        school.admin.forEach((admin: User) => {
          this.users.push(admin);
        });
      });

      this.users.forEach(user => {
        if(idUser == user.id){
          this.user = user;
          // emitimos un evento indicando el usuario logueado, para que lo reciba el app.Component y cargue el menú segun el rol
          this._configOptionservice.roleLogin.emit(this.user);
          this._userService.setLocalStorage(user);
        }else{
          console.log('No se encontró usuario');
        }
      });
    })
  }
}
