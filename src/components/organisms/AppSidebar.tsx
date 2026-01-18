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
          <div className="w-10 h-10 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <Building2 className="h-6 w-6 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-sidebar-foreground text-lg">SisAdmin</h1>
            <p className="text-xs text-sidebar-foreground/70">Sistem Administrasi</p>
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

      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <p className="text-xs text-sidebar-foreground/50 text-center">
          © 2024 SisAdmin v1.0
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
