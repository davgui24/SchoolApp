import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { SchoolService } from '../../services/school.service';
import { School } from '../../models/school';

@Component({
  selector: 'app-list-admins',
  templateUrl: './list-admins.page.html',
  styleUrls: ['./list-admins.page.scss'],
})
export class ListAdminsPage implements OnInit {
  user: User;
  users: User[] = [];
  shcool: School[]=[];
  admins: School[]=[];

  constructor(
               private _userService: UserService,
               private _shoolService : SchoolService) { }

  ngOnInit() {
    this.user = this._userService.getLocalStorage();
    this.users = this._userService.getTeachersByAdmin(this.user);
    this._shoolService.getSchools().then((school: School[])=> {
      this.shcool = school;
      console.log( 'colegios',this.shcool);
      this.shcool.forEach(admin => {
          this.admins.push(admin);

          this.admins.forEach(admin => {
            this.admins.push(admin);
            this.admins.forEach(username => {
              this.admins.push(username);
            });
            console.log(this.admins);
          });
          
          
        });
      // this.shcool.forEach(admin => {
      //   this.shcool.push(admin );
      //   this.shcool.forEach(admin => {
      //     this.shcool.push(admin);
      //   });
      // });
      console.log( 'admins',this.shcool);
      // console.log('colegios', this.shcool);
      
    });

    // this._schoolService.getSchools().then( (school: Schools[]) ={
    //   this.schools =schools
    // };

    // console.log('Estos son los Teachers', this.users);
    // console.log('Este es el usuario ',this.user);
  }

}



