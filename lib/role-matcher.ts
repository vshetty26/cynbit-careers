import { Role } from "@/data/roles";

export interface MatcherAnswers {
  interests: string[]; // ["tech", "marketing", "business"]
  skills: string[]; // ["coding", "design", "writing", "analytics", "sales"]
  experience: string; // "none", "some", "experienced"
  workStyle: string; // "independent", "collaborative", "mixed"
  goal: string; // "learn", "grow", "lead"
}

export interface RoleMatch {
  role: Role;
  score: number;
  percentage: number;
  reasons: string[];
}

const interestWeights: Record<string, Record<string, number>> = {
  tech: {
    Tech: 1.0,
    "Core Engineering": 1.0,
    "Marketing & Growth": 0.3,
    Business: 0.2,
    "Growth Team": 0.2,
  },
  marketing: {
    "Marketing & Growth": 1.0,
    "Growth Team": 0.8,
    Business: 0.4,
    Tech: 0.2,
    "Core Engineering": 0.1,
  },
  business: {
    Business: 1.0,
    "Growth Team": 0.9,
    "Marketing & Growth": 0.5,
    Tech: 0.2,
    "Core Engineering": 0.1,
  },
};

const skillWeights: Record<string, string[]> = {
  coding: [
    "Node.js",
    "Python",
    "React",
    "TypeScript",
    "JavaScript",
    "Backend",
    "Frontend",
    "Full Stack",
    "API",
  ],
  design: ["Figma", "UI", "UX", "Wireframing", "Prototyping", "Design"],
  writing: ["Content", "Writing", "SEO", "Copywriting", "Documentation"],
  analytics: ["Analytics", "Data", "SQL", "Metrics", "Growth", "Testing"],
  sales: ["Sales", "Business", "CRM", "Lead", "Client", "Negotiation"],
};

export const calculateRoleMatches = (
  roles: Role[],
  answers: MatcherAnswers
): RoleMatch[] => {
  const matches: RoleMatch[] = roles.map((role) => {
    let score = 0;
    const reasons: string[] = [];
    const maxScore = 100;

    // Interest match (30 points)
    let interestScore = 0;
    answers.interests.forEach((interest) => {
      const weight = interestWeights[interest]?.[role.department] || 0;
      interestScore += weight * 10;
    });
    score += Math.min(interestScore, 30);
    if (interestScore >= 8) {
      reasons.push(`Strong alignment with ${role.department}`);
    }

    // Skills match (30 points)
    let skillScore = 0;
    answers.skills.forEach((skill) => {
      const keywords = skillWeights[skill] || [];
      const matchingSkills = role.skills.filter((s) =>
        keywords.some((k) => s.toLowerCase().includes(k.toLowerCase()))
      );
      if (matchingSkills.length > 0) {
        skillScore += matchingSkills.length * 5;
        reasons.push(`Your ${skill} skills match: ${matchingSkills.join(", ")}`);
      }
    });
    score += Math.min(skillScore, 30);

    // Experience match (20 points)
    const expScore = getExperienceScore(answers.experience, role);
    score += expScore.score;
    if (expScore.reason) reasons.push(expScore.reason);

    // Work style match (10 points)
    if (answers.workStyle === "independent" && role.type === "Internship") {
      score += 10;
      reasons.push("Good autonomy for internship learning");
    } else if (
      answers.workStyle === "collaborative" &&
      role.type === "Full-Time"
    ) {
      score += 10;
      reasons.push("Team-oriented full-time environment");
    } else {
      score += 5;
    }

    // Goal match (10 points)
    const goalScore = getGoalScore(answers.goal, role);
    score += goalScore.score;
    if (goalScore.reason) reasons.push(goalScore.reason);

    const percentage = Math.min(Math.round((score / maxScore) * 100), 100);

    return {
      role,
      score,
      percentage,
      reasons: reasons.slice(0, 3), // Top 3 reasons
    };
  });

  // Sort by score descending
  return matches.sort((a, b) => b.score - a.score);
};

function getExperienceScore(
  experience: string,
  role: Role
): { score: number; reason?: string } {
  if (experience === "none" && role.experience === "Internship") {
    return { score: 20, reason: "Perfect for beginners" };
  }
  if (
    experience === "some" &&
    (role.experience === "Internship" || role.experience === "1-2 Years")
  ) {
    return { score: 20, reason: "Matches your experience level" };
  }
  if (experience === "experienced" && role.type === "Full-Time") {
    return { score: 20, reason: "Senior role fits your background" };
  }
  return { score: 10 };
}

function getGoalScore(
  goal: string,
  role: Role
): { score: number; reason?: string } {
  if (goal === "learn" && role.type === "Internship") {
    return { score: 10, reason: "Great learning opportunity" };
  }
  if (goal === "grow" && role.type === "Full-Time") {
    return { score: 10, reason: "Room for career growth" };
  }
  if (goal === "lead" && role.type === "Full-Time") {
    return { score: 10, reason: "Leadership potential" };
  }
  return { score: 5 };
}

export const getTopMatches = (
  roles: Role[],
  answers: MatcherAnswers,
  limit: number = 3
): RoleMatch[] => {
  const matches = calculateRoleMatches(roles, answers);
  return matches.slice(0, limit);
};
