import './GraphPage.css';
import Header from '../component/Header';
import SideBar from '../component/SideBar';
import Tab from '../component/Tab';
import RechartsGraph from '../component/RechartsGraph';

const GraphPage = () => {

    const data = [
        {
            name: "product1",
            price: 4799000,
        },
        {
            name: "product2",
            price: 449000,
        },
        {
            name: "product3",
            price: 6190000,
        },
        {
            name: "product4",
            price: 1199000,
        },
    ];

    return (
        <div className="app">
            <Header />
            <SideBar />
            <Tab />
            <div className="graph-info-container">
                <div className="graph-info-header">
                    <h2 className="graph-info-title">그래프</h2>
                </div>
                <RechartsGraph data={data} />
            </div>
        </div>
    )
};

export default GraphPage;