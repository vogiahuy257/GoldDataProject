import * as React from "react";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useGoldPriceApi } from "../hooks/useGoldPriceApi";

// Interface dữ liệu
interface GoldPrice {
  source: string; // Hãng vàng
  date: string | null; // Ngày
  time: string | null; // Giờ
  buy_price: string | null; // Giá mua
  sell_price: string | null; // Giá bán
}

// Cấu hình màu cho từng hãng
const chartColors: Record<string, string> = {
  SJC: "#3b82f6",
  DOJI: "#ef4444",
  PNJ: "#10b981",
};

const SOURCES = ["SJC", "DOJI", "PNJ"];

export function GoldPriceChart() {
  const { getAll, loading, error } = useGoldPriceApi();
  const [data, setData] = React.useState<GoldPrice[]>([]);
  const [timeRange, setTimeRange] = React.useState<string>("30d");
  const [priceType, setPriceType] = React.useState<"buy" | "sell">("buy");
  const [apiError, setApiError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getAll();
        setData(fetchedData);
        setApiError(null);
      } catch (err: any) {
        setApiError(err.message || "Đã xảy ra lỗi khi tải dữ liệu");
      }
    };

    fetchData();
  }, []);

// Tối ưu logic tạo dữ liệu biểu đồ
const chartData = React.useMemo(() => {
  const now = new Date();
  const days = timeRange === "7d" ? 7 : timeRange === "90d" ? 90 : 30;
  const startDate = new Date(now);
  startDate.setDate(now.getDate() - days);

  const filtered = data.filter(
    (item) =>
      item.date &&
      item.time &&
      SOURCES.includes(item.source) &&
      !isNaN(new Date(`${item.date} ${item.time}`).getTime()) &&
      new Date(`${item.date} ${item.time}`) >= startDate
  );

  filtered.sort((a, b) => {
    const tA = new Date(`${a.date} ${a.time}`).getTime();
    const tB = new Date(`${b.date} ${b.time}`).getTime();
    return tA - tB;
  });

  const priceBySource: Record<string, number> = Object.fromEntries(
    SOURCES.map((s) => [s, 0])
  );

  const timeline = filtered.map((item) => `${item.date} ${item.time}`);
  const uniqueTimestamps = [...new Set(timeline)].sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  let previousPrices: Record<string, number> = { ...priceBySource };

  return uniqueTimestamps.map((ts) => {
    const [date, time] = ts.split(" ");
    const updates = filtered.filter((item) => item.date === date && item.time === time);

    updates.forEach((u) => {
      const val =
        parseFloat((priceType === "buy" ? u.buy_price : u.sell_price)?.replace(/,/g, "") || "0");
      if (val > 0) priceBySource[u.source] = val;
    });

    // Không tính toán sự thay đổi giá nữa, chỉ lấy giá hiện tại
    previousPrices = { ...priceBySource };

    return {
      date,
      time,
      timestamp: new Date(ts).getTime(),
      ...priceBySource,
    };
  });
}, [data, priceType, timeRange]);



// Format ngày hiển thị trên trục X
const formatXAxis = (dateStr: string) => {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "";
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
  });
};


  // Custom tooltip formatter
  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded shadow-md">
          <p className="font-medium">{`${dataPoint.date} ${dataPoint.time}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value.toLocaleString()}₫`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b pb-4">
        <div>
          <CardTitle>Biểu đồ Giá Vàng</CardTitle>
          <CardDescription>
            Hiển thị giá {priceType === "buy" ? "mua" : "bán"} từ 3 hãng
          </CardDescription>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select
            value={priceType}
            onValueChange={(val) => setPriceType(val as "buy" | "sell")}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Loại giá" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="buy">Giá mua</SelectItem>
              <SelectItem value="sell">Giá bán</SelectItem>
            </SelectContent>
          </Select>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Khoảng thời gian" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 ngày</SelectItem>
              <SelectItem value="30d">30 ngày</SelectItem>
              <SelectItem value="90d">90 ngày</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="pt-4 px-2 sm:px-6">
        {loading ? (
          <p>Đang tải dữ liệu...</p>
        ) : apiError ? (
          <p>Lỗi: {apiError}</p>
        ) : chartData.length === 0 ? (
          <p>Không có dữ liệu trong khoảng thời gian đã chọn</p>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatXAxis}
                minTickGap={22}
              />
              <YAxis
                tickFormatter={(v) => `${v.toLocaleString()}₫`}
                domain={[0, (dataMax:any) => dataMax * 1.1]} // Thêm khoảng 10% trên giá trị tối đa
                />

              <Tooltip content={customTooltip} />
              {SOURCES.map((source) => (
                <Area
                  key={source}
                  type="monotone"
                  dataKey={source}
                  stroke={chartColors[source]}
                  fill={chartColors[source]}
                  fillOpacity={0.2}
                  name={`${source} - ${priceType === "buy" ? "Mua" : "Bán"}`}
                  connectNulls
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
