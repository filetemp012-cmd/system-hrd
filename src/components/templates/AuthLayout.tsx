import { ReactNode } from 'react';
import { GraduationCap } from 'lucide-react';

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-primary/10 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <div className="w-20 h-20 mx-auto mb-4">
            <img src="/logo.jpg" alt="Logo" className="w-full h-full object-contain rounded-2xl" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">System Administrasi Pegawai</h1>
        </div>
        <div className="bg-card rounded-2xl shadow-soft border border-border/50 p-6 md:p-8 animate-fade-in">
          {children}
        </div>
        <div className="text-center text-sm text-muted-foreground mt-6 space-y-1">
          <p className="font-semibold text-foreground/80">Dikembangkan Oleh:</p>
          <p>Fazha Lintang Utami</p>
          <p>NIM 21802241010</p>
          <p>S1-Pendidikan Administrasi Perkantoran</p>
        </div>
      </div>
    </div>
  );
}
