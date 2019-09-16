import { User } from './user';


export class School {
    id: string;   
    name: string;
    admin: User;
    director: string;
    email: string;
    phone: string;
    dateCreate: Date;
    dateDelete: Date;
    dateUpdate: Date;

    constructor(name: string, admin: User, director: string, phone: string){
        this.name = name;
        this.admin = admin;   
        this.director = director;
        this.phone = phone;
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

