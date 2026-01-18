import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LogOut, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSidebar } from '@/components/ui/sidebar';

export function AppHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toggleSidebar } = useSidebar();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="hidden md:block">
            <h2 className="text-sm font-medium text-muted-foreground">
              Selamat datang, {user?.role === 'bos' ? 'Fazha Lintang' : user?.nama}
            </h2>
            <p className="text-base font-semibold text-foreground">
              {user?.role === 'bos' ? 'Direktur Utama' : 'HRD'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border-2 border-primary/20">
              <AvatarFallback className="bg-primary/10 text-primary font-medium">
                {user?.nama ? getInitials(user.nama) : 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-foreground">{user?.role === 'bos' ? 'Fazha Lintang' : user?.nama}</p>
              <p className="text-xs text-muted-foreground capitalize">{user?.role === 'bos' ? 'Direktur Utama' : 'HRD'}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="text-muted-foreground hover:text-destructive"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
