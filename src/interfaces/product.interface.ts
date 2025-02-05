export interface Product {
    productId: string;
    sku: string;
    price: {
        cost: number;
        currency: string;
        discount: boolean;
        percent: number;
        costDiscount: number;
    };
    title: string;
    description?: string;
    productImageId: string;
    onSale: boolean;
    inStock: boolean;
}