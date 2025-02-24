export interface ProductDetailsItem {
    _id: string | number;
    name: string;
    description: string;
    images: string;
    price: number;
    mrpPrice: number;
    disPercentage: number;
    TotalPrice: number;
    quantity?: number;
    TotalQuantity?: number;
    stock: number;
    category: string;
};

export interface ShippingAddress {
    _id: string;
    fullname: string;
    mobileno: number;
    pincode: number;
    HomeAddress: string;
    Area: string;
    landmark: string;
    townorcity: string;
    state: string;
    country: string;
};

export interface UserAuth {
    name: string;
    email: string;
    number: number;
    password: string;
};