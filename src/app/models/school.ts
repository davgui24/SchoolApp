import { User } from './user';
import { Course } from './course';
import { Subject } from './subject';
import { Group } from './group';


export class School {
    id: string;   
    name: string;
    admin: User[];
    director: string;
    email: string;
    telephone: string;
    subcjet: Subject[];
    teachers: User[];
    courses: Course[];
    groups: Group[];
    students: User[];
    fathers: User[];
    dateCreate: string;
    dateDelete: string;
    dateUpdate: string;

    constructor(name: string, director: string, telephone: string){
        this.name = name;  
        this.director = director;
        this.telephone = telephone;
        this.subcjet = [];
        this.teachers = [];
        this.courses = [];
        this.groups = [];
        this.students = [];
        this.fathers = [];
        this.dateCreate=new Date().toString();
        this.id = Date.now().toString();
    }
}

