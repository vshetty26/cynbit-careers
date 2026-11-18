"use client";

import { Department, ExperienceLevel, RoleType } from "@/data/roles";
import { RoleFilters } from "@/lib/filters";

interface FilterPanelProps {
  filters: RoleFilters;
  onFilterChange: (filters: RoleFilters) => void;
  onClearAll: () => void;
}

const filterOptions = {
  type: ["Internship", "Full-Time"] as const,
  department: [
    "Tech",
    "Marketing & Growth",
    "Business",
    "Core Engineering",
    "Growth Team",
  ] as const,
  experience: ["Internship", "1-2 Years", "1-3 Years"] as const,
};

export function FilterPanel({
  filters,
  onFilterChange,
  onClearAll,
}: FilterPanelProps) {
  const toggleFilter = (
    key: keyof RoleFilters,
    value: RoleType | Department | ExperienceLevel
  ) => {
    const current = (filters[key] || []) as (RoleType | Department | ExperienceLevel)[];
    const newValues = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];

    onFilterChange({
      ...filters,
      [key]: newValues.length > 0 ? newValues : undefined,
    } as RoleFilters);
  };

  const activeFilterCount =
    (filters.type?.length || 0) +
    (filters.department?.length || 0) +
    (filters.experience?.length || 0);

  return (
    <div className="bg-cyan-300 border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex items-center justify-between mb-6 pb-4 border-b-4 border-black">
        <h3 className="text-2xl font-black uppercase text-black">FILTERS</h3>
        {activeFilterCount > 0 && (
          <button
            onClick={onClearAll}
            className="text-sm font-black uppercase text-black hover:text-red-600 transition-colors px-3 py-1 border-2 border-black hover:bg-red-600 hover:text-white"
          >
            ✕ {activeFilterCount}
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Type Filter */}
        <div>
          <h4 className="text-lg font-black uppercase text-black mb-3 border-b-2 border-black pb-2">TYPE</h4>
          <div className="space-y-3">
            {filterOptions.type.map((type) => (
              <label key={type} className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.type?.includes(type) || false}
                  onChange={() => toggleFilter("type", type)}
                  className="w-6 h-6 border-4 border-black checked:bg-black focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
                <span className="ml-3 text-base font-bold uppercase text-black group-hover:text-red-600 transition-colors">
                  {type}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Department Filter */}
        <div>
          <h4 className="text-lg font-black uppercase text-black mb-3 border-b-2 border-black pb-2">DEPARTMENT</h4>
          <div className="space-y-3">
            {filterOptions.department.map((dept) => (
              <label key={dept} className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.department?.includes(dept) || false}
                  onChange={() => toggleFilter("department", dept)}
                  className="w-6 h-6 border-4 border-black checked:bg-black focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
                <span className="ml-3 text-base font-bold uppercase text-black group-hover:text-red-600 transition-colors">
                  {dept}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Experience Filter */}
        <div>
          <h4 className="text-lg font-black uppercase text-black mb-3 border-b-2 border-black pb-2">EXPERIENCE</h4>
          <div className="space-y-3">
            {filterOptions.experience.map((exp) => (
              <label key={exp} className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.experience?.includes(exp) || false}
                  onChange={() => toggleFilter("experience", exp)}
                  className="w-6 h-6 border-4 border-black checked:bg-black focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
                <span className="ml-3 text-base font-bold uppercase text-black group-hover:text-red-600 transition-colors">
                  {exp}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
