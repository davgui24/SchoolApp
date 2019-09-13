import { User } from './activity';

export class Curso {  
    id: String;   
    name: String;
    admin: User;
    director: string;
    email: string;
    phone: String;
    datecreate: Date;
    datedelete: Date;   
    dateupdate: Date;

    constructor(name: string, admin: User, director: string, phone: String){
        this.name = name;
        this.admin = admin;   
        this.director = director;
        this.phone = phone;
        this.datecreate = new Date();
    }

}



    export interface ISchool {
        id: String;   
        name: String;
        grade: String;  
        datecreate: Date;
        datedelete: Date;    
        date_update: Date;
    }

