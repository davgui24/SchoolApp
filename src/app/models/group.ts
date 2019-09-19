import { User } from './user';
import { Subject } from './subject';


export class Group {
    id: string;    
    name: string;
    school: string;
    directorGroup: string;
    subject: string[];
    students: string[];
    dateCreate: string;
    dateDelete: string;
    dateUpdate: string;

        constructor(name: string, directorGroup: string, subject: string[]){
            this.name = name;
            this.directorGroup = directorGroup;
            this.subject = [];
            this.students = [];
            this.dateCreate=new Date().toString();
            this.id = Date.now().toString();
        }
}
