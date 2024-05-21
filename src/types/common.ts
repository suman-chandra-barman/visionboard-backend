export type TEyeglasses = {
  _id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  color: string;
  quantity: number;
  bridgeSize: number;
  frameMaterial: string;
  frameShape: string;
  gender: string;
  lensType: string;
  templeLength: number;
  key: string;
  availability: boolean;
  isDeleted: boolean;
  __v: number;
};

export type TSale = {
  _id: string;
  productId: string;
  buyerName: string;
  quantity: number;
  date: Date;
};
export type TSaleWithProduct = {
  _id: string;
  productId: TEyeglasses;
  buyerName: string;
  quantity: number;
  date: Date;
};
