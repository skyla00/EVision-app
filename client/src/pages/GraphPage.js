import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GraphPage.css';
import Header from '../component/Common/Header';
import SideBar from '../component/Common/SideBar';
import Tab from '../component/Common/Tab';
import RechartsGraph from '../component/RechartsGraph';

const GraphPage = () => {
  const [memberGraphData, setMemberGraphData] = useState([]);
  const [companyGraphData, setCompanyGraphData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1주일치 더미 데이터
  const dummyMemberGraphData = [
    { orderDate: "2024-09-01", orderCount: 5, totalSales: 1000000, totalMarginRate: 10 },
    { orderDate: "2024-09-02", orderCount: 7, totalSales: 1500000, totalMarginRate: 12 },
    { orderDate: "2024-09-03", orderCount: 6, totalSales: 1300000, totalMarginRate: 9 },
    { orderDate: "2024-09-04", orderCount: 8, totalSales: 1800000, totalMarginRate: 15 },
    { orderDate: "2024-09-05", orderCount: 4, totalSales: 900000, totalMarginRate: 8 },
    { orderDate: "2024-09-06", orderCount: 9, totalSales: 2000000, totalMarginRate: 16 },
    { orderDate: "2024-09-07", orderCount: 3, totalSales: 700000, totalMarginRate: 7 },
  ];

  const dummyCompanyGraphData = [
    { orderDate: "2024-09-01", orderCount: 50, totalSales: 10000000, totalMarginRate: 11 },
    { orderDate: "2024-09-02", orderCount: 55, totalSales: 12000000, totalMarginRate: 13 },
    { orderDate: "2024-09-03", orderCount: 52, totalSales: 11000000, totalMarginRate: 10 },
    { orderDate: "2024-09-04", orderCount: 60, totalSales: 15000000, totalMarginRate: 16 },
    { orderDate: "2024-09-05", orderCount: 48, totalSales: 9000000, totalMarginRate: 9 },
    { orderDate: "2024-09-06", orderCount: 63, totalSales: 17000000, totalMarginRate: 18 },
    { orderDate: "2024-09-07", orderCount: 45, totalSales: 8000000, totalMarginRate: 8 },
  ];

  useEffect(() => {
    // 더미 데이터를 사용하는 경우
    setMemberGraphData(dummyMemberGraphData);
    setCompanyGraphData(dummyCompanyGraphData);
    setLoading(false);  // 로딩 상태를 false로 변경하여 로딩창을 닫음

    // 실제 데이터를 가져오는 경우
    // fetchGraphData();
  }, []);

  // 실제 데이터 가져오기 함수
  const fetchGraphData = async () => {
    setLoading(true);  // 로딩 시작
    let accessToken = window.localStorage.getItem('accessToken');
    let storedData = JSON.parse(localStorage.getItem('storedData'));
    let memberId = storedData.data.memberId;

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/orders/graph/member-id=${memberId}`,
        {
          headers: {
            Authorization: `${accessToken}`,
          },
        }
      );
      setMemberGraphData(response.data.memberGraph);
      setCompanyGraphData(response.data.companyGraph);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);  // 로딩 종료
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      <Header />
      <SideBar />
      <Tab />
      <div className="graph-info-container">
        <div className="graph-info-header">
          <div className="graph-info-title">그래프 별 조회</div>
          <div className="graph-per">단위 : 일</div>
        </div>
        <div className="graph-grid">
          {/* 사용자 데이터 */}
          <div className="graph1">
            내 최근 거래 건 수
            <RechartsGraph
              data={memberGraphData}
              dataKey="orderCount"
              yAxisLabel="거래 건수"
              displayName="주문 건수"
            />
          </div>
          <div className="graph1">
            내 최근 거래 총 매출액
            <RechartsGraph
              data={memberGraphData}
              dataKey="totalSales"
              yAxisLabel="총 매출액 (₩)"
              displayName="총 매출액"
            />
          </div>
          <div className="graph1">
            내 최근 거래 마진률
            <RechartsGraph
              data={memberGraphData}
              dataKey="totalMarginRate"
              yAxisLabel="마진률 (%)"
              displayName="마진률"
            />
          </div>

          {/* 회사 데이터 */}
          <div className="graph1">
            회사 최근 거래 건수
            <RechartsGraph
              data={companyGraphData}
              dataKey="orderCount"
              yAxisLabel="거래 건수"
              displayName="회사 주문 건수"
            />
          </div>
          <div className="graph1">
            회사 최근 거래 총 매출액
            <RechartsGraph
              data={companyGraphData}
              dataKey="totalSales"
              yAxisLabel="총 매출액 (₩)"
              displayName="회사 총 매출액"
            />
          </div>
          <div className="graph1">
            회사 최근 거래 마진률
            <RechartsGraph
              data={companyGraphData}
              dataKey="totalMarginRate"
              yAxisLabel="마진률 (%)"
              displayName="회사 마진률"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphPage;
