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
        <AreaChart width={600} height={300} data={data}>
          <Area type="monotone" dataKey="price" stroke="#FE2E2E" fill="#F6CECE" strokeWidth={3} />
          <YAxis />
          <XAxis dataKey="name" />
          <Tooltip />
          <Legend />
        </AreaChart>
      </>
    );
  };
  
  export default RechartsGraph;