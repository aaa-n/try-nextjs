import { ProductDto } from './ProductDto';

export interface ProductListDto {
  products: ProductDto[];
  totalCount: number;
  page: number;
  limit: number;
}

export interface ProductFilterDto {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
}

export interface ProductSortDto {
  field: 'name' | 'price' | 'createdAt';
  direction: 'asc' | 'desc';
}

export interface ProductManagementStateDto {
  filters: ProductFilterDto;
  sort: ProductSortDto;
  page: number;
  limit: number;
}