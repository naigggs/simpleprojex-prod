"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Button,
  Separator,
} from "@/components/shared";
import { SortByComponent } from "@/components/shared/ui/sort-by-component";
import { SearchComponent } from "@/components/shared/ui/search-component";
import { SortOption } from "@/types/sort";
import ProposalGridView from "@/components/ui/proposals/proposal-grid-view";
import ProposalListView from "@/components/ui/proposals/proposal-list-view";
import Link from "next/link";

function ProposalContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const viewParam = searchParams.get("view");
  const [activeTab, setActiveTab] = useState<string>(viewParam === "list" ? "list" : "grid");

  const [sortOption, setSortOption] = useState<SortOption>({
    value: "date-descending",
    label: "Date (Newest First)",
  });

  const [searchQuery, setSearchQuery] = useState<string>("");
  
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleSortChange = (newSortOption: SortOption) => {
    setSortOption(newSortOption);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    router.push(`/proposals?view=${value}`, { scroll: false });
  };

  return (
    <div className="container mx-auto px-4">
      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={handleTabChange}>
        <div className="sticky top-0 z-10 w-full left-0 bg-background">
          <div className="container mx-auto pt-6 pb-2">
            <div className="flex justify-between items-center mb-6">
              <div className="flex flex-col">
                <h1 className="text-3xl font-bold">Proposals</h1>
                <p>Manage and track client proposals.</p>
              </div>
              <Link href={"/proposals/create"}>
                <Button className="uppercase font-bold">New Proposal</Button>
              </Link>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3 flex-wrap">
                <SearchComponent
                  onChange={handleSearchChange}
                  value={searchQuery}
                />
                <SortByComponent
                  onChange={handleSortChange}
                  initialValue={sortOption.value}
                />
              </div>
              <TabsList>
                <TabsTrigger value="grid">Grid View</TabsTrigger>
                <TabsTrigger value="list">List View</TabsTrigger>
              </TabsList>
            </div>
            <Separator className="mt-4" />
          </div>
        </div>
        <div className="container mx-auto">
          <TabsContent value="grid">
            <ProposalGridView
              sortOption={sortOption}
              searchQuery={searchQuery}
            />
          </TabsContent>
          <TabsContent value="list">
            <ProposalListView
              sortOption={sortOption}
              searchQuery={searchQuery}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

export default function ProposalPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading proposals...</div>}>
      <ProposalContent />
    </Suspense>
  );
}
