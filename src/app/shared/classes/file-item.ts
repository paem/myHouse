import * as firebase from 'firebase';

export class FileItem {

  $key: string;
  file:File;
  name:string;
  url:string;
  progress:number;
  createdAt:any = firebase.database.ServerValue.TIMESTAMP;
  
  public constructor(file: File) {
    this.file = file;
  }

}
