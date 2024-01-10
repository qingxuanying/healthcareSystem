import { Button, Card } from 'antd'
import { MoonOutlined, ThemeOutlined, SunOutlined } from '@/components/extraIcons/index'
import { UserOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setDark } from '@/store/slices/theme'
import { useState } from 'react'
import { globalConfig } from '@/globalConfig'
import ThemeModal from '@/components/themeModal'
import './header.styl'

function Header() {
    const navigate = useNavigate()

    // 获取redux派发钩子
    const dispatch = useDispatch();
    // 获取store中的主题配置
    const theme = useSelector((state) => state.theme)

    // 是否显示主题色选择对话框
    const [showThemeModal, setShowThemeModal] = useState(false)

    return (
        <Card className="M-header">
            <div className="header-wrapper">
                <div className='menu-con'>
                    科学智慧医疗系统
                    {/* <Menu mode="horizontal" selectedKeys={location.pathname} items={menuItems}  /> */}
                </div>
                <div className="opt-con">
                    <Button icon={<UserOutlined />} shape="circle" onClick={() => { navigate('/test') }}></Button>
                    {theme.dark ? (
                        <Button icon={<SunOutlined />} shape="circle" onClick={() => {
                            dispatch(setDark(false))
                        }}></Button>
                    ) : (
                        <Button icon={<MoonOutlined />} shape='circle' onClick={() => {
                            dispatch(setDark(true))
                        }}></Button>
                    )}
                    {
                        // 当globalConfig配置了主题色，并且数量大于0时，才显示主题色换肤按钮
                        globalConfig.customColorPrimarys &&
                        globalConfig.customColorPrimarys.length > 0 &&
                        <Button icon={<ThemeOutlined />} shape="circle"
                            onClick={() => {
                                setShowThemeModal(true)
                            }}></Button>
                    }
                </div>
                {
                    // 显示主题色换肤对话框
                    showThemeModal && (
                        <ThemeModal onClose={() => {
                            setShowThemeModal(false)
                        }}></ThemeModal>
                    )
                }
            </div>
        </Card>
    )
}

export default Header
