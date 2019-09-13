import { Group } from './group';


export class User {
    id: String;
    name: String;
    username: String;
    password: String;
    role: string;
    group: Group;
    email: String;
    phone: String;
    lastLogin: Date;
    dateCreate: Date;
    dateDelete: Date;
    dateUpdate: Date;

    constructor(name: string, user: string, password: string, role: string, group?: Group){
        this.role=role;
        this.name=name;
        this.username=user;
        this.password=password;
        this.dateCreate=new Date();
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
        lastLogin: Date;
        dateCreate: Date;
        dateDelete: Date;
        dateUpdate: Date;
    }


    export enum ValueRole  {
            admin = 'Admin',
            teacher = 'Teacher',
            student = 'Student'
        }