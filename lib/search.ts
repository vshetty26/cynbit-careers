import Fuse from "fuse.js";
import { Role } from "@/data/roles";

export const createRoleSearchIndex = (roles: Role[]) => {
  return new Fuse(roles, {
    keys: [
      { name: "title", weight: 0.4 },
      { name: "summary", weight: 0.3 },
      { name: "skills", weight: 0.2 },
      { name: "department", weight: 0.1 },
    ],
    threshold: 0.4,
    includeScore: true,
  });
};

export const searchRoles = (
  roles: Role[],
  query: string
): Role[] => {
  if (!query.trim()) return roles;
  
  const fuse = createRoleSearchIndex(roles);
  const results = fuse.search(query);
  return results.map((result) => result.item);
};
