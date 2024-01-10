import './home.styl'
import SidebarA from '../../components/sidebarA/sidebarA'
import { Outlet } from 'react-router-dom'

function AHome() {

    return (
        <div className="home">
            <div className="P-entry">
                <SidebarA />
                <div className="main-container">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AHome
