import { Injectable } from '@angular/core';
import { inputFormUser, sideOption } from '../config';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ConfigOptionsService {
 
  public appPages = [];

  constructor() { }
  
  // validate role from form user
  configFormUser(role:string) {
    if(role == 'Global') {
      inputFormUser.inputSchool= true;
      inputFormUser.ImputGroup = false;
      inputFormUser.ImputStudents = false;
    }else if(role == 'Admin') {
      inputFormUser.inputSchool= true;
      inputFormUser.ImputGroup = false;
      inputFormUser.ImputStudents = false;
    }else if(role == 'Teacher') {
      inputFormUser.inputSchool= false;
      inputFormUser.ImputGroup = true;
      inputFormUser.ImputStudents = true;
    }else if(role == 'Student') {
      inputFormUser.inputSchool= false;
      inputFormUser.ImputGroup = true;
      inputFormUser.ImputStudents = false;
    }else if(role == 'Father') {
      inputFormUser.inputSchool= false;
      inputFormUser.ImputGroup = false;
      inputFormUser.ImputStudents = false;
    }
    return inputFormUser;
  }


  // validate role from sideMenu user
  configOptionSidemenu(role: string){
    if(role == 'Global') {
      sideOption.user = true;
      sideOption.school = true;
      sideOption.course = false;
      sideOption.group= false;
      sideOption.subject = false;
      sideOption.activity = false;
    }else if(role == 'Admin') {
      sideOption.user = true;
      sideOption.school = false;
      sideOption.course = true;
      sideOption.group = true;
      sideOption.subject = true;
      sideOption.activity = true;
    }else if(role == 'Teacher') {
      sideOption.user = true;
      sideOption.school = false;
      sideOption.course = true;
      sideOption.group = true;
      sideOption.subject = true;
      sideOption.activity = true;
    }else if(role == 'Student') {
      sideOption.user = false;
      sideOption.school = false;
      sideOption.course = false;
      sideOption.group = true;
      sideOption.subject = true;
      sideOption.activity = true;
    }else if(role == 'Father') {
      sideOption.user = false;
      sideOption.school = false;
      sideOption.course = false;
      sideOption.group = true;
      sideOption.subject = true;
      sideOption.activity = true;
    }
    return sideOption;
  }



  upLoadMenu(sideOption: any, user: User){
    this.appPages = [
      {
        title: 'User',
        url: 'list-admins',
        icon: 'person-add',
        validation: sideOption.user
      },
      {
        title: 'School',
        url: 'home/' + user.id,
        icon: 'home',
        validation: sideOption.school
      },
      {
        title: 'Course',
        url: 'home/' + user.id,
        icon: 'person-add',
        validation: sideOption.course
      },
      {
        title: 'Group',
        url: 'home/' + user.id,
        icon: 'person-add',
        validation: sideOption.group
      },
      {
        title: 'Subjects',
        url: 'home/' + user.id,
        icon: 'person-add',
        validation: sideOption.subject
      },
      {
        title: 'Activity',
        url: 'home/' + user.id,
        icon: 'person-add',
        validation: sideOption.activity
      },
      {
        title: 'Login',
        url: 'login',
        icon: 'power',
        validation: true
      },
    ];
    return this.appPages;
  }
 
}
