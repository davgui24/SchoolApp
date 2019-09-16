import { User } from './user';
import { Subject } from './subject';


export class Group {
    id: string;    
    name: string;
    directorGroup: User;
    subject: Subject[];
    students: User[];
    dateCreate: Date;
    dateDelete: Date;
    dateUpdate: Date;

        constructor(name: string, directorGroup: User, subject: Subject[]){
            this.name = name;
            this.directorGroup = directorGroup;
            this.subject = [];
            this.students = [];
            this.dateCreate=new Date();
            this.id = Date.now().toString();
        }
}

    export interface IGroup {
        id: String;    
        name: String;
        directorGroup: User;
        subject;
        dateCreate: Date;
        dateDelete: Date;
        dateUpdate: Date;
    }
