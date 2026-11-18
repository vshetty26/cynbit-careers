import { Role } from "@/data/roles";

export const getSimilarRoles = (
  currentRole: Role,
  allRoles: Role[],
  limit: number = 3
): Role[] => {
  const filtered = allRoles.filter((role) => role.slug !== currentRole.slug);

  const scored = filtered.map((role) => {
    let score = 0;

    // Same department gets high score
    if (role.department === currentRole.department) score += 40;

    // Same type gets medium score
    if (role.type === currentRole.type) score += 30;

    // Overlapping skills
    const overlap = role.skills.filter((skill) =>
      currentRole.skills.includes(skill)
    ).length;
    score += overlap * 5;

    // Same experience level
    if (role.experience === currentRole.experience) score += 15;

    return { role, score };
  });

  // Sort by score and return top N
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.role);
};
