import './SideBar.css';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="sidebar-container">
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <button className="sidebar-button" onClick={toggleSidebar}>
                    <img src="/image/menu.png" alt="menu" />
                </button>
                <div className="side-menu-bar-top" />
                <div className="side-menu-bar">
                    <div className="home-side" onClick={() => navigate('/main')}>
                        <img src="/image/homeicon.png" alt="home"/>
                        <span>메인</span>
                    </div>
                    <div className="search-side" onClick={() => navigate('/main')}>
                        <img src="/image/searchicon.png" alt="search"/>
                        <span>주문 조회</span>
                    </div>
                    <div className="graph-side" onClick={() => navigate('/main')}>
                        <img src="/image/graphicon.png" alt="graph"/>
                        <span>그래프</span>
                    </div>
                    <div className="management-side" onClick={() => navigate('/main')}>
                        <img src="/image/stampicon.png" alt="management"/>
                        <span>관리</span>
                    </div>
                </div>
                <div className="side-menu-bar-bottom" />
            </div>
        </div>
    );
}

export default SideBar;