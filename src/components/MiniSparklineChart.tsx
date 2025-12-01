import { AreaChart, Area, ResponsiveContainer } from "recharts";
interface MiniSparklineChartProps {
  data: number[];
  color?: string;
}
export const MiniSparklineChart = ({
  data,
  color = "hsl(var(--primary))"
}: MiniSparklineChartProps) => {
  const chartData = data.map((value, index) => ({
    index,
    value
  }));
  
  // Generate unique gradient ID based on color
  const gradientId = `gradient-${color.replace(/[^a-zA-Z0-9]/g, '')}`;
  
  return <ResponsiveContainer width="100%" height={60}>
      <AreaChart data={chartData} margin={{
      top: 5,
      right: 0,
      left: 0,
      bottom: -2
    }} className="border-none">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor="hsl(var(--card))" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="value" stroke={color} strokeWidth={3} fill={`url(#${gradientId})`} isAnimationActive={false} fillOpacity={1} />
      </AreaChart>
    </ResponsiveContainer>;
};