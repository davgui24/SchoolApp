import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course';
import { School } from 'src/app/models/school';
import { UserService } from 'src/app/services/user.service';
import { SchoolService } from 'src/app/services/school.service';
import { User } from 'src/app/models/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-register-course',
  templateUrl: './register-course.page.html',
  styleUrls: ['./register-course.page.scss'],
})
export class RegisterCoursePage implements OnInit {

  public FormEntity: FormGroup;
  userLogin: User;
  idSchool: string;
  name:string;
  grade: string;

  course: Course;
  courses: Course[] = [];
  school: School;

  constructor(private _userService: UserService,
              private _schoolService: SchoolService,
              public alertController: AlertController,
              private navCtrl: NavController,) { }

  ngOnInit() {
    this.userLogin = this._userService.getLocalStorage();
    this.idSchool = this._userService.getLocalStorage().school;
    this.uploadSchool();
    this.initForm();
  }


  uploadSchool(){
    this._schoolService.verificarSchool(this.userLogin.school).then((school: School) =>{
      this.school = school;
      this.uploadCourses(this.school);
    })
  }

  uploadCourses(school: School){
    for(let course of school.courses){
      this.courses.push(course);
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

  if(localStorage.getItem('courseList')){
    //  AQUI SE COLOCAM CUANDO VIENE UN CURSO MPARA EDITAR

  let courseEdit: Course = JSON.parse(localStorage.getItem('courseList'));
  this.name = courseEdit.name
  this.grade = courseEdit.grade;
}else{
  
}

  this.FormEntity = new FormGroup({
      name: new FormControl(this.name, [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(100)
      ]),
      grade: new FormControl(this.grade, [
        Validators.required,
        // Validators.minLength(6),
        // Validators.maxLength(100)
    ]),
  });
}



  registerForm(){
    if(this.FormEntity.valid){
      // Se crea un curso en el local y luego en la base de datos
      this.course = new Course(this.FormEntity.value.name, this.FormEntity.value.grade, this.userLogin.school);

      
      if(localStorage.getItem('courseList')){
        // CODIGO PARA EDITAR EL CURSO

        let courseEdit: Course = JSON.parse(localStorage.getItem('courseList'));
        courseEdit.name = this.course.name;
        courseEdit.grade = this.course.grade;

        for(let i in this.school.courses){
          if(courseEdit.id == this.school.courses[i].id){
            this.school.courses[i] = courseEdit;
            this.school.courses[i].dateUpdate = new Date().toString();
              if(this._schoolService.editarSchool(this.school)){
                this.presentAlert().then( ()=>{
                  this.navCtrl.navigateBack("list-course");
                })
              }else{
                console.log('No se pudo editar el curso');
              };
            break;
          }
        }
      }else{
        // CODIGO PARA CREAR NUEVO EL CURSO

        // Si no existe el arreglo de cursos del colegio, entonces se crea y luego se agrega
        if(this.school.courses == null){
          this.school.courses = [];
          this.school.courses.push(this.course);
        }else{
          this.school.courses.push(this.course);
        }
        // Una vez se cree el curso se actualiza el colegio
        if(this._schoolService.editarSchool(this.school)){
          this.FormEntity.reset();
        }else{
          console.log('No se pudo crear el curso');
        };
      }

    }else{
      this.markAsDirty(this.FormEntity);
    }

  }



  // ----------------------

  async presentAlert() {
    const alert = await this.alertController.create({
      header: ':)',
      subHeader: 'Success',
      message: 'Successfully edited course',
      buttons: ['OK']
    });

    await alert.present();
  }


  // *******************
      ngOnDestroy(): void {
        localStorage.removeItem('courseList');
    }

}
