import { User } from './user';
import { Course } from './course';


export class School {
    id: string;   
    name: string;
    admin: User;
    director: string;
    email: string;
    telephone: string;
    teachers: User[];
    courses: Course[];
    students: User[];
    fathers: User[];
    dateCreate: string;
    dateDelete: string;
    dateUpdate: string;

    constructor(name: string, director: string, telephone: string){
        this.name = name;  
        this.director = director;
        this.telephone = telephone;
        this.teachers = [];
        this.courses = [];
        this.students = [];
        this.fathers = [];
        this.dateCreate=new Date().toString();
        this.id = Date.now().toString();
    }
}



    export interface ISchool {
        id: string;   
        name: string;
        admin: User;
        director: string;
        email: string;
        telephone: string;
        dateCreate: string;
        dateDelete: string;
        dateUpdate: string;
    }

