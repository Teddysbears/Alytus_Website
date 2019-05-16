export interface News {
  _id?: string;
  title: string;
  subTitle: [{sub: string, id: number}];
  writer: string;
  date: string;
  map: Boolean;
  coordinates: [{lat: number, lng: number}],
  keywords: [string];
  image: [{name: string, url: string, id: number}];
  smallImage: [{name: string, url: string, id: number}];
  content: [{cont:string, id:number}];
  createdOn: Date;
}
