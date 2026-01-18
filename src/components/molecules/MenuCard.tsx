import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MenuCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  to: string;
  color?: 'primary' | 'secondary' | 'accent';
  className?: string;
}

const colorStyles = {
  primary: 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground group-hover:bg-primary group-hover:text-primary-foreground',
  accent: 'bg-accent text-accent-foreground group-hover:bg-primary group-hover:text-primary-foreground',
};

export function MenuCard({ 
  title, 
  description, 
  icon: Icon, 
  to,
  color = 'primary',
  className 
}: MenuCardProps) {
  return (
    <Link 
      to={to} 
      className={cn(
        "group block bg-card rounded-xl p-6 shadow-soft border border-border/50 hover-lift cursor-pointer",
        className
      )}
    >
      <div className={cn(
        "w-14 h-14 rounded-xl flex items-center justify-center mb-4 smooth-transition",
        colorStyles[color]
      )}>
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary smooth-transition">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </Link>
  );
}
