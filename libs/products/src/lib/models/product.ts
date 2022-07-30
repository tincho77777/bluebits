import { Category } from 'libs/products/src/lib/models/category';

export class Product {  //esto es lo mismo que una interface
    id?: string;
    name?: string;
    description?: string;
    richDescription?: string;
    image?: string;
    images?: string[];
    brand?: string;
    price?: string;
    category?: Category;
    countInStock?: number;
    rating?: number;
    numReviews?: number;
    isFeatured?: boolean;
    dateCreated?: string;
}