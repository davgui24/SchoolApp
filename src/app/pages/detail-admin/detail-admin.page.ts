import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-detail-admin',
  templateUrl: './detail-admin.page.html',
  styleUrls: ['./detail-admin.page.scss'],
})
export class DetailAdminPage implements OnInit, OnDestroy {

  userDetail: User;

  constructor() { }

  ngOnInit() {
    this.userDetail = JSON.parse(localStorage.getItem('detailAdmin'));
    console.log(this.userDetail);
  }




  ngOnDestroy(): void {
   localStorage.removeItem('detailAdmin');
  }
}
