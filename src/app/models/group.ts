import { User } from './user';
import { Subject } from './subject';
import { School } from './school';


export class Group {
    id: string;    
    name: string;
    school: string;
    course: string;
    directorGroup: string;
    subjects: Subject[];
    students: string[];
    dateCreate: string;
    dateDelete: string;
    dateUpdate: string;

        constructor(name: string, directorGroup: string, school: string, course: string, subjects: Subject[]){
            this.name = name;
            this.directorGroup = directorGroup;
            this.school = school;
            this.subjects = subjects;
            this.course = course;
            this.students = [];
            this.dateCreate=new Date().toString();
            this.id = Date.now().toString();
        }
}
