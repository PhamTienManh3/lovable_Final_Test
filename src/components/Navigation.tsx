import { NavLink } from "./NavLink";
import { Users, Briefcase } from "lucide-react";

export const Navigation = () => {
  return (
    <nav className="bg-card border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16 gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">TM</span>
            </div>
            <h1 className="font-bold text-lg">Teacher Manager</h1>
          </div>
          
          <div className="flex gap-1">
            <NavLink
              to="/teachers"
              className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent"
              activeClassName="bg-accent text-accent-foreground"
            >
              <Users className="h-4 w-4" />
              Giáo viên
            </NavLink>
            <NavLink
              to="/work-positions"
              className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent"
              activeClassName="bg-accent text-accent-foreground"
            >
              <Briefcase className="h-4 w-4" />
              Vị trí công tác
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};
