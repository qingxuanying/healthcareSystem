import { Card, Menu } from 'antd'
import { useNavigate } from 'react-router-dom'
import './sidebarD.styl'
import { HomeOutlined, UserOutlined, FolderAddOutlined, QuestionCircleOutlined } from '@ant-design/icons'

function SidebarD() {

    const navigate = useNavigate()
    const menuItems = [
        {
            //导航名称
            label: '挂号信息',
            //导航唯一标识，为便于当前态的显示，与当前路由保持一致
            key: 'dhome/RegistrationD',
            //导航icon
            icon: <UserOutlined />,
            //点击跳转行为
            onClick: () => {
                navigate('/dhome/RegistrationD')
            },
        },
        {
            //导航名称
            label: '开具药方',
            //导航唯一标识，为便于当前态的显示，与当前路由保持一致
            key: 'dhome/PrescriptionD',
            //点击跳转行为
            icon: <HomeOutlined />,
            onClick: () => {
                navigate('/dhome/PrescriptionD')
            },
        },
        {
            //导航名称
            label: '排班信息',
            //导航唯一标识，为便于当前态的显示，与当前路由保持一致
            key: 'dhome/ScheduleD',
            //点击跳转行为
            icon: <FolderAddOutlined />,
            onClick: () => {
                navigate('/dhome/ScheduleD')
            },
        },
        {
            //导航名称
            label: '智能问答',
            //导航唯一标识，为便于当前态的显示，与当前路由保持一致
            key: 'dhome/Chat',
            //点击跳转行为
            icon: <QuestionCircleOutlined />,
            onClick: () => {
                navigate('/dhome/Chat')
            },
        }
    ]

    return (
        <Card className="S-side">
            <Menu mode="vertical" selectedKeys={location.hash.substr(2)} items={menuItems} />
        </Card>
    )
}

export default SidebarD
