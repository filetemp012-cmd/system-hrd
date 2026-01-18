import { NavLink } from '@/components/NavLink';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Building2
} from 'lucide-react';

const menuPegawai = [
  { title: 'Dashboard', url: '/pegawai/dashboard', icon: LayoutDashboard },
  { title: 'Kelola Pegawai', url: '/pegawai/kelola', icon: Users },
  { title: 'Laporan', url: '/pegawai/laporan', icon: BarChart3 },
];

const menuBos = [
  { title: 'Dashboard', url: '/bos/dashboard', icon: LayoutDashboard },
];

interface AppSidebarProps {
  role?: 'pegawai' | 'bos';
}

export function AppSidebar({ role = 'pegawai' }: AppSidebarProps) {
  const menu = role === 'bos' ? menuBos : menuPegawai;
  const menuLabel = role === 'bos' ? 'Menu Eksekutif' : 'Menu Pegawai';

  return (
    <Sidebar className="border-r-0">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
            <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <div className="overflow-hidden">
            <h1 className="font-bold text-sidebar-foreground text-sm leading-tight text-wrap">System Administrasi</h1>
            <p className="text-xs text-sidebar-foreground/70">Pegawai</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/60 uppercase text-xs tracking-wider px-3">
            {menuLabel}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menu.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground smooth-transition"
                      activeClassName="bg-sidebar-accent text-sidebar-foreground font-medium"
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border gap-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 bg-white rounded-lg p-1.5 flex items-center justify-center shadow-sm">
            <img src="/logo-uny.png" alt="UNY" className="w-full h-full object-contain" />
          </div>
          <div className="h-12 w-auto bg-white rounded-lg p-1.5 flex items-center justify-center shadow-sm px-2">
            <img src="/logo-fe.png" alt="FE" className="h-full w-auto object-contain" />
          </div>
        </div>

        <div className="space-y-3 text-center">
          <div className="space-y-0.5">
            <p className="text-[10px] uppercase tracking-wider text-sidebar-foreground/60 font-medium">Pengembang</p>
            <p className="text-xs font-semibold text-sidebar-foreground">Fazha Lintang Utami</p>
          </div>

          <div className="space-y-0.5">
            <p className="text-[10px] uppercase tracking-wider text-sidebar-foreground/60 font-medium">Dosen Pembimbing</p>
            <p className="text-xs font-semibold text-sidebar-foreground">Muslikhah Dwihartanti,<br />S.I.P., M.Pd</p>
          </div>
        </div>

        <p className="text-[10px] text-sidebar-foreground/40 text-center pt-2 border-t border-sidebar-border/50">
          © 2024 System Pegawai v1.0
        </p>
      </SidebarFooter>
    </Sidebar >
  );
}
