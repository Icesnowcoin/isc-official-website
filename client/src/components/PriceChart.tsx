/**
 * Price Chart Component
 * Displays cryptocurrency prices in a professional chart format
 */

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { trpc } from "@/lib/trpc";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, TrendingUp, TrendingDown } from "lucide-react";

interface PriceChartProps {
  symbols?: string[];
  defaultSymbols?: string[];
}

export default function PriceChart({
  symbols = ["BTC", "ETH", "ISC"],
  defaultSymbols = ["BTC", "ETH", "ISC"],
}: PriceChartProps) {
  const { locale } = useLanguage();
  const [selectedSymbols, setSelectedSymbols] =
    useState<string[]>(defaultSymbols);
  const [chartType, setChartType] = useState<"line" | "bar">("line");
  const [timeRange, setTimeRange] = useState<number>(7); // days

  // Fetch current prices
  const { data: prices, isLoading: pricesLoading } =
    trpc.prices.multiple.useQuery({
      symbols: selectedSymbols,
    });

  // Fetch price history
  const { data: history, isLoading: historyLoading } =
    trpc.prices.history.useQuery({
      symbol: selectedSymbols[0] || "BTC",
      days: timeRange,
    });

  const t = {
    en: {
      title: "Cryptocurrency Prices",
      selectTokens: "Select Tokens",
      chartType: "Chart Type",
      timeRange: "Time Range",
      line: "Line",
      bar: "Bar",
      days7: "7 Days",
      days30: "30 Days",
      days90: "90 Days",
      price: "Price",
      change24h: "24h Change",
      marketCap: "Market Cap",
      volume: "24h Volume",
      loading: "Loading...",
      noData: "No data available",
    },
    zh: {
      title: "加密货币价格",
      selectTokens: "选择代币",
      chartType: "图表类型",
      timeRange: "时间范围",
      line: "折线图",
      bar: "柱状图",
      days7: "7天",
      days30: "30天",
      days90: "90天",
      price: "价格",
      change24h: "24小时涨跌",
      marketCap: "市值",
      volume: "24小时成交量",
      loading: "加载中...",
      noData: "暂无数据",
    },
    vi: {
      title: "Giá Tiền Điện Tử",
      selectTokens: "Chọn Token",
      chartType: "Loại Biểu Đồ",
      timeRange: "Khoảng Thời Gian",
      line: "Đường",
      bar: "Cột",
      days7: "7 Ngày",
      days30: "30 Ngày",
      days90: "90 Ngày",
      price: "Giá",
      change24h: "Thay Đổi 24h",
      marketCap: "Vốn Hóa Thị Trường",
      volume: "Khối Lượng 24h",
      loading: "Đang tải...",
      noData: "Không có dữ liệu",
    },
  };

  const dict = t[locale as keyof typeof t] || t.en;

  const formatPrice = (price: any) => {
    if (!price) return "$0.00";
    const num = typeof price === "string" ? parseFloat(price) : price;
    return `$${num.toFixed(2)}`;
  };

  const formatChange = (change: any) => {
    if (!change) return "0%";
    const num = typeof change === "string" ? parseFloat(change) : change;
    return `${num > 0 ? "+" : ""}${num.toFixed(2)}%`;
  };

  const chartData =
    history?.map((item: any) => ({
      time: new Date(item.timestamp).toLocaleDateString(),
      price: parseFloat(item.price.toString()),
    })) || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold text-foreground">{dict.title}</h2>
        <div className="flex gap-2">
          <Button
            variant={chartType === "line" ? "default" : "outline"}
            size="sm"
            onClick={() => setChartType("line")}
          >
            {dict.line}
          </Button>
          <Button
            variant={chartType === "bar" ? "default" : "outline"}
            size="sm"
            onClick={() => setChartType("bar")}
          >
            {dict.bar}
          </Button>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="flex gap-2">
        {[7, 30, 90].map(days => (
          <Button
            key={days}
            variant={timeRange === days ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange(days)}
          >
            {days === 7 ? dict.days7 : days === 30 ? dict.days30 : dict.days90}
          </Button>
        ))}
      </div>

      {/* Price Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pricesLoading ? (
          <div className="col-span-full flex justify-center items-center py-8">
            <Loader2 className="animate-spin mr-2" />
            {dict.loading}
          </div>
        ) : prices && prices.length > 0 ? (
          prices.map((price: any) => (
            <Card
              key={price.symbol}
              className="border-border/50 hover:border-border transition-colors"
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{price.symbol}</CardTitle>
                  <div
                    className={`flex items-center gap-1 ${parseFloat(price.change24h || 0) >= 0 ? "text-green-500" : "text-red-500"}`}
                  >
                    {parseFloat(price.change24h || 0) >= 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    {formatChange(price.change24h)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">{dict.price}</p>
                  <p className="text-2xl font-bold">
                    {formatPrice(price.price)}
                  </p>
                </div>
                {price.marketCap && (
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {dict.marketCap}
                    </p>
                    <p className="text-sm font-semibold">
                      $
                      {price.marketCap.toLocaleString("en-US", {
                        maximumFractionDigits: 0,
                      })}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            {dict.noData}
          </div>
        )}
      </div>

      {/* Chart */}
      {historyLoading ? (
        <Card className="border-border/50 h-96 flex items-center justify-center">
          <Loader2 className="animate-spin mr-2" />
          {dict.loading}
        </Card>
      ) : chartData.length > 0 ? (
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>
              {selectedSymbols[0]} {dict.price}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              {chartType === "line" ? (
                <LineChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.1)"
                  />
                  <XAxis dataKey="time" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0,0,0,0.8)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#0ea5e9"
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              ) : (
                <BarChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.1)"
                  />
                  <XAxis dataKey="time" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0,0,0,0.8)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="price"
                    fill="#0ea5e9"
                    isAnimationActive={false}
                  />
                </BarChart>
              )}
            </ResponsiveContainer>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-border/50 h-96 flex items-center justify-center">
          <p className="text-muted-foreground">{dict.noData}</p>
        </Card>
      )}
    </div>
  );
}
