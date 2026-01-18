import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
  iconColor?: string;
  iconBgColor?: string;
}

export function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  description,
  className,
  iconColor = 'text-primary',
  iconBgColor = 'bg-primary/10'
}: StatCardProps) {
  return (
    <div className={cn(
      "bg-card rounded-lg p-6 shadow-soft border border-border/50 hover-lift",
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        <div className={cn("p-3 rounded-full", iconBgColor)}>
          <Icon className={cn("h-6 w-6", iconColor)} />
        </div>
      </div>
    </div>
  );
}
