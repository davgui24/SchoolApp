import { Group } from './group';
import { User } from './user';
    
    
    export class Activity {
        id: string;
        idSchool: string;    
        name: string;
        description: string;
        type: string;
        user: User;
        group: Group;
        dateFrom: string;
        dateTo: string;
        state: boolean;
        dateCreate: string;
        dateDelete: string;
        dateUpdate: string;
        


        constructor(name: string, description: string, type: ValueType, user: User){
            this.name = name;
            this.description = description;
            this.type = type;
            this.state = true;
            this.user = user;
            this.group = this.group;
            this.dateCreate=new Date().toString();
            this.id = Date.now().toString();
        }
    }

    export interface IActivity {
        id: String;
        name: String;
        description: String;
        user: User;
        type: String;
        datefrom: string;
        dateto: string;
        datecreate: Date;
        state: boolean;
        dateCreate: string;
        dateDelete: string;
        dateUpdate: string;
    }

export enum ValueType  {
    academic = 'Academic',
    extraAcademic = 'ExtraAcademic'
}