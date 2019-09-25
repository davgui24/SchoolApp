import { Component, OnInit } from '@angular/core';
import { School } from '../../models/school';
import { SchoolService } from 'src/app/services/school.service';
import { User } from '../../models/user';
import { ConfigOptionsService } from 'src/app/services/config-options-service';
import { UserService } from 'src/app/services/user.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-school',
  templateUrl: './register-school.page.html',
  styleUrls: ['./register-school.page.scss'],
})
export class RegisterSchoolPage implements OnInit {

  public FormEntity: FormGroup;

  user: User;
  school: School;
  name: string;
  director: string;
  telephone: string;

  constructor(private _schoolService: SchoolService,
              private _configOptionservice: ConfigOptionsService,
              private _userService: UserService,
              public loadingController: LoadingController,
              public alertController: AlertController) { }

  ngOnInit() {
    this.user = this._userService.getLocalStorage();
    this._configOptionservice.roleLogin.emit(this.user);
    this.initForm();
  }

  // ************************

  private initForm() {
    this.FormEntity = new FormGroup({
        name: new FormControl('', [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(100)
        ]),
        director: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(100)
      ]),

        telephone: new FormControl('', [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(7)
      ]),
    });
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

  registerForm(){
    console.log(this.FormEntity.value);
    if(this.FormEntity.valid){
      this.school = new School(this.FormEntity.value.name, this.FormEntity.value.director, this.FormEntity.value.telephone);
      this._schoolService.crearSchool(this.school);
      this.FormEntity.reset();
    }else{
      this.markAsDirty(this.FormEntity);
    }
  }


  // --------------------

  async presentAlertError() {
    const alert = await this.alertController.create({
      header: 'Error!!',
      subHeader: 'Check',
      message: 'Verify the fields',
      buttons: ['OK']
    });

    await alert.present();
  }


    // **********************+

    async presentLoading() {

      const loading = await this.loadingController.create({
        message: 'Hellooo',
        duration: 2000
      });
      await loading.present();
  
      const { role, data } = await loading.onDidDismiss();
  
       console.log('Loading dismissed!');
    }
  
  
    async presentLoadingWithOptions() {
      const loading = await this.loadingController.create({
        spinner: null,
        duration: 5000,
        message: 'Please wait...',
        translucent: true,
        cssClass: 'custom-class custom-loading'
      });
      return await loading.present();
    }

}
