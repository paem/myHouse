
export class FileItem {

  $key: string;
  file:File;
  name:string;
  url:string;
  progress:number;
  createdAt: Date = new Date();

  public constructor(file: File) {
    this.file = file;
  }

}
