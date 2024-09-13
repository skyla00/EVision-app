import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { format } from 'date-fns'; // date-fns 라이브러리를 사용하여 날짜 포맷팅

// 큰 숫자를 포맷팅하는 함수
const formatNumber = (number) => {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'M'; // 백만 단위로 변환
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'K'; // 천 단위로 변환
  } else {
    return number; // 작은 숫자는 그대로 반환
  }
};

const RechartsGraph = ({ data, dataKey, xAxisKey = "orderDate", yAxisLabel, displayName }) => {
  
  // X축 날짜를 포맷팅하는 함수 (MM/DD 형식으로)
  const formatXAxis = (tickItem) => {
    return format(new Date(tickItem), "MM/dd"); // 날짜를 MM/DD 형식으로 변환
  };
  
  return (
    <>
      <AreaChart width={340} height={280} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <Area
          type="monotone"
          dataKey={dataKey}  // 실제 데이터를 표시하는 키
          name={displayName}  // 범례와 툴팁에 표시될 이름
          stroke="#ec9090"
          fill="#f7bdbd"
          strokeWidth={3}
        />
         <XAxis
          dataKey={xAxisKey}  // X축에 사용할 데이터 키 (orderDate)
          tickFormatter={formatXAxis}  // X축 날짜 포맷터
          tick={{ fontSize: 12 }}  // X축 레이블 폰트 크기
          interval="preserveStartEnd"  // 처음과 마지막 날짜만 표시 (필요시 'auto'나 숫자로 변경 가능)
        />
        <YAxis 
          label={{ value: yAxisLabel, angle: -90, position: 'insideLeft', fontSize: 12 }}  // Y축 레이블 설정
          tick={{ fontSize: 12 }}  // Y축 레이블 폰트 크기
          tickFormatter={formatNumber}  // Y축 숫자 포맷터
        />
        <Tooltip formatter={formatNumber} /> {/* 툴팁에서 숫자를 포맷팅해서 표시 */}
        <Legend />
      </AreaChart>
    </>
  );
};

export default RechartsGraph;
