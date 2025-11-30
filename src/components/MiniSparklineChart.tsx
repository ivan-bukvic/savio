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
  return <ResponsiveContainer width="100%" height={60}>
      <AreaChart data={chartData} margin={{
      top: 5,
      right: 0,
      left: 0,
      bottom: 5
    }} className="border-none">
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.4} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="value" stroke={color} strokeWidth={3} fill={`url(#gradient-${color})`} isAnimationActive={false} fillOpacity={1} />
      </AreaChart>
    </ResponsiveContainer>;
};