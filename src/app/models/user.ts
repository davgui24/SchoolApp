export class User {
    // let valueRole = {
    //     value: ['Admin','Student','Teacher'],
    //     message:'Option invalid'

    // }

    id: String;
    role: String;
    name: String;
    user: String;
    password: String;
    email: String;
    phone: String;
    datecreate: Date;
    datedelete: Date;
    lastlogin: Date;
    dateupdate: Date;

    constructor(role:ValueRole, name:string, user:string, password:string){
        this.role=role;
        this.name=name;
        this.user=user;
        this.password=password;
        this.datecreate=new Date();
    }
}

    export interface IUser {

        id: String;
        rol: String;
        name: String;
        user: String;
        password: String;
        email: String;
        phone: String;
        date_creation: Date;
        date_delete: Date;
        last_login: Date;
        date_update: Date;
    }

    export enum ValueRole  {
            value1 = 'Admin',
            value2 = 'Teacher',
            value3 = 'Student'
        }