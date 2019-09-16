import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  user: User;

  constructor(private activatedRoute: ActivatedRoute,
    private _userService: UserService,) {  }

  ngOnInit() {
    this.getUser();
    this.user = this._userService.getLocalStorage()
  }


  getUser(){
    let idUser = this.activatedRoute.snapshot.paramMap.get('idUser');
    this._userService.getUsuarios().then((users: User[]) =>{
      for(let i = 0; i < users.length; i++){
        if(idUser == users[i].id){
          this._userService.setLocalStorage(users[i]);
        }
      }
    })
  }

}
