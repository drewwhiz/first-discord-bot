import { IBrandColor } from '../../models/IBrandColor.js';

export interface IBrandColorDataService {
    getByBrand(brand: string): Promise<IBrandColor[]>;
    getBrands(): Promise<string[]>;
}