import { FileItem } from './file-item';
import * as firebase from 'firebase';

export class Item{
    image:FileItem;
    tab:any;
    type:any;
    title: string;
    body: string;
    createdAt:any = firebase.database.ServerValue.TIMESTAMP;
    

}
