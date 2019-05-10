export interface News {
  _id?: string;
  title: string;
  subTitle: [{sub: string, id: number}];
  writer: string;
  date: string;
  map: Boolean;
  keywords: [string];
  image: [{name: string, url: string, id: number}];
  smallImage: [{name: string, url: string, id: number}];
  content: [{cont:string, id:number}];
}
