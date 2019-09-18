import { Group } from './group';
import { School } from './school';



    export class User {
        id: string;
        name: string;
        username: string;
        password: string;
        role: string;
        school: string;
        group: Group;
        students: User;
        email: string;
        phone: string;
        lastLogin: string;
        dateCreate: string;
        dateDelete: string;
        dateUpdate: string;

        constructor(name: string, username: string, password: string, role: string, school?: string, group?: Group, students?: User[]){
            this.role=role;
            this.name=name;
            this.username=username;
            this.password=password;
            this.dateCreate=new Date().toString();
            this.id = Date.now().toString();
         }
    }


    export enum ValueRole  {
            global = 'Global',
            admin = 'Admin',
            teacher = 'Teacher',
            student = 'Student',
            fatherFamily = 'Father'
        }