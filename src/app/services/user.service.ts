import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

// import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afDB: AngularFireDatabase) {
    console.log("Hello ServicesUsuarioServiceProvider Provider");
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

  verificarUsuario(user: string) {
    return new Promise((resolve, reject) => {
      this.afDB.object("/usuarios/" + user).valueChanges().subscribe(data => {
          if (data) {
            resolve(data);
          } else {
            reject("no salió");
          }
        });
    });
  }

  crearUsuario(usuario: User) {
    this.afDB.database.ref("/usuarios/" + usuario.username).set(usuario);
  }

  editarUsuario(usuario: User) {
    let usuarioEditado = this.afDB.database.ref("/usuarios/" + usuario.username).set(usuario);
    if (usuarioEditado == undefined || usuarioEditado == null) {
      return false;
    } else {
      return true;
    }
  }

  eliminarUsuario(usuario: User) {
    return this.afDB.database.ref("/usuarios/" + usuario.username).remove();
  }



  setLocalStorage(role: string){
    localStorage.setItem('role', role);
  }

  getLocalStorage(){
    localStorage.getItem('role');
  }
}
