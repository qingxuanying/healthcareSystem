import { Button, Input, Radio } from 'antd'
// import imgLogo from './login.jpg'
import './login.styl'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Service from '../../api/service'

function Login() {

    // 创建路由钩子
    const navigate = useNavigate()
    const [value, setValue] = useState(1)
    const [username, setUsername] = useState()
    const [pwd, setPwd] = useState()
    const onChange = (e) => {

        setValue(e.target.value)
    }
    const changeUsername = (e) => {

        setUsername(e.target.value)
    }

    const changePwd = (e) => {

        setPwd(e.target.value)
    }

    const login = () => {


        if (username == null || pwd == null) {
            alert('请输入账号和密码')
        }
        else {

            if (value == 1) {
                Service.Login(username, pwd).then((res) => {

                    if (res.status == 200) {
                        localStorage.setItem('id', res.data)
                        navigate('/phome/Phome')
                    } else {
                        alert("用户名和密码不匹配")
                    }
                })
            } else if (value == 2) {
                Service.doctorLogin(username, pwd).then((res) => {

                    if (res.status == 200) {
                        localStorage.setItem('doctorid', res.data)
                        navigate('/dhome/RegistrationD')
                    } else {
                        alert("用户名和密码不匹配")
                    }
                })
            } else if (value == 3) {
                Service.loginA(username, pwd).then((res) => {

                    if (res.status == 200) {
                        localStorage.setItem('id', res.data)
                        navigate('/ahome/Dinfo')
                    } else {
                        alert("用户名和密码不匹配")
                    }
                })
            }
        }
    }

    return (
        <div className="P-login">
            {/* <img src={imgLogo} alt="" className="logo" /> */}
            <div className='left-body'>
                <div className='h-1'>科学智慧医疗系统</div>
                <div className='text'>优质医疗服务，为您的健康保驾护航</div>
                <div className='h-2'>安全管理，全方位服务</div>
                <div className='text'>我们致力于提供多维度的医疗管理服务，通过智能化系统，为您提供全方位的医疗服务，为您的健康保驾护航。</div>
                <div className='h-2'>全面协同，高效便捷</div>
                <div className='text'>我们的智慧医疗系统实现了医院内部各科室的协同合作，提高了医疗服务的效率和便捷性，让您的就医经历更加顺畅。</div>
            </div>
            <div className='right-body'>
                <div className='ri_text'>用户登录</div>
                <div className="ipt-con">
                    <Input placeholder="账号" onChange={changeUsername} />
                </div>
                <div className="ipt-con">
                    <Input.Password placeholder="密码" onChange={changePwd} />
                </div>
                <div className='ipt-con'>
                    <Radio.Group onChange={onChange} value={value}>
                        <Radio value={1} defaultChecked={true}>患者</Radio>
                        <Radio value={2} defaultChecked={false}>医生</Radio>
                        <Radio value={3} defaultChecked={false}>管理员</Radio>
                    </Radio.Group>
                    <div className='ri_regist' onClick={() => { navigate('/regist') }}>注册账号</div>
                </div>
                <div className="ipt-con">
                    <Button type="primary" block={true} onClick={login}>
                        登录
                    </Button>
                </div>
            </div>

        </div>
    )
}

export default Login