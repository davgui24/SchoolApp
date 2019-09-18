import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

// import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afDB: AngularFireDatabase) {

  }


  getUsuarios() {
    return new Promise((resolve, reject) => {
      this.afDB.list("/usuarios/").valueChanges().subscribe(data => {
          if (data) {
            resolve(data);
          } else {
            reject("Error al conetarse a la base de datos");
          }
        });
    });
  }

  getUsuario(user: User){
    return new Promise((resolve, reject) => {
    this.afDB.object("/usuarios/" + user).valueChanges().subscribe(data => {
          if (data) {
            resolve(data);
          } else {
            reject("Este usario no se encontró en la base de datos");
          }
        });
    });
  }

  verificarUsuario(userId: string) {
    return new Promise((resolve, reject) => {
      this.afDB.object("/usuarios/" + userId).valueChanges().subscribe(data => {
          if (data) {
            resolve(data);
          } else {
            reject("no salió");
          }
        });
    });
  }

  crearUsuario(usuario: User) {
    this.afDB.database.ref("/usuarios/" + usuario.id).set(usuario);
  }

  editarUsuario(usuario: User) {
    let usuarioEditado = this.afDB.database.ref("/usuarios/" + usuario.id).set(usuario);
    if (usuarioEditado == undefined || usuarioEditado == null) {
      return false;
    } else {
      return true;
    }
  }

  eliminarUsuario(usuario: User) {
    return this.afDB.database.ref("/usuarios/" + usuario.id).remove();
  }

  // ==================================================

// Buscar usuarios desde usn ror en especifico
  getAdminsByRole(role: string){
    let admins: User[] = [];
    if(role=='Global'){
      this.getUsuarios().then((users: User[]) =>{
         users.forEach(user => {
           if(user.role=='Admin'){
             admins.push(user);
           }
         });
      })
    }else{
      admins = [];
    }
    return admins;
  }


  getTeachersByAdmin(admin: any){
    let teachers: User[] = [];
    if(admin.role=='Admin'){
      this.getUsuarios().then((users: User[]) =>{
         users.forEach(user => {
           if(user.role=='Teacher' && user.school==admin.school){
            teachers.push(user);
           }
         });
      })
    }else{
      teachers = [];
    }
    return teachers;
  }



  setLocalStorage(user: User){
    localStorage.setItem('id', user.id);
    localStorage.setItem('name', user.name);
    localStorage.setItem('username', user.username);
    localStorage.setItem('role', user.role);
    localStorage.setItem('school', user.school);
    localStorage.setItem('group', JSON.stringify(user.group));
    localStorage.setItem('students', JSON.stringify(user.students));
  }

  
  getLocalStorage(){
    let user: any;

    if(localStorage.getItem('name')){
      user = {
        id: localStorage.getItem('id'),
        name: localStorage.getItem('name'),
        username: localStorage.getItem('username'),
        role: localStorage.getItem('role'),
        school: localStorage.getItem('school'),
        group: localStorage.getItem('group'),
        students: localStorage.getItem('students')
      };
    }else{
      user = null;
    }

    return user;
  }
}
