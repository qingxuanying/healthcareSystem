import { Card, Menu } from 'antd'
import { useNavigate } from 'react-router-dom'
import './sidebarA.styl'
import { HomeOutlined, UserOutlined, ContactsOutlined, FolderAddOutlined, QuestionCircleOutlined } from '@ant-design/icons'

function SidebarA() {

    const navigate = useNavigate()
    const menuItems = [
        {
            //导航名称
            label: '医生管理',
            //导航唯一标识，为便于当前态的显示，与当前路由保持一致
            key: 'ahome/Dinfo',
            //导航icon
            icon: <UserOutlined />,
            //点击跳转行为
            onClick: () => {
                navigate('/ahome/Dinfo')
            },
        },
        {
            //导航名称
            label: '住院管理',
            //导航唯一标识，为便于当前态的显示，与当前路由保持一致
            key: 'ahome/HospitalizationA',
            //点击跳转行为
            icon: <HomeOutlined />,
            onClick: () => {
                navigate('/ahome/HospitalizationA')
            },
        },
        {
            //导航名称
            label: '科室管理',
            //导航唯一标识，为便于当前态的显示，与当前路由保持一致
            key: 'ahome/DepartmentA',
            //点击跳转行为
            icon: <FolderAddOutlined />,
            onClick: () => {
                navigate('/ahome/DepartmentA')
            },
        },
        {
            //导航名称
            label: '药物管理',
            //导航唯一标识，为便于当前态的显示，与当前路由保持一致
            key: 'ahome/DrugsA',
            //点击跳转行为
            icon: <ContactsOutlined />,
            onClick: () => {
                navigate('/ahome/DrugsA')
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

export default SidebarA
