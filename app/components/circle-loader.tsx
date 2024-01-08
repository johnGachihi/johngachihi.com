import clsx from "clsx";

export function CircleLoader({ color = "primary", className }: {
  color?: "primary" | "onPrimary",
  className?: string
}) {
  return (
    <div
      className={clsx(className,
        `animate-spin rounded-full h-6 w-6 border-2`,
        color === "primary"
          ? "border-t-primary border-r-primary border-b-primary/25 border-l-primary/25"
          : "border-t-onPrimary border-r-onPrimary border-b-onPrimary/25 border-l-onPrimary/25"
      )} />
  );
}