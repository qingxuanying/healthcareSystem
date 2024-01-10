import './Dhome.styl'
import SidebarD from '../../components/sidebarD/sidebarD'
import { Outlet } from 'react-router-dom'

function DHome() {

    return (
        <div className="home">
            <div className="P-entry">
                <SidebarD />
                <div className="main-container">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default DHome
