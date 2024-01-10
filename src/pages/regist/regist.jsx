import { Button, Input } from 'antd'
import './regist.styl'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Service from '../../api/service'

function Regist() {

    // 创建路由钩子
    const navigate = useNavigate()
    const [username, setUsername] = useState()
    const [pwd, setPwd] = useState()
    const [sure, setSure] = useState()
    const [p_id, setP_id] = useState()

    const changeUsername = (e) => {
        setUsername(e.target.value)
    }
    const changePwd = (e) => {
        setPwd(e.target.value)
    }
    const changeSure = (e) => {
        setSure(e.target.value)
    }
    const changeP_id = (e) => {
        setP_id(e.target.value)
    }

    const regist = () => {
        if (username == null || pwd == null || sure == null || p_id == null) {
            alert('请输入所有必填项')
        }
        else if (pwd != sure) {
            alert('两次密码不一致')
        }
        else {
            Service.register(p_id,username,pwd).then((res)=>{
                // localStorage.setItem('P_id',)
                console.log(res)
                if(res.message == "操作成功"){
                    "操作成功"
                    navigate('/login')
                }else{
                    alert('注册失败，请稍后再试')
                }
            })
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
            <div className='rigist-right-body'>
                <div className='ri_text'>注册账号</div>
                <div className="ipt-con">
                    <Input placeholder="账号" onChange={changeUsername} />
                </div>
                <div className="ipt-con">
                    <Input.Password placeholder="密码" onChange={changePwd} />
                </div>
                <div className="ipt-con">
                    <Input.Password placeholder="确认密码" onChange={changeSure} />
                </div>
                <div className="ipt-con">
                    <Input placeholder="身份证号码" onChange={changeP_id} />
                </div>
                <div className='ipt-con'>
                    <div className='ri_regist' onClick={() => { navigate('/login') }}>返回登录</div>
                </div>
                <div className="ipt-con">
                    <Button type="primary" block={true} onClick={regist} color='rgba(16, 93, 181, 1)'>
                        注册
                    </Button>
                </div>
            </div>

        </div>
    )
}

export default Regist