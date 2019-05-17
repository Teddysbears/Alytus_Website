export interface News {
  _id?: string;
  title: string;
  subTitles: [{sub: string, id: number}];
  writer: string;
  date: string;
  map: Boolean;
  coordinates: [{lat: number, lng: number}],
  keywords: [string];
  images: [{name: string, url: string, id: number}];
  smallImages: [{name: string, url: string, id: number}];
  contents: [{cont:string, id:number}];
  createdOn: Date;
}
