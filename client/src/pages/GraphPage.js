import './GraphPage.css';
import Header from '../component/Header';
import SideBar from '../component/SideBar';
import Tab from '../component/Tab';
import RechartsGraph from '../component/RechartsGraph';

const GraphPage = () => {

    const data1 = [
        { name: "product1", price: 4799000 },
        { name: "product2", price: 449000 },
        { name: "product3", price: 6190000 },
        { name: "product4", price: 1199000 },
    ];

    const data2 = [
        { name: "product1", price: 3899000 },
        { name: "product2", price: 559000 },
        { name: "product3", price: 7390000 },
        { name: "product4", price: 1299000 },
    ];

    const data3 = [
        { name: "product1", price: 2799000 },
        { name: "product2", price: 349000 },
        { name: "product3", price: 5190000 },
        { name: "product4", price: 1099000 },
    ];

    const data4 = [
        { name: "product1", price: 2799000 },
        { name: "product2", price: 349000 },
        { name: "product3", price: 5190000 },
        { name: "product4", price: 1099000 },
    ];

    const data5 = [
        { name: "product1", price: 2799000 },
        { name: "product2", price: 349000 },
        { name: "product3", price: 5190000 },
        { name: "product4", price: 1099000 },
    ];

    const data6 = [
        { name: "product1", price: 2799000 },
        { name: "product2", price: 349000 },
        { name: "product3", price: 5190000 },
        { name: "product4", price: 1099000 },
    ];

    return (
        <div className="app">
            <Header />
            <SideBar />
            <Tab />
            <div className="graph-info-container">
                <div className="graph-info-header">
                    <div className="graph-info-title">그래프 별 조회</div>
                    <div className="graph-per">단위 : 주</div>
                </div>
                <div className="graph-grid">
                    <div className="graph1"> 내 최근 거래 건 수
                        <div style={{ marginBottom: '16px', fontWeight: 'bold'}} />
                        <RechartsGraph data={data1} />
                    </div>
                    <div className="graph1"> 내 최근 거래 총 매출액
                        <div style={{ marginBottom: '16px', fontWeight: 'bold'}} />
                        <RechartsGraph data={data2} />
                    </div>
                    <div className="graph1"> 내 최근 거래 마진률
                        <div style={{ marginBottom: '16px', fontWeight: 'bold'}} />
                        <RechartsGraph data={data3} />
                    </div>
                    <div className="graph1"> 회사 최근 거래 건수
                        <div style={{ marginBottom: '16px', fontWeight: 'bold'}} />
                        <RechartsGraph data={data4} />
                    </div>
                    <div className="graph1"> 회사 최근 거래 총 매출액
                        <div style={{ marginBottom: '16px', fontWeight: 'bold'}} />
                        <RechartsGraph data={data5} />
                    </div>
                    <div className="graph1"> 회사 최근 거래 마진률
                        <div style={{ marginBottom: '16px', fontWeight: 'bold'}} />
                        <RechartsGraph data={data6} />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default GraphPage;