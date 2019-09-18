import { Injectable } from '@angular/core';
import { inputFormUser, sideOption } from '../config';

@Injectable({
  providedIn: 'root'
})
export class ConfigOptionsService {
 


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
      sideOption.school = true;
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
 
}
