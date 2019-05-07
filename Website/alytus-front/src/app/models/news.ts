export interface News {
  _id?: string;
  title: string;
  subTitle: [string];
  writer: string;
  date: string;
  map: Boolean;
  keywords: [string];
  image: [{name: string, url: string}];
  smallImage: [{name: string, url: string}];
  content: [string];
}

