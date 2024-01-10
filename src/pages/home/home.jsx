import './home.styl'
import Sidebar from '../../components/sidebar/sidebar'
import { Outlet } from 'react-router-dom'

function Home() {

    return (
        <div className="home">
            <div className="P-entry">
                {/* <Header title="entry" info={() => { console.log('info:entry') }} /> */}
                <Sidebar />
                <div className="main-container">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Home
