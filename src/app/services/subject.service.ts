import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Subject } from '../models/subject';


@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private afDB: AngularFireDatabase) {

  }


  getSubjects() {
    return new Promise((resolve, reject) => {
      this.afDB.list("/subjects/").valueChanges().subscribe(data => {
          if (data) {
            resolve(data);
          } else {
            reject("Error al conetarse a la base de datos");
          }
        });
    });
  }


  getSubject(subject: Subject){
    return new Promise((resolve, reject) => {
    this.afDB.object("/subjects/" + subject).valueChanges().subscribe(data => {
          if (data) {
            resolve(data);
          } else {
            reject("Este subject no se encontró en la base de datos");
          }
        });
    });
  }

  verificarSubject(subjectId: string) {
    return new Promise((resolve, reject) => {
      this.afDB.object("/subjects/" + subjectId).valueChanges().subscribe(data => {
          if (data) {
            resolve(data);
          } else {
            reject("no salió");
          }
        });
    });
  }

  crearSubject(subject: Subject) {
    this.afDB.database.ref("/subjects/" + subject.id).set(subject);
  }

  editarUsuario(subject: Subject) {
    let subjectEditado = this.afDB.database.ref("/subjects/" + subject.id).set(subject);
    if (subjectEditado == undefined || subjectEditado == null) {
      return false;
    } else {
      return true;
    }
  }
}
