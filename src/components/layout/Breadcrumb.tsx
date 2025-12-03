import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav className="flex items-center gap-1 text-sm">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-1">
          {index > 0 && (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
          {item.href ? (
            <Link
              to={item.href}
              className="text-primary hover:underline font-medium"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-muted-foreground">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
};