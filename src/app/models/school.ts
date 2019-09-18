import { User } from './user';
import { Course } from './course';


export class School {
    id: string;   
    name: string;
    admin: string[];
    director: string;
    email: string;
    telephone: string;
    subcjet: string[];
    teachers: string[];
    courses: string[];
    students: string[];
    fathers: string[];
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
        this.students = [];
        this.fathers = [];
        this.dateCreate=new Date().toString();
        this.id = Date.now().toString();
    }
}

