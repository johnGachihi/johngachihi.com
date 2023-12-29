import clsx from "clsx";

export function CircleLoader({ color = "primary", className }: {
  color?: "primary" | "onPrimary",
  className?: string
}) {
  return (
    <div
      className={clsx(className, `animate-spin rounded-full h-6 w-6 border-2 border-t-${color} border-r-${color} border-b-${color}/25 border-l-${color}/25`)} />
  );
}