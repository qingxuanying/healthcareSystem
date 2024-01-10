import { Button } from 'antd'
import './account.styl'
import { useNavigate } from 'react-router-dom'
// import Header from '../../components/header/header'

function Account() {
    const navigate = useNavigate()
    return (
        <div className="P-account">
            {/* <Header title="account" info={()=>{console.log('info:account')}} /> */}
            <h1>Account Page</h1>
            <div className="ipt-con">
                <Button type="primary" onClick={() => { navigate('/login') }}>返回登录</Button>
            </div>
        </div>
    )
}

export default Account
