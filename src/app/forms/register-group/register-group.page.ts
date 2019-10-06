import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Course } from '../../models/course';
import { User } from '../../models/user';
import { Subject } from '../../models/subject';
import { School } from 'src/app/models/school';
import { SchoolService } from '../../services/school.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register-group',
  templateUrl: './register-group.page.html',
  styleUrls: ['./register-group.page.scss'],
})
export class RegisterGroupPage implements OnInit {

  constructor(private _schoolServices: SchoolService,
              private _userService: UserService) { }

  public FormEntity: FormGroup;
  name:string;
  course: Course;
  courses: Course[] = [];
  director: User;
  subjects: Subject[] = [];
  subjectsSelect: Subject[] = [];
  school: School;
  userLogin: User;

  enableSelectSubject: boolean;

  ngOnInit() {
    this.enableSelectSubject = false;
    this.userLogin = this._userService.getLocalStorage();
    this.updateCourse();
    this.initForm();
  }


  updateCourse(){
     this._schoolServices.verificarSchool(this.userLogin.school).then((school: School) =>{
       this.courses = school.courses;
       this.subjects = school.subcjet;
     })
  }

  // -----------------

  fillSubjects(){
    this.enableSelectSubject = true;
        for(let subject of this.subjects){
           if(subject.course.id == this.FormEntity.value.course){
            this.subjectsSelect.push(subject);
           }
        }
      console.log(this.subjectsSelect);
      console.log(this.subjects);
  }


  // *************************
  public frmEntity(){
    return this.FormEntity.controls;
  }

  public markAsDirty(form: FormGroup) {
    let controlKeys = Object.keys(form.controls);
    controlKeys.forEach(key => {
      let control = form.controls[key];
      control.markAsDirty();
    });
  }
// *************************

  private initForm() {  
    this.FormEntity = new FormGroup({
        name: new FormControl(this.name, [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(100)
        ]),
        course: new FormControl(this.course, [
          Validators.required,
          // Validators.minLength(6),
          // Validators.maxLength(100)
      ]),
        director: new FormControl(this.director, [
            Validators.required,
            // Validators.minLength(6),
            // Validators.maxLength(100)
        ]),
        subjects: new FormControl(this.subjects, [
          Validators.required,
          // Validators.minLength(6),
          // Validators.maxLength(100)
      ]),
    });
  }

}
