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
      className="block group bg-white border-4 border-black p-6 hover:bg-yellow-300 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-black uppercase text-black mb-3">
            {role.title}
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="default">{role.type}</Badge>
            <Badge variant="secondary">{role.department}</Badge>
            <span className="text-sm font-bold uppercase tracking-wider">{role.location}</span>
          </div>
        </div>
        <button
          onClick={handleSaveToggle}
          className="ml-4 p-3 bg-white border-4 border-black hover:bg-red-600 hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          aria-label={saved ? "Unsave role" : "Save role"}
        >
          {saved ? (
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M3 3a2 2 0 012-2h10a2 2 0 012 2v14l-6-4-6 4V3z" />
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              viewBox="0 0 20 20"
            >
              <path
                strokeLinecap="square"
                strokeLinejoin="miter"
                d="M5 5a2 2 0 012-2h6a2 2 0 012 2v14l-5-3.5L5 19V5z"
              />
            </svg>
          )}
        </button>
      </div>

      <p className="text-black font-medium leading-relaxed mb-4">{role.summary}</p>

      <div className="flex flex-wrap gap-2">
        {role.skills.slice(0, 4).map((skill) => (
          <span
            key={skill}
            className="text-xs font-bold uppercase px-3 py-1.5 bg-white border-2 border-black"
          >
            {skill}
          </span>
        ))}
        {role.skills.length > 4 && (
          <span className="text-xs font-bold uppercase px-3 py-1.5 border-2 border-black">
            +{role.skills.length - 4} more
          </span>
        )}
      </div>
    </Link>
  );
}
