import type { Product } from './Product.interface';

export interface Products {
    products: Product[];
    total: number,
    skip: number,
    limit: number
}