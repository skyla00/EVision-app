import React from "react";
import {
  ComposedChart,
  Area,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { format } from "date-fns";

// 큰 숫자를 포맷팅하는 함수
const formatNumber = (number) => {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'M';
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'K';
  } else {
    return number;
  }
};

const RechartsGraph = ({ data, areaDataKey, barDataKey, xAxisKey = "orderDate", yAxisLabel, areaDisplayName, barDisplayName }) => {

  // X축 날짜를 포맷팅하는 함수 (MM/DD 형식으로)
  const formatXAxis = (tickItem) => {
    return format(new Date(tickItem), "MM/dd");
  };

  return (
    <ComposedChart width={480} height={280} data={data}>
      <CartesianGrid strokeDasharray="3 3" />

      {/* Bar 차트 설정 (주문 건수) */}
      {barDataKey && (
        <Bar
          dataKey={barDataKey}
          name={barDisplayName}
          fill="#62a68b"
        />
      )}

      {/* Area 차트 설정 (총 매출액, 마진율) */}
      {areaDataKey && (
        <Area
          type="monotone"
          dataKey={areaDataKey}
          name={areaDisplayName}
          stroke="#ec9090"
          fill="#f7bdbd"
          strokeWidth={3}
        />
      )}

      <XAxis
        dataKey={xAxisKey}
        tickFormatter={formatXAxis}
        tick={{ fontSize: 12 }}
        interval="preserveStartEnd"
      />
      <YAxis
        label={{ value: yAxisLabel, angle: -90, position: 'insideLeft', fontSize: 12 }}
        tick={{ fontSize: 12 }}
        tickFormatter={formatNumber}
      />
      <Tooltip formatter={formatNumber} />
      <Legend />
    </ComposedChart>
  );
};

export default RechartsGraph;
