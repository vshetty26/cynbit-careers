interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "outline";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  const variants = {
    default: "bg-black text-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
    secondary: "bg-yellow-300 text-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
    outline: "bg-white border-4 border-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-xs font-black uppercase tracking-wider ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
