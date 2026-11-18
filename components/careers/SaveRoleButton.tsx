"use client";

import { useState, useEffect } from "react";
import { isSaved, toggleSaveRole } from "@/lib/saved-roles";

interface SaveRoleButtonProps {
  slug: string;
}

export function SaveRoleButton({ slug }: SaveRoleButtonProps) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isSaved(slug));
  }, [slug]);

  const handleToggle = () => {
    const newSaved = toggleSaveRole(slug);
    setSaved(newSaved);
  };

  return (
    <button
      onClick={handleToggle}
      className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
      aria-label={saved ? "Unsave role" : "Save role"}
    >
      {saved ? (
        <>
          <svg
            className="w-5 h-5 text-gray-900"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M3 3a2 2 0 012-2h10a2 2 0 012 2v14l-6-4-6 4V3z" />
          </svg>
          <span className="text-sm font-medium">Saved</span>
        </>
      ) : (
        <>
          <svg
            className="w-5 h-5 text-gray-600"
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
          <span className="text-sm font-medium text-gray-700">Save</span>
        </>
      )}
    </button>
  );
}
