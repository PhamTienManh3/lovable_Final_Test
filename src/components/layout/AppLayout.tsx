import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";

interface AppLayoutProps {
  children: React.ReactNode;
  breadcrumb?: React.ReactNode;
}

export const AppLayout = ({ children, breadcrumb }: AppLayoutProps) => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <AppHeader breadcrumb={breadcrumb} />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};