import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { School } from '../models/school';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private afDB: AngularFireDatabase) { }


  getSchools() {
    return new Promise((resolve, reject) => {
      this.afDB.list("/schools/").valueChanges().subscribe(data => {
          if (data) {
            resolve(data);
          } else {
            reject("Error al conetarse a la base de datos");
          }
        });
    });
  }


  getSchool(school: School){
    return new Promise((resolve, reject) => {
    this.afDB.object("/schools/" + school).valueChanges().subscribe(data => {
          if (data) {
            resolve(data);
          } else {
            reject("Este school no se encontró en la base de datos");
          }
        });
    });
  }

  verificarSchool(schoolId: string) {
    return new Promise((resolve, reject) => {
      this.afDB.object("/schools/" + schoolId).valueChanges().subscribe(data => {
          if (data) {
            resolve(data);
          } else {
            reject("no salió");
          }
        });
    });
  }

  crearSchool(school: School) {
    this.afDB.database.ref("/schools/" + school.id).set(school);
    return true;
  }

  editarSchool(school: School) {
    let schoolUpDate = this.afDB.database.ref("/schools/" + school.id).set(school);
    if (schoolUpDate == undefined || schoolUpDate == null) {
      return false;
    } else {
      return true;
    }
  }

}
