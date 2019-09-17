import { User } from './user';



export class Subject {
    id: string;    
    name: string;
    code: string;
    teacher: User;
    dateCreate: string;
    dateDelete: string;
    dateUpdate: string;

        constructor(name: string, code: string, teacher: User){
            this.name = name;
            this.code = code;
            this.teacher = teacher;
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
