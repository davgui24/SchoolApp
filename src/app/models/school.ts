import { User } from './user';
import { Course } from './course';


export class School {
    id: string;   
    name: string;
    admin: User;
    director: string;
    email: string;
    phone: string;
    teachers: User[];
    courses: Course[];
    students: User[];
    fathers: User[];
    dateCreate: Date;
    dateDelete: Date;
    dateUpdate: Date;

    constructor(name: string, admin: User, director: string, phone: string){
        this.name = name;
        this.admin = admin;   
        this.director = director;
        this.phone = phone;
        this.teachers = [];
        this.courses = [];
        this.students = [];
        this.fathers = [];
        this.dateCreate = new Date();
        this.id = Date.now().toString();
    }
}



    export interface ISchool {
        id: string;   
        name: string;
        admin: User;
        director: string;
        email: string;
        phone: string;
        dateCreate: Date;
        dateDelete: Date;   
        dateUpdate: Date;
    }

