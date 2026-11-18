"use client";

import { useState, useMemo } from "react";
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

export default function CareersPage() {
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Cynbit Careers</h1>
              <p className="mt-1 text-gray-600">
                Architect human-centric software solutions with us
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/careers/matcher"
                className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors font-medium"
              >
                Find Your Match
              </Link>
              <a
                href="https://www.cynbit.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Back to Cynbit
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="mb-6">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
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
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">{filteredRoles.length}</span> role
                {filteredRoles.length !== 1 ? "s" : ""} found
              </p>
              <SortControl
                value={sortBy as SortOption}
                onChange={setSortBy}
              />
            </div>

            {/* Roles Grid */}
            {filteredRoles.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {filteredRoles.map((role) => (
                  <RoleCard key={role.slug} role={role} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white border border-gray-200 rounded-lg">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M12 21a9 9 0 100-18 9 9 0 000 18z"
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  No roles found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search or filters
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    handleClearFilters();
                  }}
                  className="text-sm text-gray-900 underline hover:no-underline"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Fallback CTA */}
            <div className="mt-12 bg-white border border-gray-200 rounded-lg p-8 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Don't see your role?
              </h3>
              <p className="text-gray-600 mb-4">
                We're always looking for architects of the future. Send us your
                portfolio and tell us how you can contribute to the Cynbit software
                vision.
              </p>
              <a
                href="mailto:careers@cynbit.in"
                className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors font-medium"
              >
                Get in Touch
              </a>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
