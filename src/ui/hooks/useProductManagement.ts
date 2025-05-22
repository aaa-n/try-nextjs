'use client';

import { useState, useCallback } from 'react';
import { 
  ProductListDto,
  ProductFilterDto,
  ProductSortDto,
  ProductManagementStateDto
} from '@/core/application/dtos/ProductManagementDto';

interface UseProductManagementProps {
  initialState?: ProductManagementStateDto;
}

export function useProductManagement({ initialState }: UseProductManagementProps = {}) {
  const [filters, setFilters] = useState<ProductFilterDto>(initialState?.filters || {});
  const [sort, setSort] = useState<ProductSortDto>(initialState?.sort || { field: 'name', direction: 'asc' });
  const [page, setPage] = useState(initialState?.page || 1);
  const [limit] = useState(initialState?.limit || 12);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ProductListDto | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Build query parameters
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.minPrice) params.append('minPrice', filters.minPrice.toString());
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
      if (filters.inStock !== undefined) params.append('inStock', filters.inStock.toString());
      params.append('sortField', sort.field);
      params.append('sortDirection', sort.direction);
      params.append('page', page.toString());
      params.append('limit', limit.toString());

      const response = await fetch(`/api/products?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const result = await response.json();
      setData(result);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [filters, sort, page, limit]);

  const handleFilterChange = useCallback((newFilters: ProductFilterDto) => {
    setFilters(newFilters);
    setPage(1); // Reset to first page when filters change
  }, []);

  const handleSortChange = useCallback((newSort: ProductSortDto) => {
    setSort(newSort);
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  return {
    filters,
    sort,
    page,
    limit,
    loading,
    error,
    data,
    handleFilterChange,
    handleSortChange,
    handlePageChange,
    fetchProducts
  };
}