import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AssignAdminToSchoolPage } from './assign-admin-to-school.page';

const routes: Routes = [
  {
    path: '',
    component: AssignAdminToSchoolPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AssignAdminToSchoolPage]
})
export class AssignAdminToSchoolPageModule {}
