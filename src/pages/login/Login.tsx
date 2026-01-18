import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '@/components/templates/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { dataPegawai } from '@/data/dummyData';
import { useToast } from '@/hooks/use-toast';
import { LogIn, User, Lock, Users, Briefcase } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeRole, setActiveRole] = useState<'pegawai' | 'bos'>('pegawai');
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (activeRole === 'bos') {
      // Boss login
      if (username === 'bos' && password === 'bos123') {
        login({ 
          id: 'bos-1', 
          username: 'bos', 
          nama: 'Direktur Utama', 
          role: 'bos' as any 
        });
        navigate('/bos/dashboard');
        toast({
          title: "Selamat datang!",
          description: "Halo, Direktur Utama",
        });
      } else {
        toast({
          title: "Login Gagal",
          description: "Username atau password salah",
          variant: "destructive",
        });
      }
    } else {
      // Pegawai login
      const pegawai = dataPegawai.find(p => p.username === username);
      if (pegawai && password === 'pegawai123') {
        login(pegawai);
        navigate('/pegawai/dashboard');
        toast({
          title: "Selamat datang!",
          description: `Halo, ${pegawai.nama}`,
        });
      } else {
        toast({
          title: "Login Gagal",
          description: "Username atau password salah",
          variant: "destructive",
        });
      }
    }

    setIsLoading(false);
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-foreground">Masuk ke Akun</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Silakan pilih peran dan masukkan kredensial Anda
          </p>
        </div>

        <Tabs value={activeRole} onValueChange={(v) => setActiveRole(v as 'pegawai' | 'bos')} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pegawai" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Pegawai
            </TabsTrigger>
            <TabsTrigger value="bos" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Bos
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                className="pl-10"
                required
              />
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              Memproses...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              Masuk sebagai {activeRole === 'bos' ? 'Bos' : 'Pegawai'}
            </span>
          )}
        </Button>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <p className="text-xs font-medium text-muted-foreground mb-2">Demo Akun:</p>
          <div className="space-y-1 text-xs text-muted-foreground">
            <p><strong>Pegawai:</strong> andi.pegawai / pegawai123</p>
            <p><strong>Bos:</strong> bos / bos123</p>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
}
