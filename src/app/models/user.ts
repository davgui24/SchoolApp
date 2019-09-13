import { Group } from './group';


export class User {
    id: String;
    role: String;
    name: String;
    user: String;
    group: Group;
    password: String;
    email: String;
    phone: String;
    lastLogin: Date;
    dateCreate: Date;
    dateDelete: Date;
    dateUpdate: Date;

    constructor(role: ValueRole, name: string, user: string, password: string, group?: Group){
        this.role=role;
        this.name=name;
        this.user=user;
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