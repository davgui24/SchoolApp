import { Group } from './group';
import { User } from './user';
    
    
    export class Activity {
        id: string;    
        name: string;
        description: string;
        type: string;
        user: User;
        group: Group;
        dateFrom: Date;
        dateTo: Date;
        state: boolean;
        dateCreate: Date;
        dateDelete: Date;
        dateUpdate: Date;
        


        constructor(name: string, description: string, type: ValueType, user: User){
            this.name = name;
            this.description = description;
            this.type = type;
            this.state = true;
            this.user = user;
            this.group = this.group;
            this.dateCreate = new Date();
            this.id = Date.now().toString();
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