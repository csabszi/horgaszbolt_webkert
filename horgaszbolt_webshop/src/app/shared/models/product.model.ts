export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  amount: number;
  addAmount?: number;
  removeAmount?: number;
  newPrice?: number;
}