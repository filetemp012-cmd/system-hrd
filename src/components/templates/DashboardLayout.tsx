import { ReactNode } from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/organisms/AppSidebar';
import { AppHeader } from '@/components/organisms/AppHeader';

interface DashboardLayoutProps {
  children: ReactNode;
  role?: 'pegawai' | 'bos';
}

export function DashboardLayout({ children, role = 'pegawai' }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar role={role} />
        <SidebarInset className="flex-1">
          <div className="flex items-center gap-2 px-4 py-2 md:hidden border-b border-border bg-card">
            <SidebarTrigger />
            <span className="font-semibold text-foreground">SisAdmin</span>
          </div>
          <AppHeader />
          <main className="flex-1 p-4 md:p-6 lg:p-8 animate-fade-in">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
