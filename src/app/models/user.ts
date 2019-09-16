import { Group } from './group';
import { School } from './school';



    export class User {
        id: string;
        name: string;
        username: string;
        password: string;
        role: string;
        school: School;
        admin: User;
        group: Group;
        students: User;
        email: string;
        phone: string;
        lastLogin: Date;
        dateCreate: Date;
        dateDelete: Date;
        dateUpdate: Date;

        constructor(name: string, user: string, password: string, role: string,  admin?: User, school?: School, group?: Group, students?: User[]){
            this.role=role;
            this.name=name;
            this.username=user;
            this.password=password;
            this.dateCreate=new Date();
            this.id = Date.now().toString();
         }
    }


    export interface IUser {
        id: string;
        rol: string;
        name: string;
        user: string;
        password: string;
        email: string;
        phone: string;
        lastLogin: Date;
        dateCreate: Date;
        dateDelete: Date;
        dateUpdate: Date;
    }


    export enum ValueRole  {
            global = 'Global',
            admin = 'Admin',
            teacher = 'Teacher',
            student = 'Student',
            fatherFamily = 'Father'
        }