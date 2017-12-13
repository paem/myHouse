import * as firebase from 'firebase';

export class Item{
    image:any;
    tab:any;
    type:any;
    title: string;
    body: string;
    subTitle:string;
    subBody: string;
    createdAt:any = firebase.database.ServerValue.TIMESTAMP;

}
