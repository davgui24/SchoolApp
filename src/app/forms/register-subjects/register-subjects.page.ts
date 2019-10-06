import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { SubjectService } from 'src/app/services/subject.service';
import { Subject } from '../../models/subject';
import { School } from 'src/app/models/school';
import { SchoolService } from '../../services/school.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Course } from '../../models/course';
import { AlertController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { ConfigOptionsService } from 'src/app/services/config-options-service';

@Component({
  selector: 'app-register-subjects',
  templateUrl: './register-subjects.page.html',
  styleUrls: ['./register-subjects.page.scss'],
})
export class RegisterSubjectsPage implements OnInit {

  public FormEntity: FormGroup;
  userLogin: User;
  subject: Subject;
  idSchool: string;
  name: string ;
  code: string;
  course: Course;
  courses: Course[] = [];
  schools: School[] = [];
  school: School;

  usernameUnable: boolean = true;

  constructor(private _userService: UserService,
              private _subjectService: SubjectService,
              private _schoolService: SchoolService,
              public alertController: AlertController,
              private _configOptionservice: ConfigOptionsService) { }

  ngOnInit() {
    this.idSchool = this._userService.getLocalStorage().school;
    this.userLogin = this._userService.getLocalStorage();
    this._configOptionservice.roleLogin.emit(this.userLogin.role);
    this.uploadSchool();
    

    
    if(localStorage.getItem('subjectList')){
      this.subject = JSON.parse(localStorage.getItem('subjectList'));
      this.usernameUnable = false;
    }else{
      this.usernameUnable = true;
      let courseAux: Course = new Course('','','');
      courseAux.id = '';
      this.subject = new Subject('', '', '', courseAux);
    }
    this.initForm();
    
  }


  uploadSchool(){
    this._schoolService.getSchools().then((schools: School[]) =>{
      for(let i = 0; i<schools.length; i++){
        if(schools[i].id == this.idSchool){
          this.school = schools[i];
          for(let course of this.school.courses){
            this.courses.push(course);
          }
          break;
        }else{
          console.log('no entro');
        }
      }
    })
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
        name: new FormControl(this.subject.name, [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(100)
        ]),
        code: new FormControl(this.subject.code, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100)
      ]),
      course: new FormControl(this.subject.course.id, [
          Validators.required,
          // Validators.minLength(6),
          // Validators.maxLength(100)
      ]),
    });
  }
  
  

  registerForm(){
    if(this.FormEntity.valid){

      if(localStorage.getItem('subjectList')){
        this.subject = new Subject(this.FormEntity.value.name, this.FormEntity.value.code, this.school.id, this.FormEntity.value.course);
        for(let i in this.school.subcjet){
          if(this.FormEntity.value.code == this.school.subcjet[i].code){
            for(let course of this.school.courses){
              if(this.FormEntity.value.course == course.id){
                this.school.subcjet[i].name = this.FormEntity.value.name;
                this.school.subcjet[i].code = this.FormEntity.value.code;
                this.school.subcjet[i].course = course;
                break;
              }
            }
            break;
          }
        }
        
        if(this._schoolService.editarSchool(this.school)){
          this.presentAlert(':)', '👍', 'The subject has been successfully');
          this.FormEntity.reset();
        }else{
          this.presentAlert(':(', '👎', 'Failed to edit the subject');
        }
      }else{
        let validateSubject: boolean = false;

        if(this.school.subcjet == null){
          this.school.subcjet = [];
          this.subject = new Subject(this.FormEntity.value.name, this.FormEntity.value.code, this.school.id, this.FormEntity.value.course);
          this.school.subcjet.push(this.subject);
  
          if(this._schoolService.editarSchool(this.school)){
            this.presentAlert(':)', '👍', 'The subject was created successfully');
            this.FormEntity.reset();
          }else{
            this.presentAlert(':(', '👎', 'Error creating subject');
          }
        }else{
          for(let i in this.school.subcjet){
            if(this.FormEntity.value.code === this.school.subcjet[i].code){
              validateSubject = true;
              console.log('Es igual');
              break;
            }else{
              console.log('Entro');
              validateSubject = false;
            }
          }
  
          if(!validateSubject){
            let course: Course;
            for(let courseDB of this.school.courses){
              if(this.FormEntity.value.course == courseDB.id){
                course = courseDB;
                break;
              }
            }
            this.subject = new Subject(this.FormEntity.value.name, this.FormEntity.value.code, this.school.id, course);
            this.school.subcjet.push(this.subject);
  
            if(this._schoolService.editarSchool(this.school)){
              this.presentAlert(':)', '👍', 'The subject was created successfully');
              this.FormEntity.reset();
            }else{
              this.presentAlert(':(', '👎', 'Error creating subject');
            }
          }else{
            this.presentAlert(':(', '🤔', 'The subject code must be unique');
          }
        }
      }

  
    }else{
      this.markAsDirty(this.FormEntity);
    }
  }



     // ---------------------

     async presentAlert(header: string, subHeader: string, message: string) {
      const alert = await this.alertController.create({
        header: header,
        subHeader: subHeader,
        message: message,
        buttons: ['OK']
      });
  
      await alert.present();
    }




     // *******************
     ngOnDestroy(): void {
      localStorage.removeItem('subjectList');
  }
}
