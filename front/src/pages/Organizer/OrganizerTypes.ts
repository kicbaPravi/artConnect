interface Image {
  _id: string;
  name: string;
  technique: string;
  width: number;
  height: number;
  location: string;
  year: number;
  number: number;
  price: number;
  status: 'stock' | 'inProgress' | 'sold';
  soldToPersonName?: string;
  imagePath: string;
}
