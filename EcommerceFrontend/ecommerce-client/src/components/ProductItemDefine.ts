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

export interface ShippingAddress {
    _id: string;
    fullname: string;
    mobile: number;
    pincode: number;
    HomeAddress: string;
    Area: string;
    landmark: string;
    townorcity: string;
    state: string;
    country: string;
};