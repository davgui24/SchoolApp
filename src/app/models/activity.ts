export class User {


    id: String;    
    name: String;
    description:String;
    type:String;
    datefrom: Date;
    dateto: Date;
    datecreate: Date;
    state:boolean;
    dateupdate: Date;
    datedelete: Date;
    user:User;

    constructor(name:string, description:String, type:ValueType, user:User){
        this.name=name;
        this.description=description;
        this.type=type;
        this.state=true;
        this.user=user;
        this.datecreate=new Date();
        
    }

}

export interface IActivity {
    id: String;
    name: String;
    description: String;
    type: String;
    datefrom: Date;
    dateto: Date;
    datecreate: Date;
    state: boolean;
    dateupdate: Date;
    datedelete: Date;
    user: User;
}

export enum ValueType  {
    value1 = 'Academic',
    value2 = 'ExtraAcademic',
    
}