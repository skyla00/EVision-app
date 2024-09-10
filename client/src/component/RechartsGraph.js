import {
  Area,
    AreaChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
  } from "recharts";

  const RechartsGraph = ({data}) => {
    return (
      <>
        <AreaChart width={340} height={280} data={data}>
          <Area type="monotone" dataKey="price" stroke="#ec9090" fill="#f7bdbd" strokeWidth={3} />
          <YAxis />
          <XAxis dataKey="name" />
          <Tooltip />
          <Legend />
        </AreaChart>
      </>
    );
  };
  
  export default RechartsGraph;