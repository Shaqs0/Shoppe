export interface Product {
    productId: string;
    language: string;
    sku?: string;
    categories: string;
    productType: string;
    productSubType: null;
    description?: string;
    productImageId: string[];
    likes: number
    price: {
        cost: number;
        currency: string;
        discount: boolean;
        percent: number;
        costDiscount: number;
    };
    title: string;
    images: string[];
    specifications: [
        {
            name: string,
            specificationId: string;
            sku: string,
            item: string,
            inStock: boolean;
        }
    ]
   createTimeStamp?: string
}