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

  userLogin: User;
  school: School;
  schoolCurrent: School;
  name: string;
  director: string;
  telephone: string;
  expRegTel: '/^[9|6|7][0-16]{8}$/';

  constructor(private _schoolService: SchoolService,
              private _configOptionservice: ConfigOptionsService,
              private _userService: UserService,
              public loadingController: LoadingController,
              public alertController: AlertController) { }

  ngOnInit() {
    this.userLogin = this._userService.getLocalStorage();
    this._configOptionservice.roleLogin.emit(this.userLogin.role);

    if(localStorage.getItem('schoolList')){
      this.schoolCurrent = JSON.parse(localStorage.getItem('schoolList'));
    }else{
      this.schoolCurrent = new School('', '', '');
    }
    console.log(this.schoolCurrent);

    this.initForm();
  }

  // ************************

  private initForm() {
    this.FormEntity = new FormGroup({
        name: new FormControl(this.schoolCurrent.name, [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(100)
        ]),
        director: new FormControl(this.schoolCurrent.director, [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(100)
      ]),

        telephone: new FormControl(this.schoolCurrent.telephone, [
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
    if(this.FormEntity.valid){
      this.school = new School(this.FormEntity.value.name, this.FormEntity.value.director, this.FormEntity.value.telephone);

      if(localStorage.getItem('schoolList')){
            // CODIGO PARA ACTUALIZAE EL COLEGIO
            let schoolCurrent: School = JSON.parse(localStorage.getItem('schoolList'));
            schoolCurrent.name = this.school.name;
            schoolCurrent.director = this.school.director;
            schoolCurrent.telephone = this.school.telephone;
            schoolCurrent.dateUpdate = new Date().toString();
    
             if(this._schoolService.editarSchool(schoolCurrent)){
              this.presentAlert('👍', 'Success', 'The school was successfully published').then(data => {
                console.log(data);
                this.FormEntity.reset();
              })
            }else{
              this.presentAlert('👎', 'Error', 'Error editing school');
            }
      }else{
        // CODIGO PARA CREAR EL COLEGIO
        if(this._schoolService.crearSchool(this.school)){
          this.presentAlert('👍', 'Success', 'The school was successfully created').then(() => {
            this.FormEntity.reset();
          })
        }else{
          this.presentAlert('👎', 'Error', 'Error creating school');
        }
      }
    }else{
      this.markAsDirty(this.FormEntity);
    }
  }


  // --------------------

  async presentAlert(header: string, subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
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

     // *******************
     ngOnDestroy(): void {
      localStorage.removeItem('schoolList');
  }

}
