import { User } from './user';

export class Subject {
    id: string;
    school: string;    
    name: string;
    code: string;
    teacher: string;
    state: boolean;
    dateCreate: string;
    dateDelete: string;
    dateUpdate: string;

     constructor(name: string, code: string, school: string){
            this.name = name;
            this.code = code;
            this.school = school;
            this.state = false;
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
