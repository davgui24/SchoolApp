import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { ConfigOptionsService } from 'src/app/services/config-options-service';
import { NavController } from '@ionic/angular';




@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.page.html',
  styleUrls: ['./list-user.page.scss'],
})
export class ListUserPage implements OnInit {

  userlogin: User;
  users: User[] = [];

  constructor(private _userService: UserService,
              private _configOptionservice: ConfigOptionsService,
              private navCtrl: NavController,) { }

  ngOnInit() {
    // Traemos el usuario logeado desde el localStorage
    this.userlogin = this._userService.getLocalStorage();

    // Emitimos el rol del usuario logeado para que lo reciba el appComponent (ver linea 41 del appComponent) y cargue el menú
    this._configOptionservice.roleLogin.emit(this.userlogin.role);
    this.loadUsers();
  }

// Cargamos a los usuarios globales
  loadUsers(){
    this._userService.getUsuarios().then((users: User[]) =>{
      this.users = users;
      // console.log('usuarios', this.users);
    })
  }


  edituser(user: User){
    // Creamos un elemento en el localStorage temporalmente para que reciba a el usurio que va a editar
      localStorage.setItem('userList', JSON.stringify(user));

      // Aqui especificamos el rol que deseamos editar para que cargue el formuloario seguj este parametro
      this.navCtrl.navigateBack("register/" + 'Global');
  }

}
