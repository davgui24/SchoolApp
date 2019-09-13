import { User } from './activity';


export class Subject {
    id: String;    
    name: String;
    code: string;
    teacher: User;
    dateCreate: Date;
    dateDelete: Date;
    dateUpdate: Date;

        constructor(name: string, code: string, teacher: User){
            this.name = name;
            this.code = code;
            this.teacher = teacher;
            this.dateCreate=new Date();
        }
}

    export interface ISubject {
        id: String;    
        name: String;
        code: string;
        teacher: User;
        dateCreate: Date;
        dateDelete: Date;
        dateUpdate: Date;
    }
