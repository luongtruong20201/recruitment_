import { EDirection } from './api.constant';

export interface IPagination {
  limit: number;
  page: number;
  sortBy?: string;
  direction?: EDirection;
}
