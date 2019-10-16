import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Course } from '../../models/course';
import { User } from '../../models/user';
import { Subject } from '../../models/subject';
import { School } from 'src/app/models/school';
import { SchoolService } from '../../services/school.service';
import { UserService } from '../../services/user.service';
import { Group } from '../../models/group';
import { AlertController, NavController } from '@ionic/angular';
import { ConfigOptionsService } from 'src/app/services/config-options-service';

@Component({
  selector: 'app-register-group',
  templateUrl: './register-group.page.html',
  styleUrls: ['./register-group.page.scss'],
})
export class RegisterGroupPage implements OnInit, OnDestroy {

  constructor(private _schoolServices: SchoolService,
              private _userService: UserService,
              public alertController: AlertController,
              private navCtrl: NavController,
              private _configOptionservice: ConfigOptionsService) { }

  public FormEntity: FormGroup;
  name:string;
  course: Course;
  courses: Course[] = [];
  director: User;
  subjects: Subject[] = [];
  subjectsSelect: Subject[] = [];
  subjectsGroup: any[] = [];
  school: School;
  userLogin: User;
  group: Group;
  enableSelectSubject: boolean;
  enableSelectCourse: boolean;

  ngOnInit() {
    // this.enableSelectSubject = false;
    this.userLogin = this._userService.getLocalStorage();
    this._configOptionservice.roleLogin.emit(this.userLogin.role);

    if(localStorage.getItem('groupEdit')){
      this.group = JSON.parse(localStorage.getItem('groupEdit'));
      this._schoolServices.verificarSchool(this.userLogin.school).then((school: School) =>{

        for(let courseDB of school.courses){
          if(courseDB.id == this.group.course){

              for(let subjectCurrent of this.group.subjects){
                this.subjectsSelect.push(subjectCurrent);
              }

              for(let subjectDB of school.subcjet){
                if(courseDB.id == subjectDB.course.id){
                  if(!subjectDB.stateGroup){
                    console.log('Los que estan sin uso', subjectDB);
                    this.subjectsSelect.push(subjectDB);
                  }
                }
              }

           for(let subjectGroup of this.group.subjects){
            for(let subjectSelect of this.subjectsSelect){
              if(subjectGroup.id == subjectSelect.id){
                this.subjectsGroup.push(subjectGroup.id);
              }
            }
           }
           break;
          }
        }

        this.enableSelectSubject = true;
        this.enableSelectCourse = false;
        // console.log('Estos son la materias', this.subjectsGroup);
        console.log(this.subjectsSelect);
      })
    }else{
      this.enableSelectSubject = false;
      this.enableSelectCourse = true;
      this.subjectsGroup = [];
      this.group = new Group('', '', '', '', this.subjectsGroup);
    }

    this.updateCourse();
    this.initForm();
  }


  updateCourse(){
     this._schoolServices.verificarSchool(this.userLogin.school).then((school: School) =>{
       this.school = school;
       this.courses = school.courses;
       this.subjects = school.subcjet;
     })
  }

  // -----------------

  fillSubjects(){
    this.enableSelectSubject = true;
    this.subjectsSelect = [];
        for(let subject of this.subjects){
           if(subject.course.id == this.FormEntity.value.course && !subject.stateGroup){
            this.subjectsSelect.push(subject);
           }
        }

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
        name: new FormControl(this.group.name, [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(100)
        ]),
        course: new FormControl(this.group.course, [
          Validators.required,
          // Validators.minLength(6),
          // Validators.maxLength(100)
      ]),
        director: new FormControl(this.group.directorGroup, [
            // Validators.required,
            Validators.minLength(6),
            Validators.maxLength(100)
        ]),
        subjects: new FormControl(this.group.subjects, [
          Validators.required,
          // Validators.minLength(6),
          // Validators.maxLength(100)
      ]),
    });
  }

  // ==================================

  registerForm(){
    if(this.FormEntity.valid){
      if(localStorage.getItem('groupEdit')){

        let subjects: Subject[] = [];
        for(let i in this.school.subcjet){
          for(let subjectSelet of this.FormEntity.value.subjects){
            if(this.school.subcjet[i].id == subjectSelet){
              subjects.push(this.school.subcjet[i]);
            }
          }
        }

        let newGroup: Group = new Group(this.FormEntity.value.name, this.FormEntity.value.director, this.userLogin.school, this.FormEntity.value.course, subjects);
        let groupCurrent: Group = JSON.parse(localStorage.getItem('groupEdit'));
        groupCurrent.name = newGroup.name;
        groupCurrent.directorGroup = newGroup.directorGroup;
        groupCurrent.course = newGroup.course;
        groupCurrent.subjects = newGroup.subjects;


        // Igualamos lso stateGroup a false  a todar las asignaturas que vienen en grupo del localstorage
         for(let i in this.school.subcjet){
           for(let subjectCurrent of JSON.parse(localStorage.getItem('groupEdit')).subjects){
            if(this.school.subcjet[i].id == subjectCurrent.id){
              this.school.subcjet[i].stateGroup = false;
            }
           }
         }

        // vaciamos el arreglo de asignatiras el el grupo selecionado
        for(let i in this.school.groups){
          if(this.school.groups[i].id == groupCurrent.id){
            this.school.groups[i].subjects = [];
          }
        }

        // Igualamos lso stateGroup a false  a todar las asignaturas que vienen en grupo del localstorage
        for(let i in this.school.subcjet){
          for(let subjectCurrent of groupCurrent.subjects){
          if(this.school.subcjet[i].id == subjectCurrent.id){
            this.school.subcjet[i].stateGroup = true;
          }
          }
        }


        // asignamos las nuevas asignaturas
        for(let i in this.school.groups){
          if(this.school.groups[i].id == groupCurrent.id){
            this.school.groups[i].subjects = groupCurrent.subjects;
          }
        }

          console.log(this.school); 
      
        groupCurrent.dateUpdate = new Date().toString();
        for(let i in this.school.groups){
          if(groupCurrent.id == this.school.groups[i].id){
            
            this.school.groups[i] = groupCurrent;
            console.log(this.school);
            if(this._schoolServices.editarSchool(this.school)){
              this.presentAlert('👍', 'Success', 'The group was edited correctly')
              this.navCtrl.navigateBack("list-group");
            }else{
              this.presentAlert('👎', 'Failure', 'The group could not be edited')
            }
            break;
          }
        }
      }else{
        let validateGroup: boolean = false;
        let subjects: Subject[] = [];
        for(let subjectDB of this.school.subcjet){
          for(let subjectSelect of this.FormEntity.value.subjects){
            if(subjectSelect == subjectDB.id){
              subjectDB.stateGroup = true;
              subjects.push(subjectDB);
            }
          }
        }

        let newGroup: Group = new Group(this.FormEntity.value.name, this.FormEntity.value.director, this.userLogin.school, this.FormEntity.value.course, subjects);
        if(!this.school.groups){
          this.school.groups = [];
          this.school.groups.push(newGroup);
          if(this._schoolServices.editarSchool(this.school)){
            this.presentAlert('👍', 'Success', 'The group has been created successfully');
            this.FormEntity.reset();
          }else{
            this.presentAlert('👎', 'Failure', 'Could not create group');
          }
        }else{
          for(let group of this.school.groups){
            if(group.name == this.FormEntity.value.name){
              validateGroup = true;
              break;
            }
          }

          if(validateGroup){
            this.presentAlert('👎', 'Failure', 'A group with this registered name already exists.')
          }else{
            this.school.groups.push(newGroup);
            if(this._schoolServices.editarSchool(this.school)){
              this.presentAlert('👍', 'Success', 'The group has been created successfully');
              this.FormEntity.reset();
            }else{
              this.presentAlert('👎', 'Failure', 'Could not create group');
            }
          }
          
        }
      }
    }else{
      this.markAsDirty(this.FormEntity);
    }
  }


  // -------------------

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
       localStorage.removeItem('groupEdit');
    }


}