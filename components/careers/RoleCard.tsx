"use client";

import Link from "next/link";
import { Role } from "@/data/roles";
import { Badge } from "@/components/ui/Badge";
import { useState, useEffect } from "react";
import { isSaved, toggleSaveRole } from "@/lib/saved-roles";

interface RoleCardProps {
  role: Role;
}

export function RoleCard({ role }: RoleCardProps) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isSaved(role.slug));
  }, [role.slug]);

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    const newSaved = toggleSaveRole(role.slug);
    setSaved(newSaved);
  };

  return (
    <Link
      href={`/careers/${role.slug}`}
      className="block group bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-900 hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
            {role.title}
          </h3>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <Badge variant="default">{role.type}</Badge>
            <Badge variant="secondary">{role.department}</Badge>
            <span className="text-sm text-gray-500">{role.location}</span>
          </div>
        </div>
        <button
          onClick={handleSaveToggle}
          className="ml-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label={saved ? "Unsave role" : "Save role"}
        >
          {saved ? (
            <svg
              className="w-5 h-5 text-gray-900"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M3 3a2 2 0 012-2h10a2 2 0 012 2v14l-6-4-6 4V3z" />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h6a2 2 0 012 2v14l-5-3.5L5 19V5z"
              />
            </svg>
          )}
        </button>
      </div>

      <p className="text-gray-600 text-sm line-clamp-2 mb-3">{role.summary}</p>

      <div className="flex flex-wrap gap-1.5">
        {role.skills.slice(0, 4).map((skill) => (
          <span
            key={skill}
            className="text-xs px-2 py-1 bg-gray-50 text-gray-600 rounded"
          >
            {skill}
          </span>
        ))}
        {role.skills.length > 4 && (
          <span className="text-xs px-2 py-1 text-gray-500">
            +{role.skills.length - 4} more
          </span>
        )}
      </div>
    </Link>
  );
}
