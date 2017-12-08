import * as firebase from 'firebase';

export class Item{
    title: string;
    body: string;
    subTitle:string;
    subBody: string;
    createdAt:any = firebase.database.ServerValue.TIMESTAMP;
    
}