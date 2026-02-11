"use client";

import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";
import { useQuery } from "@apollo/client/react";
import { GET_ALL_CATEGORIES } from "@/lib/graphql/queries/categories";
import { CURRENCY_SYMBOL } from "@/lib/constants";

interface ProductFilterProps {
  onSearchChange: (search: string) => void;
  onCategoryChange: (category: string) => void;
  onConditionChange?: (condition: string) => void;
  onSortByChange: (sort: string) => void;
  onAvailableChange: (available: boolean | undefined) => void;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface GetAllCategoriesData {
  allCategories: Category[];
}

export default function ProductFilter({
  onSearchChange,
  onCategoryChange,
  onConditionChange,
  onSortByChange,
  onAvailableChange,
}: ProductFilterProps) {

  const { data } = useQuery<GetAllCategoriesData>(GET_ALL_CATEGORIES);

  const handleAvailabilityChange = (value: string) => {
    if (value === "") {
      onAvailableChange(undefined);
    } else {
      onAvailableChange(value === "true");
    }
  };


  return (
    <div className="mt-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 text-gray-800">
        <AdjustmentsHorizontalIcon className="h-5 w-5" />
        <span className="font-semibold text-sm">Filters & Sorting</span>
      </div>

      {/* Controls Row */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-transparent transition-all"
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-t border-gray-50 pt-4">
          {/* Dropdowns Group */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {/* Category Dropdown */}
            <select
              onChange={(e) => onCategoryChange(e.target.value)}
              className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <option value="">All Categories</option>
              {data?.allCategories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>

            {/* Condition Dropdown */}
            <select
              onChange={(e) =>
                onConditionChange && onConditionChange(e.target.value)
              }
              className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <option value="">Any Condition</option>
              <option value="NEW">Brand New</option>
              <option value="EXCELLENT">Like New</option>
              <option value="GOOD">Gently Used</option>
              <option value="FAIR">Worn but functional</option>
            </select>

            {/* Availability Dropdown */}
            <select
              onChange={(e) => handleAvailabilityChange(e.target.value)}
              className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <option value="">All Items</option>
              <option value="true">Available Only</option>
              <option value="false">Sold Only</option>
            </select>

            {/* Sort Dropdown */}
            <select
              onChange={(e) => onSortByChange(e.target.value)}
              className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>

          {/* Reset Button */}
          <button
            onClick={() => window.location.reload()} // Quick reset
            className="text-sm font-medium text-gray-500 hover:text-red-500 transition-colors underline decoration-dotted"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
}
