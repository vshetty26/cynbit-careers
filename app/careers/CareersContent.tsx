"use client";

import { useMemo } from "react";
import { useQueryState, parseAsString, parseAsArrayOf } from "nuqs";
import { roles } from "@/data/roles";
import { searchRoles } from "@/lib/search";
import { applyFilters, sortRoles, SortOption, RoleFilters } from "@/lib/filters";
import { SearchBar } from "@/components/careers/SearchBar";
import { FilterPanel } from "@/components/careers/FilterPanel";
import { SortControl } from "@/components/careers/SortControl";
import { RoleCard } from "@/components/careers/RoleCard";
import { Department, ExperienceLevel, RoleType } from "@/data/roles";
import Link from "next/link";

export function CareersContent() {
  const [searchQuery, setSearchQuery] = useQueryState("q", parseAsString.withDefault(""));
  const [typeFilter, setTypeFilter] = useQueryState(
    "type",
    parseAsArrayOf(parseAsString).withDefault([])
  );
  const [deptFilter, setDeptFilter] = useQueryState(
    "dept",
    parseAsArrayOf(parseAsString).withDefault([])
  );
  const [expFilter, setExpFilter] = useQueryState(
    "exp",
    parseAsArrayOf(parseAsString).withDefault([])
  );
  const [sortBy, setSortBy] = useQueryState(
    "sort",
    parseAsString.withDefault("relevance")
  );

  const filters: RoleFilters = {
    type: typeFilter.length > 0 ? (typeFilter as RoleType[]) : undefined,
    department: deptFilter.length > 0 ? (deptFilter as Department[]) : undefined,
    experience: expFilter.length > 0 ? (expFilter as ExperienceLevel[]) : undefined,
  };

  const handleFilterChange = (newFilters: RoleFilters) => {
    setTypeFilter(newFilters.type || []);
    setDeptFilter(newFilters.department || []);
    setExpFilter(newFilters.experience || []);
  };

  const handleClearFilters = () => {
    setTypeFilter([]);
    setDeptFilter([]);
    setExpFilter([]);
  };

  const filteredRoles = useMemo(() => {
    let result = searchQuery ? searchRoles(roles, searchQuery) : roles;
    result = applyFilters(result, filters);
    result = sortRoles(result, sortBy as SortOption);
    return result;
  }, [searchQuery, filters, sortBy]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-yellow-300 border-b-8 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-5xl font-black uppercase text-black mb-2 tracking-tight">
                CYNBIT CAREERS
              </h1>
              <p className="text-lg font-bold text-black uppercase tracking-wide">
                → Architect human-centric software
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/careers/matcher"
                className="px-6 py-3 bg-black text-white border-4 border-black hover:bg-red-600 font-black uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                FIND MATCH
              </Link>
              <a
                href="https://www.cynbit.in"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white text-black border-4 border-black hover:bg-cyan-300 font-black uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                ← BACK
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search */}
        <div className="mb-8">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1">
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearAll={handleClearFilters}
            />
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <div className="flex items-center justify-between mb-8 pb-4 border-b-4 border-black">
              <p className="text-lg font-black uppercase">
                <span className="text-3xl text-red-600">{filteredRoles.length}</span> ROLE
                {filteredRoles.length !== 1 ? "S" : ""} FOUND
              </p>
              <SortControl
                value={sortBy as SortOption}
                onChange={setSortBy}
              />
            </div>

            {/* Roles Grid */}
            {filteredRoles.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {filteredRoles.map((role) => (
                  <RoleCard key={role.slug} role={role} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <svg
                  className="mx-auto h-16 w-16 text-black mb-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={4}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M12 21a9 9 0 100-18 9 9 0 000 18z"
                  />
                </svg>
                <h3 className="text-2xl font-black uppercase text-black mb-3">
                  NO ROLES FOUND
                </h3>
                <p className="text-lg font-bold text-black mb-6 uppercase">
                  Try adjusting filters
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    handleClearFilters();
                  }}
                  className="px-6 py-3 bg-black text-white border-4 border-black hover:bg-red-600 font-black uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  CLEAR ALL
                </button>
              </div>
            )}

            {/* Fallback CTA */}
            <div className="mt-12 bg-lime-300 border-4 border-black p-10 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-3xl font-black uppercase text-black mb-4">
                DON'T SEE YOUR ROLE?
              </h3>
              <p className="text-lg font-bold text-black mb-6 uppercase max-w-2xl mx-auto">
                → We're always looking for architects of the future. Send your
                portfolio and tell us how you can contribute →
              </p>
              <a
                href="mailto:careers@cynbit.in"
                className="inline-flex items-center px-8 py-4 bg-black text-white border-4 border-black hover:bg-red-600 font-black uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                GET IN TOUCH →
              </a>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
