"use client";

const SAVED_ROLES_KEY = "cynbit-saved-roles";

export const getSavedRoles = (): string[] => {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem(SAVED_ROLES_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const saveRole = (slug: string): void => {
  const saved = getSavedRoles();
  if (!saved.includes(slug)) {
    localStorage.setItem(SAVED_ROLES_KEY, JSON.stringify([...saved, slug]));
  }
};

export const unsaveRole = (slug: string): void => {
  const saved = getSavedRoles();
  localStorage.setItem(
    SAVED_ROLES_KEY,
    JSON.stringify(saved.filter((s) => s !== slug))
  );
};

export const toggleSaveRole = (slug: string): boolean => {
  const saved = getSavedRoles();
  const isSaved = saved.includes(slug);
  
  if (isSaved) {
    unsaveRole(slug);
  } else {
    saveRole(slug);
  }
  
  return !isSaved;
};

export const isSaved = (slug: string): boolean => {
  return getSavedRoles().includes(slug);
};
