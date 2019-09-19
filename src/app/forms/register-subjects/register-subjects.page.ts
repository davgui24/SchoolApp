import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { SubjectService } from 'src/app/services/subject.service';
import { Subject } from '../../models/subject';
import { School } from 'src/app/models/school';
import { SchoolService } from '../../services/school.service';

@Component({
  selector: 'app-register-subjects',
  templateUrl: './register-subjects.page.html',
  styleUrls: ['./register-subjects.page.scss'],
})
export class RegisterSubjectsPage implements OnInit {

  idSchool: string;
  name: string;
  code: string;

  subcjet: Subject;
  schools: School[] = [];
  school: School;

  constructor(private _userService: UserService,
              private _subjectService: SubjectService,
              private _schoolService: SchoolService) { }

  ngOnInit() {
    this.idSchool = this._userService.getLocalStorage().school;
    this.uploadSchool();
  }


  uploadSchool(){
    this._schoolService.getSchools().then((schools: School[]) =>{
      for(let i = 0; i<schools.length; i++){
        if(schools[i].id == this.idSchool){
          this.school = schools[i];
          break;
        }else{
          console.log('no entro');
        }
      }
    })
  }
  

  registerForm(){
    // Se crea una asignatura en el local y luego en la base de datos
    this.subcjet = new Subject(this.name, this.code, this.idSchool);
    this._subjectService.crearSubject(this.subcjet);

    // Si no existe el areglo de asignaturas del colegio, entonces se crea y luego se agrega
    if(this.school.subcjet == null){
      this.school.subcjet = [];
      this.school.subcjet.push(this.subcjet);
      this.name = '';
      this.code = '';
    }else{
      this.school.subcjet.push(this.subcjet);
      this.name = '';
      this.code = '';
    }
    // Una ves se cree la asignatura, se actualiza el colegio
    this._schoolService.editarSchool(this.school);

  }
}
