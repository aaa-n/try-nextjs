'use client';

import { ProductSortDto } from '@/core/application/dtos/ProductManagementDto';

interface ProductSortProps {
  sort: ProductSortDto;
  onSortChange: (sort: ProductSortDto) => void;
}

export default function ProductSort({ sort, onSortChange }: ProductSortProps) {
  const sortOptions = [
    { field: 'name', label: 'Name' },
    { field: 'price', label: 'Price' },
    { field: 'createdAt', label: 'Date Added' }
  ] as const;

  return (
    <div className="flex items-center space-x-2">
      <label className="text-sm font-medium text-gray-700">Sort by:</label>
      <select
        value={`${sort.field}-${sort.direction}`}
        onChange={(e) => {
          const [field, direction] = e.target.value.split('-') as [ProductSortDto['field'], ProductSortDto['direction']];
          onSortChange({ field, direction });
        }}
        className="border border-gray-300 rounded-md p-2 text-sm"
      >
        {sortOptions.map((option) => (
          <>
            <option key={`${option.field}-asc`} value={`${option.field}-asc`}>
              {option.label} (A-Z)
            </option>
            <option key={`${option.field}-desc`} value={`${option.field}-desc`}>
              {option.label} (Z-A)
            </option>
          </>
        ))}
      </select>
    </div>
  );
}