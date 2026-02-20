"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  href: string;
  children: ReactNode;
}
export default function ClientLink({ href, children }: Props) {
  const pathname = usePathname();
  const currenRoute = pathname == href;
  return (
    <Link
      href={href}
      className={`flex items-center gap-4 py-2 rounded-md hover:bg-primary transition-colors last:mt-auto ${currenRoute ? "bg-primary" : ""}`}
    >
      {children}
    </Link>
  );
}
