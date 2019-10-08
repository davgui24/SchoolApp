import { User } from './user';
import { Course } from './course';

export class Subject {
    id: string;
    school: string;    
    name: string;
    code: string;
    course: Course;
    teacher: string;
    state: boolean;
    stateGroup: boolean;
    dateCreate: string;
    dateDelete: string;
    dateUpdate: string;

     constructor(name: string, code: string, school: string, course: Course){
            this.name = name;
            this.code = code;
            this.school = school;
            this.state = false;
            this.stateGroup = false;
            this.course = course;
            this.teacher = '';
            this.dateCreate=new Date().toString();
            this.id = Date.now().toString();
         }
     }

    export interface ISubject {
        id: string;    
        name: string;
        code: string;
        teacher: User;
        dateCreate: string;
        dateDelete: string;
        dateUpdate: string;
    }
