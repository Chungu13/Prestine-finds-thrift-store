"use client";
import { useState } from "react";
import Link from "next/link";
import ProductList from "./components/ProductList";
import ProductFilter from "./components/ProductFilter";
import Navbar from "./components/Navbar";

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [sortBy, setSortBy] = useState("price_asc");
  const [available, setAvailable] = useState<boolean | undefined>();

  return (
    <main className="min-h-screen p-8 bg-white text-gray-900">
      <Navbar />
      <div className="max-w-6xl mx-auto">
        <ProductFilter
          onSearchChange={setSearch}
          onCategoryChange={setCategory}
          onConditionChange={setCondition}
          onSortByChange={setSortBy}
          onAvailableChange={setAvailable}
        />
        <ProductList
          search={search}
          category={category}
          condition={condition}
          sortBy={sortBy}
          available={available}
        />
      </div>
    </main>
  );
}
