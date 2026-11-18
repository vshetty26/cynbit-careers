import { Role, RoleType, Department, ExperienceLevel } from "@/data/roles";

export interface RoleFilters {
  type?: RoleType[];
  department?: Department[];
  experience?: ExperienceLevel[];
}

export const applyFilters = (roles: Role[], filters: RoleFilters): Role[] => {
  let filtered = roles;

  if (filters.type && filters.type.length > 0) {
    filtered = filtered.filter((role) => filters.type!.includes(role.type));
  }

  if (filters.department && filters.department.length > 0) {
    filtered = filtered.filter((role) =>
      filters.department!.includes(role.department)
    );
  }

  if (filters.experience && filters.experience.length > 0) {
    filtered = filtered.filter((role) =>
      filters.experience!.includes(role.experience)
    );
  }

  return filtered;
};

export type SortOption = "relevance" | "a-z" | "internships-first";

export const sortRoles = (roles: Role[], sortBy: SortOption): Role[] => {
  const sorted = [...roles];

  switch (sortBy) {
    case "a-z":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "internships-first":
      return sorted.sort((a, b) => {
        if (a.type === "Internship" && b.type !== "Internship") return -1;
        if (a.type !== "Internship" && b.type === "Internship") return 1;
        return a.title.localeCompare(b.title);
      });
    case "relevance":
    default:
      return sorted;
  }
};
