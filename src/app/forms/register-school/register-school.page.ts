import { Component, OnInit } from '@angular/core';
import { School } from '../../models/school';
import { SchoolService } from 'src/app/services/school.service';

@Component({
  selector: 'app-register-school',
  templateUrl: './register-school.page.html',
  styleUrls: ['./register-school.page.scss'],
})
export class RegisterSchoolPage implements OnInit {
  school: School;
  name: string;
  director: string;
  telephone: string;

  constructor(private _schoolService: SchoolService) { }

  ngOnInit() {
  }

  registerForm(){
    this.school = new School(this.name, this.director, this.telephone);
    this._schoolService.crearSchool(this.school);
    this.name = '';
    this.director = '';
    this.telephone = '';
  }

}
