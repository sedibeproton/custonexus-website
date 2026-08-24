"use client";

import { useMemo, useState } from "react";

type DocumentItem = {
  id: string;
  originalName: string;
  category: string;
  description: string | null;
};

type DocumentFiltersProps = {
  documents: DocumentItem[];
};

export default function DocumentFilters({
  documents,
}: DocumentFiltersProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(() => {
    return [
      "All",
      ...Array.from(
        new Set(documents.map((document) => document.category))
      ).sort(),
    ];
  }, [documents]);

  const filteredDocuments = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    return documents.filter((document) => {
      const matchesCategory =
        category === "All" || document.category === category;

      if (!matchesCategory) {
        return false;
      }

      if (!searchTerm) {
        return true;
      }

      return (
        document.originalName.toLowerCase().includes(searchTerm) ||
        document.category.toLowerCase().includes(searchTerm) ||
        (document.description ?? "")
          .toLowerCase()
          .includes(searchTerm)
      );
    });
  }, [documents, search, category]);

  return {
    search,
    setSearch,
    category,
    setCategory,
    categories,
    filteredDocuments,
  };
}