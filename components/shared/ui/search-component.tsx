"use client";

import React, { useState } from "react";
import { Input,  Button } from "@/components/shared";
import { Search } from "lucide-react";

interface SearchComponentProps {
  onChange?: (query: string) => void;
  value?: string;
}

export function SearchComponent({ onChange, value = "" }: SearchComponentProps) {
  const [searchQuery, setSearchQuery] = useState(value);
  
  const handleSearch = () => {
    if (onChange) {
      onChange(searchQuery);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchQuery(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex gap-2">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          type="search"
          placeholder="Search templates..."
          className="w-64 pl-9"
          value={searchQuery}
          onChange={handleChange}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
      </div>
      <Button className="uppercase font-bold" onClick={handleSearch}>Search</Button>
    </div>
  );
}
