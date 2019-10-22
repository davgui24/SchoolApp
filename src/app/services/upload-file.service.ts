import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { ToastController, LoadingController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { UserService } from './user.service';
import { SchoolService } from './school.service';


@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  userLogin: User;

  imagenes: ArchivoSubir[] = [];
  lastKey: string = null;

  constructor(public toastCtrl: ToastController,
              public afDB: AngularFireDatabase,
              private _userService: UserService,
              private _schoolService: SchoolService,
              public loadingController: LoadingController) {
    // this.cargarUltimoKey().subscribe(() => this.cargarImagenes());
              this.userLogin = this._userService.getLocalStorage();
              console.log(this.userLogin);
             }


  // private cargarUltimoKey(){
  //   // Se obtiene el ultimo elemento de la base de la base de datos
  //  return this.afDB.list('/post', ref => ref.orderByKey().limitToLast(1))
  //   .valueChanges().map((post: any) => {
  //     this.lastKey = post[0].key;
  //     this.imagenes.push(post[0]);
  //   })
  // }

  // Funcion de cargar de 4 en 4 las imagenes
  cargarImagenes(){
     return new Promise((resolve, reject) => {
       this.afDB.list('/post',
       ref => ref.limitToLast(3)
       .orderByKey()
       .endAt(this.lastKey)
       ).valueChanges().subscribe((posts:any) => {

         posts.pop();
         
         if(posts.length == 0){
          console.log('Ya no hay mas registros');
          resolve(false);
         }

         this.lastKey = posts[0].key;

         for(let i = posts.length-1; i>=0; i--){
           let post = posts[i];
           this.imagenes.push(post);
         }
         console.log('Siguen habendo registros');
         resolve(true);

       });
     });

  }



  cargar_imagen_firebase(archivo: ArchivoSubir){

    let promesa = new Promise(async (resolve, reject) => {
      // this.mostrarToast('Cargando...');
      const loading = await this.loadingController.create({
        message: 'Cargando...',
      });
      loading.present();

      // hacemos referencia al storage de datos en firbase
      let storeRef = firebase.storage().ref();

      // Colocamos un nombre al archivo (el nombre será la fecha en hora, minuto y segundo en numeros)
      let nombreArchivo: string = new Date().valueOf().toString();

      let url: string;

      // crear una tarea de firebase que se encargue de subir el archivo y notificar cuando termine
      let uploadTask: firebase.storage.UploadTask = 
      storeRef.child(`schools/${this.userLogin.role}/${this.userLogin.id}/${nombreArchivo}`)
      .putString(archivo.img, 'base64', {contentType: 'image/jpeg'});

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        ()=>{},  // saber cuantos Mbs se han subido
        (error)=>{
          //Manejo de error
          console.log('Error en la carga');
          console.log(JSON.stringify(error));
          this.mostrarToast(JSON.stringify(error));
          reject();
        },
        ()=>{
          // TODO bien
          console.log('Archivo subido');
          loading.dismiss();
          this.mostrarToast('Imagen cargada correctamente');
         
          // Aquí se carga la url de la imagen en la variable url
         uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
         url = downloadURL;
         this.crear_post(archivo.titulo, url, nombreArchivo);
         resolve();
         });

 
        }
      )
    });

    return promesa;
  }

  private crear_post(titulo: string, url: string, nombreArchivo: string){
    let post: ArchivoSubir = {
      img: url,
      titulo: titulo,
      key: nombreArchivo
    };

    console.log(JSON.stringify(post));

    // this.afDB.list('/post').push(post);
    console.log('Aqui entra');

    // Con esta manra le puedo pasar el nomnre del archivo de manera personalizada
    this.afDB.object(`/schools/${this.userLogin.school}/activity/${this.userLogin.role}/${this.userLogin.id}/${ nombreArchivo }`).update(post); 
    console.log('Aqui no entra');

    this.imagenes.push(post);
  }
  


  async  mostrarToast(mensaje: string){
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000
    })
    toast.present();
  }
}





interface ArchivoSubir{
  titulo: string,
  img: string,
  key?: string
}
