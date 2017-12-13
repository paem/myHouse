import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GoogleSearchService {
apiKey = "AIzaSyA_ME-gZt5FAGciLVYr6IJciUP980AsXXY";
base_url = "https://www.googleapis.com/customsearch/v1";
cx = "009919926379902841576:myydqnu_qyk";
cr = "countrySE";
gl = "se";
hl = "sv";
safe = "high";
lr = "lang_sv";

test = "https://www.googleapis.com/customsearch/v1?q=k%C3%B6p%20hus&key=AIzaSyA_ME-gZt5FAGciLVYr6IJciUP980AsXXY&cx=009919926379902841576:myydqnu_qyk";

constructor(public http:Http) { }

googleSearch(query){
  return this.http.get(this.base_url+'?q='+query+'&lr='+this.lr+'&safe='+this.safe+'&cx='+this.cx+'&gl='+this.gl+'&cr='+this.cr+'&hl='+this.hl+'&key='+this.apiKey)
  .map((res:Response) => res.json())
  .map(json => json.items);
}
}

