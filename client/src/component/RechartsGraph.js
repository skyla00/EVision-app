import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const RechartsGraph = ({ data, dataKey, xAxisKey = "orderDate", yAxisLabel, displayName }) => {
  return (
    <>
      <AreaChart width={340} height={280} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <Area
          type="monotone"
          dataKey={dataKey} // 실제 데이터를 표시하는 키
          name={displayName} // 범례와 툴팁에 표시될 이름
          stroke="#ec9090"
          fill="#f7bdbd"
          strokeWidth={3}
        />
        <XAxis dataKey={xAxisKey} /> {/* X축을 orderDate로 설정 */}
        <YAxis label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />
      </AreaChart>
    </>
  );
};

export default RechartsGraph;
