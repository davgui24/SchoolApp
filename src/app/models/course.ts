import { Group } from './group';


export class Course {  
    id: string;   
    name: string;
    grade: ValueCourse;
    groups: Group[];
    dateCreate: Date;
    dateDelete: Date;
    dateUpdate: Date;

    constructor(name: string, grade: ValueCourse){
        this.name = name;
        this.grade = grade;        
        this.dateCreate = new Date();
        this.groups = [];
        this.id = Date.now().toString();
    }

}


export interface Icourse {

    id: string;   
    name: string;
    grade: string;  
    dateCreate: Date;
    dateUpdate: Date;
    dateDelete: Date;
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
