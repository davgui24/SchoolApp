import { Component, OnInit } from '@angular/core';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { ModalController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register-activity',
  templateUrl: './register-activity.page.html',
  styleUrls: ['./register-activity.page.scss'],
})
export class RegisterActivityPage implements OnInit {

  activeCreatePost: boolean;

  titulo: string = '';
  imagenPreview: string;
  imagen64: string;


  constructor(private imagePicker: ImagePicker,
              public uploadFileService: UploadFileService,
              private modalController: ModalController,
              public loadingController: LoadingController) { }

  ngOnInit() {
    this.activeCreatePost = false;
  }


  cerrar_modal(){
    this.modalController.dismiss();
  }


  // -------

  async uploadImage(){

    const loading = await this.loadingController.create({
      message: 'Wait a few seconds',
    });
    loading.present();


    let opciones: ImagePickerOptions = {
      quality: 100,
      outputType: 1,
      maximumImagesCount: 10
   }
 
     this.imagePicker.getPictures(opciones).then((results) => {
       for (var i = 0; i < results.length; i++) {
           // If it's base64 (DATA_URL):
        this.imagenPreview = 'data:image/jpeg;base64,' + results[i];
        this.imagen64 = results[i];
       }

       loading.dismiss();
       this.activeCreatePost = true;

     }).catch(error =>{
      console.log('ERROR EN SELECTOR', JSON.stringify(error));
     })
  }

  // ---------

   crear_post(){


    // const loading = await this.loadingController.create({
    //   message: 'Wait a few seconds',
    // });
    // loading.present();


    let archivo = {
       img: this.imagen64,
       titulo: this.titulo
    }
    this.uploadFileService.cargar_imagen_firebase(archivo).then(()=>this.cerrar_modal());
    // loading.dismiss();
  }

}
