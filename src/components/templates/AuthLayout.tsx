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
          <div className="w-16 h-16 mx-auto rounded-2xl bg-primary flex items-center justify-center mb-4 shadow-glow">
            <GraduationCap className="h-9 w-9 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">SisAdmin</h1>
          <p className="text-muted-foreground mt-1">Sistem Administrasi Sekolah</p>
        </div>
        <div className="bg-card rounded-2xl shadow-soft border border-border/50 p-6 md:p-8 animate-fade-in">
          {children}
        </div>
        <p className="text-center text-sm text-muted-foreground mt-6">
          © 2024 Sistem Administrasi Sekolah
        </p>
      </div>
    </div>
  );
}
