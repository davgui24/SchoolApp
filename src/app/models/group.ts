import { User } from './user';
import { Subject } from './subject';


export class Group {
    id: String;    
    name: String;
    directorGroup: User;
    subject: Subject
    students: User[];
    dateCreate: Date;
    dateDelete: Date;
    dateUpdate: Date;

        constructor(name: string, directorGroup: User, subject, students: User[]){
            this.name = name;
            this.directorGroup = directorGroup;
            this.subject = subject;
            this.students = [];
            this.dateCreate=new Date();
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
