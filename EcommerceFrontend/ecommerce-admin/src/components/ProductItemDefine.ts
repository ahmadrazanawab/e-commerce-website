export interface ProductItem {
    _id: string;
    name: string;
    description: string;
    images: string;
    price: number;
    mrpPrice: number;
    disPercentage: number;
    stock: number;
    category: string;
}
  
export interface getUserDetails {
    name: string;
    email: string;
    number: number;
    createdAt?: number;
}