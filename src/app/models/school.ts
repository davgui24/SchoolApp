import { User } from './user';


export class School {  
    id: String;   
    name: String;
    admin: User;
    director: string;
    email: string;
    phone: String;
    dateCreate: Date;
    dateDelete: Date;   
    dateUpdate: Date;

    constructor(name: string, admin: User, director: string, phone: String){
        this.name = name;
        this.admin = admin;   
        this.director = director;
        this.phone = phone;
        this.dateCreate = new Date();
    }

}



    export interface ISchool {
        id: String;   
        name: String;
        admin: User;
        director: string;
        email: string;
        phone: String;
        dateCreate: Date;
        dateDelete: Date;   
        dateUpdate: Date;
    }

