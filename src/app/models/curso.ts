export class Curso {  

    id: String;   
    name: String;
    grade: String;  
    datecreate: Date;
    datedelete: Date;   
    dateupdate: Date;

    constructor(name:string, grade:string){
        this.name=name;
        this.grade=grade;        
        this.datecreate=new Date();
    }

}
export interface IUser {

    id: String;   
    name: String;
    grade: String;  
    datecreate: Date;
    datedelete: Date;    
    date_update: Date;
}

