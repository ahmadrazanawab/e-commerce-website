export interface ProductDetailsItem {
    _id: string | number;
    name: string;
    description: string;
    images: string;
    price: number;
    TotalPrice: number;
    quantity?: number;
    TotalQuantity?: number;
    stock: number;
    category: string;
};