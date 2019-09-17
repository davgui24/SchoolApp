import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';
import { SchoolService } from '../../services/school.service';
import { ActivatedRoute } from '@angular/router';
import { School } from 'src/app/models/school';

@Component({
  selector: 'app-assign-admin-to-school',
  templateUrl: './assign-admin-to-school.page.html',
  styleUrls: ['./assign-admin-to-school.page.scss'],
})
export class AssignAdminToSchoolPage implements OnInit {

  admin: User;
  admins: User[] = [];
  school: School;

  constructor(private activatedRoute: ActivatedRoute,
              private _userServices: UserService,
              private _schoolService: SchoolService) { }

  ngOnInit() { 
    let idSchool = this.activatedRoute.snapshot.paramMap.get('idSchool');
    this._schoolService.verificarSchool(idSchool).then((school: School) =>{
      this.school = school;
    })


    this._userServices.getUsuarios().then((users: User[]) =>{
      users.forEach(user => {
        if(user.role == 'Admin'){
           this.admins.push(user);
        }
      });

    })
  }




  registerForm(){
   this.school.admin = this.admin;
   this.admin.school = this.school;
  //  this._schoolService.editarSchool(this.school);
  //  this._userServices.editarUsuario(this.admin);
  }

}
