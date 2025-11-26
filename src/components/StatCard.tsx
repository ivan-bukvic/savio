import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  chart?: React.ReactNode;
}

export const StatCard = ({ title, value, icon: Icon, trend, chart }: StatCardProps) => {
  return (
    <Card className="card-shadow hover:card-shadow-hover transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <h3 className="text-2xl font-bold text-foreground mt-1">{value}</h3>
            </div>
          </div>
          
          {trend && (
            <span
              className={cn(
                "text-sm font-medium px-2 py-1 rounded",
                trend.isPositive
                  ? "text-success bg-success/10"
                  : "text-destructive bg-destructive/10"
              )}
            >
              {trend.value}
            </span>
          )}
        </div>
        
        {chart && <div className="mt-4">{chart}</div>}
      </CardContent>
    </Card>
  );
};
