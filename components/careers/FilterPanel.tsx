"use client";

import { Department, ExperienceLevel, RoleType } from "@/data/roles";
import { RoleFilters } from "@/lib/filters";

interface FilterPanelProps {
  filters: RoleFilters;
  onFilterChange: (filters: RoleFilters) => void;
  onClearAll: () => void;
}

const filterOptions = {
  type: ["Internship", "Full-Time"] as RoleType[],
  department: [
    "Tech",
    "Marketing & Growth",
    "Business",
    "Core Engineering",
    "Growth Team",
  ] as Department[],
  experience: ["Internship", "1-2 Years", "1-3 Years"] as ExperienceLevel[],
};

export function FilterPanel({
  filters,
  onFilterChange,
  onClearAll,
}: FilterPanelProps) {
  const toggleFilter = <K extends keyof RoleFilters>(
    key: K,
    value: NonNullable<RoleFilters[K]>[number]
  ) => {
    const current = filters[key] || [];
    const newValues = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];

    onFilterChange({
      ...filters,
      [key]: newValues.length > 0 ? newValues : undefined,
    });
  };

  const activeFilterCount =
    (filters.type?.length || 0) +
    (filters.department?.length || 0) +
    (filters.experience?.length || 0);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        {activeFilterCount > 0 && (
          <button
            onClick={onClearAll}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Clear all ({activeFilterCount})
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Type Filter */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Type</h4>
          <div className="space-y-2">
            {filterOptions.type.map((type) => (
              <label key={type} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.type?.includes(type) || false}
                  onChange={() => toggleFilter("type", type)}
                  className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                />
                <span className="ml-2 text-sm text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Department Filter */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Department</h4>
          <div className="space-y-2">
            {filterOptions.department.map((dept) => (
              <label key={dept} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.department?.includes(dept) || false}
                  onChange={() => toggleFilter("department", dept)}
                  className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                />
                <span className="ml-2 text-sm text-gray-700">{dept}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Experience Filter */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Experience</h4>
          <div className="space-y-2">
            {filterOptions.experience.map((exp) => (
              <label key={exp} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.experience?.includes(exp) || false}
                  onChange={() => toggleFilter("experience", exp)}
                  className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                />
                <span className="ml-2 text-sm text-gray-700">{exp}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
