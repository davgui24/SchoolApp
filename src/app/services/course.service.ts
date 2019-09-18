import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private afDB: AngularFireDatabase) { }


  getCourses() {
    return new Promise((resolve, reject) => {
      this.afDB.list("/courses/").valueChanges().subscribe(data => {
          if (data) {
            resolve(data);
          } else {
            reject("Error al conetarse a la base de datos");
          }
        });
    });
  }


  getCourse(course: Course){
    return new Promise((resolve, reject) => {
    this.afDB.object("/courses/" + course).valueChanges().subscribe(data => {
          if (data) {
            resolve(data);
          } else {
            reject("Este course no se encontró en la base de datos");
          }
        });
    });
  }

  verificarCourse(courseId: string) {
    return new Promise((resolve, reject) => {
      this.afDB.object("/courses/" + courseId).valueChanges().subscribe(data => {
          if (data) {
            resolve(data);
          } else {
            reject("no salió");
          }
        });
    });
  }

  crearCourse(course: Course) {
    this.afDB.database.ref("/courses/" + course.id).set(course);
  }

  editarCourse(course: Course) {
    let courseEditado = this.afDB.database.ref("/courses/" + course.id).set(course);
    if (courseEditado == undefined || courseEditado == null) {
      return false;
    } else {
      return true;
    }
  }

  eliminarCourse(course: Course) {
    return this.afDB.database.ref("/courses/" + course.id).remove();
  }

}
