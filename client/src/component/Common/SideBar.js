import './SideBar.css';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import OrderModal from '../../Modal/Order/OrderModal';

const SideBar = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
    const handleCloseModal = () => {
      setIsModalOpen(false);
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
                    <div className="search-side" onClick={handleOpenModal}>
                        <img src="/image/writeicon.png" alt="write"/>
                        <span>주문 등록</span>
                    </div>
                    <div className="graph-side" onClick={() => navigate('/graph')}>
                        <img src="/image/graphicon.png" alt="graph"/>
                        <span>그래프</span>
                    </div>
                    <div className="management-side" onClick={() => navigate('/manage')}>
                        <img src="/image/stampicon.png" alt="management"/>
                        <span>주문 관리</span>
                    </div>
                </div>
                <div className="side-menu-bar-bottom" />
            </div>
            {isModalOpen && <OrderModal isOpen={isModalOpen} onClose={handleCloseModal} />}
        </div>
    );
}

export default SideBar;