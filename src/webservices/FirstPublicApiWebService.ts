import { IFirstPublicApiWebService } from './interfaces/IFirstPublicApiWebService.js';

export class FirstPublicApiWebService implements IFirstPublicApiWebService {
  getCurrentFrcSeason(): Promise<number> {
    throw new Error('Method not implemented.');
  }
}
