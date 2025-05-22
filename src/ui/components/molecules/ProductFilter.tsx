'use client';

import { useState } from 'react';
import { ProductFilterDto } from '@/core/application/dtos/ProductManagementDto';
import Button from '@/ui/components/atoms/Button';

interface ProductFilterProps {
  initialFilters?: ProductFilterDto;
  onFilterChange: (filters: ProductFilterDto) => void;
}

export default function ProductFilter({ initialFilters, onFilterChange }: ProductFilterProps) {
  const [filters, setFilters] = useState<ProductFilterDto>(initialFilters || {});

  const categories = [
    'electronics',
    'clothing',
    'books',
    'home',
    'sports'
  ];

  const handleFilterChange = (newFilters: Partial<ProductFilterDto>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>
      
      <div className="space-y-4">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={filters.category || ''}
            onChange={(e) => handleFilterChange({ category: e.target.value || undefined })}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice || ''}
              onChange={(e) => handleFilterChange({ minPrice: e.target.value ? Number(e.target.value) : undefined })}
              className="w-1/2 border border-gray-300 rounded-md p-2"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice || ''}
              onChange={(e) => handleFilterChange({ maxPrice: e.target.value ? Number(e.target.value) : undefined })}
              className="w-1/2 border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>

        {/* Stock Filter */}
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={filters.inStock || false}
              onChange={(e) => handleFilterChange({ inStock: e.target.checked })}
              className="rounded border-gray-300"
            />
            <span className="text-sm font-medium text-gray-700">In Stock Only</span>
          </label>
        </div>

        {/* Clear Filters */}
        <Button
          variant="secondary"
          onClick={() => {
            setFilters({});
            onFilterChange({});
          }}
          className="w-full mt-2"
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
}