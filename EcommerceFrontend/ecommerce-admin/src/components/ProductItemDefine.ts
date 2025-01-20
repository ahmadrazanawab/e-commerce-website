export interface ProductItem {
    _id: number;
    name: string;
    description: string;
    images: string;
    price: number;
    stock: number;
    category: string;
}
  
export interface getUserDetails {
    name: string;
    email: string;
    number: number;
    createdAt?: number;

}