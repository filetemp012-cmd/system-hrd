import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type StatusType = 
  | 'sudahDinilai' 
  | 'belumDinilai' 
  | 'belumDikumpulkan' 
  | 'terlambat' 
  | 'selesai' 
  | 'menunggu' 
  | 'belum'
  | 'aktif'
  | 'cuti'
  | 'tidak-aktif';

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
  className?: string;
}

const statusConfig: Record<StatusType, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline'; className: string }> = {
  sudahDinilai: {
    label: 'Sudah Dinilai',
    variant: 'default',
    className: 'bg-success text-success-foreground hover:bg-success/90',
  },
  belumDinilai: {
    label: 'Belum Dinilai',
    variant: 'secondary',
    className: 'bg-warning text-warning-foreground hover:bg-warning/90',
  },
  belumDikumpulkan: {
    label: 'Belum Dikumpulkan',
    variant: 'outline',
    className: 'border-muted-foreground/30 text-muted-foreground',
  },
  terlambat: {
    label: 'Terlambat',
    variant: 'destructive',
    className: '',
  },
  selesai: {
    label: 'Selesai',
    variant: 'default',
    className: 'bg-success text-success-foreground hover:bg-success/90',
  },
  menunggu: {
    label: 'Menunggu',
    variant: 'secondary',
    className: 'bg-warning text-warning-foreground hover:bg-warning/90',
  },
  belum: {
    label: 'Belum',
    variant: 'outline',
    className: 'border-muted-foreground/30 text-muted-foreground',
  },
  aktif: {
    label: 'Aktif',
    variant: 'default',
    className: 'bg-success text-success-foreground hover:bg-success/90',
  },
  cuti: {
    label: 'Cuti',
    variant: 'secondary',
    className: 'bg-warning text-warning-foreground hover:bg-warning/90',
  },
  'tidak-aktif': {
    label: 'Tidak Aktif',
    variant: 'outline',
    className: 'border-muted-foreground/30 text-muted-foreground',
  },
};

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge 
      variant={config.variant} 
      className={cn(config.className, className)}
    >
      {label || config.label}
    </Badge>
  );
}
