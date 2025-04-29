import { IVendor } from '../../models/IVendor.js';

export interface IVendorDataService {
  getPrefixes(): Promise<string[]>;
  getVendors(): Promise<IVendor[]>;
  get(id: number): Promise<IVendor>;
  getByPrefix(prefix: string): Promise<IVendor>;
}