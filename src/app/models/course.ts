import { Group } from './group';


export class Course {  
    id: string;   
    school: string; 
    name: string;
    grade: string;
    groups: string[];
    dateCreate: string;
    dateDelete: string;
    dateUpdate: string;

    constructor(name: string, grade: string){
        this.name = name;
        this.grade = grade;       
        this.dateCreate=new Date().toString();
        this.groups = [];
        this.id = Date.now().toString();
    }

}


export enum ValueCourse {
    first ='first',
    second = 'second',
    third = 'third',
    fourth = 'fourth',
    fifth = 'fifth',
    sixth = 'sixth',
    seventh = 'seventh',
    eighth = 'eighth',
    nineth = 'nineth',
    tenth = 'tenth',
    eleventh = 'eleventh',
}
