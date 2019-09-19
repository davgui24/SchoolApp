import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course';
import { School } from 'src/app/models/school';
import { CourseService } from '../../services/course.service';
import { UserService } from 'src/app/services/user.service';
import { SchoolService } from 'src/app/services/school.service';

@Component({
  selector: 'app-register-course',
  templateUrl: './register-course.page.html',
  styleUrls: ['./register-course.page.scss'],
})
export class RegisterCoursePage implements OnInit {

  idSchool: string;
  name:string;
  grade: string;

  course: Course;
  school: School;

  constructor(private _userService: UserService,
              private _schoolService: SchoolService,
              private _courseService: CourseService) { }

  ngOnInit() {
    this.idSchool = this._userService.getLocalStorage().school;
    this.uploadSchool();
    
  }


  uploadSchool(){
    this._schoolService.getSchools().then((schools: School[]) =>{
      for(let i = 0; i<schools.length; i++){
        if(schools[i].id == this.idSchool){
          this.school = schools[i];
          break;
        }else{
          console.log('no entro');
        }
      }
    })
  }


  registerForm(){
    // Se crea un curso en el local y luego en la base de datos
    this.course = new Course(this.name, this.grade, this.idSchool);
    this._courseService.crearCourse(this.course);

    // Si no existe el arreglo de cursos del colegio, entonces se crea y luego se agrega
    if(this.school.courses == null){
      this.school.courses = [];
      this.school.courses.push(this.course);
      this.name = '';
      this.grade = '';
    }else{
      this.school.courses.push(this.course);
      this.name = '';
      this.grade = '';
    }
    // Una vez se cree el curso se actualiza el colegio
    this._schoolService.editarSchool(this.school);

  }

}
