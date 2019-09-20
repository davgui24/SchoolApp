import { Group } from './group';
import { User } from './user';
    
    
    export class Activity {
        id: string;   
        name: string;
        description: string;
        type: string;
        user: string;
        group: string;
        school: string;
        dateFrom: string;
        dateTo: string;
        state: boolean;
        dateCreate: string;
        dateDelete: string;
        dateUpdate: string;
        


        constructor(name: string, description: string, type: string, school: string, user: string, group: string){
            this.name = name;
            this.description = description;
            this.school = school;
            this.type = type;
            this.state = true;
            this.user = user;
            this.group = group;
            this.dateCreate=new Date().toString();
            this.id = Date.now().toString();
        }
    }


export enum ValueType  {
    academic = 'Academic',
    extraAcademic = 'ExtraAcademic'
}