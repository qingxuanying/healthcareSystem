import { Card, Menu } from 'antd'
import { useNavigate } from 'react-router-dom'
import './sidebar.styl'
import { HomeOutlined, UserOutlined, FolderAddOutlined, QuestionCircleOutlined } from '@ant-design/icons'

function Sidebar() {

    const navigate = useNavigate()
    const menuItems = [
        {
            //导航名称
            label: '首页概况',
            //导航唯一标识，为便于当前态的显示，与当前路由保持一致
            key: 'phome/Phome',
            //导航icon
            icon: <HomeOutlined />,
            //点击跳转行为
            onClick: () => {
                navigate('/phome/Phome')
            },
        },
        {
            //导航名称
            label: '个人信息',
            //导航唯一标识，为便于当前态的显示，与当前路由保持一致
            key: 'phome/PersonP',
            //点击跳转行为
            icon: <UserOutlined />,
            onClick: () => {
                navigate('/phome/PersonP')
            },
        },
        {
            //导航名称
            label: '门诊挂号',
            //导航唯一标识，为便于当前态的显示，与当前路由保持一致
            key: 'phome/MzP',
            //点击跳转行为
            icon: <FolderAddOutlined />,
            onClick: () => {
                navigate('/phome/MzP')
            },
        },
        {
            //导航名称
            label: '智能问答',
            //导航唯一标识，为便于当前态的显示，与当前路由保持一致
            key: 'phome/Chat',
            //点击跳转行为
            icon: <QuestionCircleOutlined />,
            onClick: () => {
                navigate('/phome/Chat')
            },
        }
    ]

    return (
        <Card className="S-side">
            <Menu mode="vertical" selectedKeys={location.hash.substr(2)} items={menuItems} />
        </Card>
    )
}

export default Sidebar
