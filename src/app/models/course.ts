

export class Course {  
    id: String;   
    name: String;
    grade: ValueCourse;  
    dateCreate: Date;
    dateDelete: Date;
    dateUpdate: Date;

    constructor(name: string, grade: ValueCourse){
        this.name = name;
        this.grade = grade;        
        this.dateCreate = new Date();
    }

}


export interface Icourse {

    id: String;   
    name: String;
    grade: String;  
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
