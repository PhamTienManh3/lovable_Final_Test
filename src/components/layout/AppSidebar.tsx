import { useState } from "react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  BarChart3,
  ChevronDown,
  ChevronRight,
  GraduationCap,
  Users,
  Database,
  Briefcase,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  to?: string;
  children?: { label: string; to: string }[];
  isExpanded?: boolean;
  onToggle?: () => void;
}

const MenuItem = ({ icon, label, to, children, isExpanded, onToggle }: MenuItemProps) => {
  const location = useLocation();
  const hasChildren = children && children.length > 0;
  const isChildActive = children?.some(child => location.pathname === child.to);
  const isActive = to ? location.pathname === to : isChildActive;

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={onToggle}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-colors",
            isActive
              ? "bg-sidebar-accent text-sidebar-primary"
              : "text-sidebar-foreground hover:bg-sidebar-accent/50"
          )}
        >
          {icon}
          <span className="flex-1 text-left">{label}</span>
          {isExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
        {isExpanded && (
          <div className="ml-4 mt-1 space-y-1 border-l-2 border-sidebar-border pl-3">
            {children.map((child) => (
              <NavLink
                key={child.to}
                to={child.to}
                className="block px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 rounded-md transition-colors"
                activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
              >
                {child.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <NavLink
      to={to!}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-colors",
        "text-sidebar-foreground hover:bg-sidebar-accent/50"
      )}
      activeClassName="bg-sidebar-accent text-sidebar-primary"
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
};

export const AppSidebar = () => {
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    data: true,
  });

  const toggleMenu = (key: string) => {
    setExpandedMenus(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <aside className="w-56 bg-sidebar border-r border-sidebar-border flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-foreground">School System</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <MenuItem
          icon={<BarChart3 className="h-4 w-4" />}
          label="Thống kê"
          to="/statistics"
        />
        
        <MenuItem
          icon={<BookOpen className="h-4 w-4" />}
          label="Lớp học"
          to="/classes"
        />

        <MenuItem
          icon={<Users className="h-4 w-4" />}
          label="Học sinh"
          to="/students"
        />

        <MenuItem
          icon={<GraduationCap className="h-4 w-4" />}
          label="Giáo viên"
          to="/teachers"
        />

        <MenuItem
          icon={<Database className="h-4 w-4" />}
          label="Dữ liệu"
          isExpanded={expandedMenus.data}
          onToggle={() => toggleMenu("data")}
          children={[
            { label: "Vị trí công tác", to: "/work-positions" },
          ]}
        />
      </nav>
    </aside>
  );
};