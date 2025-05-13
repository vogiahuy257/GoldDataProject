// components/gold-price-chart-card.tsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from 'recharts';
import { Card, CardContent } from '@/components/ui/card';

interface GoldPrice {
  source: string;
  date: string | null;
  time: string | null;
  buy_price: string | null;
  sell_price: string | null;
}

interface Props {
  title: string;
  data: GoldPrice[];
}

function parseNumber(str: string | null): number | null {
  if (!str) return null;
  return parseFloat(str.replace(/[^0-9.-]+/g, '').replace(',', ''));
}

export function GoldPriceChartCard({ title, data }: Props) {
  // Chuyển đổi dữ liệu sang dạng phù hợp với biểu đồ
  const chartData = data
    .filter((d) => d.time && d.buy_price && d.sell_price)
    .map((d) => ({
      time: d.time,
      buy: parseNumber(d.buy_price),
      sell: parseNumber(d.sell_price),
    }));

  const formatYAxis = (value: number) => {
    if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)} tỷ`;
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)} tr`;
    if (value >= 1_000) return `${(value / 1_000).toFixed(1)}k`;
    return value.toString();
  };

  return (
    <Card className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4">
      <CardContent className="flex h-full flex-col gap-2">
        <h2 className="text-lg font-semibold text-center mb-2">{title}</h2>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis
              tickFormatter={formatYAxis}
              tickCount={10}
              domain={["auto", "auto"]}
            />
            <Tooltip formatter={(value: number) => `${value.toLocaleString()} VND`} />
            <Legend />
            <Line
              type="monotone"
              dataKey="buy"
              stroke="#10B981"
              name="Giá mua"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="sell"
              stroke="#EF4444"
              name="Giá bán"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
