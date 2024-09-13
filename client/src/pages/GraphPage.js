import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './GraphPage.css';
import Header from '../component/Common/Header';
import SideBar from '../component/Common/SideBar';
import Tab from '../component/Common/Tab';
import RechartsGraph from '../component/RechartsGraph';
import { AuthContext } from '../auth/AuthContext';  // AuthContext 추가

const GraphPage = () => {
  const [memberGraphData, setMemberGraphData] = useState([]);
  const [companyGraphData, setCompanyGraphData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useContext(AuthContext);  // AuthContext에서 userInfo 받아오기

  useEffect(() => {
    // 사용자 정보가 없으면 서버로부터 사용자 정보를 가져올 필요 있음
    if (!userInfo) {
      console.log('사용자 정보가 없습니다.');
      setLoading(false);
      return;
    }

    const fetchGraphData = async () => {
      setLoading(true);  // 로딩 시작
      let accessToken = localStorage.getItem('accessToken');
      let memberId = userInfo.data.memberId;

      try {
        const response = await axios.get(
          process.env.REACT_APP_API_URL + `orders/graph?member-id=${memberId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setMemberGraphData(response.data.memberGraph);
        setCompanyGraphData(response.data.companyGraph);
      } catch (error) {
        console.error('그래프 데이터를 가져오는 중 에러 발생:', error);
      } finally {
        setLoading(false);  // 로딩 종료
      }
    };

    fetchGraphData();
  }, [userInfo]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="app">
      <Header />
      <SideBar />
      <Tab />
      <div className="graph-info-container">
        <div className="graph-info-header">
          <div className="graph-info-title">최근 한달 기준</div>
          <div className="graph-per">단위 : 일</div>
        </div>
        <div className="graph-grid">
          {/* 사용자 데이터 */}
          <div className="graph1">
            내 거래 건 수
            <RechartsGraph
              data={memberGraphData}
              dataKey="orderCount"
              yAxisLabel="거래 건수 (EA)"
              displayName="주문 건수"
            />
          </div>
          <div className="graph1">
            내 거래 총 매출액
            <RechartsGraph
              data={memberGraphData}
              dataKey="totalSales"
              yAxisLabel="총 매출액 (₩)"
              displayName="총 매출액"
            />
          </div>
          <div className="graph1">
            내 거래 마진률
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
              yAxisLabel="거래 건수 (EA)"
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
