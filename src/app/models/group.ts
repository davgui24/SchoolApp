import { User } from './user';
import { Subject } from './subject';


export class Group {
    id: string;    
    name: string;
    directorGroup: User;
    subject: Subject[];
    students: User[];
    dateCreate: string;
    dateDelete: string;
    dateUpdate: string;

        constructor(name: string, directorGroup: User, subject: Subject[]){
            this.name = name;
            this.directorGroup = directorGroup;
            this.subject = [];
            this.students = [];
            this.dateCreate=new Date().toString();
            this.id = Date.now().toString();
        }
}

    export interface IGroup {
        id: String;    
        name: String;
        directorGroup: User;
        subject;
        dateCreate: string;
        dateDelete: string;
        dateUpdate: string;
    }
