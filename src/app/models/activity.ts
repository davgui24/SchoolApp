import { Group } from './group';
    
    
    export class User {
        id: String;    
        name: String;
        description: String;
        type: String;
        user: User;
        datefrom: Date;
        dateto: Date;
        state: boolean;
        dateCreate: Date;
        dateDelete: Date;
        dateUpdate: Date;
        group: Group;


        constructor(name: string, description: String, type: ValueType, user: User){
            this.name = name;
            this.description = description;
            this.type = type;
            this.state = true;
            this.user = user;
            this.group = this.group;
            this.dateCreate = new Date();
        }
    }

    export interface IActivity {
        id: String;
        name: String;
        description: String;
        user: User;
        type: String;
        datefrom: Date;
        dateto: Date;
        datecreate: Date;
        state: boolean;
        dateCreate: Date;
        dateUpdate: Date;
        dateDelete: Date;
    }

export enum ValueType  {
    academic = 'Academic',
    extraAcademic = 'ExtraAcademic'
}