import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-detail-teacher',
  templateUrl: './detail-teacher.page.html',
  styleUrls: ['./detail-teacher.page.scss'],
})
export class DetailTeacherPage implements OnInit {

  userTeacher:User;

  constructor() { }

  ngOnInit() {

    this.userTeacher = JSON.parse(localStorage.getItem('detailTeacher'))
    console.log(this.userTeacher);
  }

  ngOnDestroy(): void {
    
    localStorage.removeItem('detailTeacher');
    
  }

}
