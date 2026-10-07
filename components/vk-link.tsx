import type { ReactNode } from "react";
import { vkUrl } from "@/lib/site";

export function VkLink({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <a className={className} href={vkUrl}>
      {children}
    </a>
  );
}
