import { Injectable, EventEmitter } from '@angular/core';
import { inputFormUser, sideOption, selectRole } from '../config';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ConfigOptionsService {
 
  public appPages = [];
  roleLogin = new EventEmitter<any>();

  constructor() { }
  
  // validate role from form user
  configFormUser(role:string) {
    if(role == 'Global') {
      inputFormUser.inputSchool= false;
      inputFormUser.ImputGroup = false;
      inputFormUser.ImputStudents = false;
    }else if(role == 'Admin') {
      inputFormUser.inputSchool= false;
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
      sideOption.logOut = true;
    }else if(role == 'Admin') {
      sideOption.user = true;
      sideOption.school = false;
      sideOption.course = true;
      sideOption.group = true;
      sideOption.subject = true;
      sideOption.activity = true;
      sideOption.logOut = true;
    }else if(role == 'Teacher') {
      sideOption.user = true;
      sideOption.school = false;
      sideOption.course = true;
      sideOption.group = true;
      sideOption.subject = true;
      sideOption.activity = true;
      sideOption.logOut = true;
    }else if(role == 'Student') {
      sideOption.user = false;
      sideOption.school = false;
      sideOption.course = false;
      sideOption.group = true;
      sideOption.subject = true;
      sideOption.activity = true;
      sideOption.logOut = true;
    }else if(role == 'Father') {
      sideOption.user = false;
      sideOption.school = false;
      sideOption.course = false;
      sideOption.group = true;
      sideOption.subject = true;
      sideOption.activity = true;
      sideOption.logOut = true;
    }else{
      sideOption.user = false;
      sideOption.school = false;
      sideOption.course = false;
      sideOption.group = false;
      sideOption.subject = false;
      sideOption.activity = false;
      sideOption.logOut = false;
    }
    return sideOption;
  }


  configSelectRole(role: string){
    if(role == 'Global'){
      selectRole.global = true;
      selectRole.admin = false;
      selectRole.teacher = false;
      selectRole.father = false;
      selectRole.student = false;
    }else if(role == 'Admin'){
      selectRole.global = false;
      selectRole.admin = false;
      selectRole.teacher = true;
      selectRole.father = true;
      selectRole.student = true;
    }else if(role == 'Teacher'){
      selectRole.global = false;
      selectRole.admin = false;
      selectRole.teacher = false;
      selectRole.father = false;
      selectRole.student = false;
    }else if(role == 'Father'){
      selectRole.global = false;
      selectRole.admin = false;
      selectRole.teacher = false;
      selectRole.father = false;
      selectRole.student = false;
    }else if(role == 'Student'){
      selectRole.global = false;
      selectRole.admin = false;
      selectRole.teacher = false;
      selectRole.father = false;
      selectRole.student = false;
    }else{
      selectRole.global = false;
      selectRole.admin = false;
      selectRole.teacher = false;
      selectRole.father = false;
      selectRole.student = false;
    }
    return selectRole;
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
        title: 'LogOut',
        url: 'login',
        icon: 'power',
        validation: sideOption.logOut
      },
    ];
    return this.appPages;
  }
 
}
