import './p_home.styl'
// import {p1} from '../../img/p1.png'
import { Image } from 'antd'

function Phome() {

    return (
        <div className="P-home">
            <div className='P-header'>
                <div className='p-l'>优质服务</div>
                <div className='p-r'>我们的科学智慧医疗信息系统服务具有以下特点：高效、准确、安全、便捷、智能、可靠。</div>
            </div>
            <div className='P-body'>
                <div className='Pitem' id='pitem1'>
                    <Image src='src/pages/p-home/img/p1.png' className='p-i-i'></Image>
                    <div className='p-i-h'>门诊挂号</div>
                    <div className='p-i-t'>提供便捷的在线预约服务，及时提醒患者就诊时间。</div>
                </div>
                <div className='Pitem'>
                    <Image src='src/pages/p-home/img/p2.png' className='p-i-i'></Image>
                    <div className='p-i-h'>电子病历</div>
                    <div className='p-i-t'>实现电子病历的存储和管理，方便医生查看患者历史记录。</div>
                </div>
                <div className='Pitem'>
                    <Image src='src/pages/p-home/img/p3.png' className='p-i-i'></Image>
                    <div className='p-i-h'>住院申请</div>
                    <div className='p-i-t'>提供在线住院申请平台，极速入住。</div>
                </div>
            </div>
        </div>
    )
}

export default Phome
