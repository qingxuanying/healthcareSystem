/* eslint-disable react/prop-types */
import { Menu, Dropdown, Button, Modal } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useState } from 'react';
import Service from '../../api/service';
import './addDoctor.styl'
function AddDoctor(props) {
    const {onClose} = props
    const [sex, setSex] = useState('未知')
    const [level, setLevel] = useState('未知')
    const [ks, setKs] = useState('未知')

    const [doctorpassword, setdoctorpassword] = useState()
    const [doctorname, setdoctorname] = useState()
    const [doctor_age, setdoctor_age] = useState()
    const [doctor_gender, setdoctor_gender] = useState(0)
    const [doctortitle, setdoctortitle] = useState()
    const [deptid, setdeptid] = useState()
    const [doctorintroduction, setdoctorintroduction] = useState("无")
    const [doctorcertificates_no, setdoctorcertificates_no] = useState()
    const [doctorphone,setdoctorphone]=useState()

    const menuSex = (
        <Menu>
            <Menu.Item key="1" onClick={() => {
                setSex('男')
                setdoctor_gender(1)
            }}>男</Menu.Item>
            <Menu.Item key="2" onClick={() => {
                setSex('女')
                setdoctor_gender(2)
            }}>女</Menu.Item>
        </Menu>
    )
    const menuLevel = (
        <Menu>
            <Menu.Item key='1' onClick={() => {
                setLevel('主治医师')
                setdoctortitle('主治医师')
            }}>主治医师</Menu.Item>
            <Menu.Item key='2' onClick={() => {
                setLevel('副主任医师')
                setdoctortitle('副主任医师')
            }}>副主任医师</Menu.Item>
            <Menu.Item key='3' onClick={() => {
                setLevel('主任医师')
                setdoctortitle('主任医师')
            }}>主任医师</Menu.Item>
            <Menu.Item key='4' onClick={() => {
                setLevel('实习医生')
                setdoctortitle('实习医生')
            }}>实习医生</Menu.Item>
        </Menu>
    )
    const menuKs = (
        <Menu>
        <Menu.Item key="1" onClick={() => {
            setdeptid(1)
            setKs('精神科')
        }}>精神科</Menu.Item>
        <Menu.Item key="2" onClick={() => {
            setdeptid(2)
            setKs('外科')
        }}>外科</Menu.Item>
        <Menu.Item key="3" onClick={() => {
            setdeptid(3)
            setKs('内科')
        }}>内科</Menu.Item>
        <Menu.Item key="4" onClick={() => {
            setdeptid(4)
            setKs('消化内科')
        }}>消化内科</Menu.Item>
        <Menu.Item key="5" onClick={() => {
            setdeptid(5)
            setKs('皮肤科')
        }}>皮肤科</Menu.Item>
        <Menu.Item key="6" onClick={() => {
            setdeptid(6)
            setKs('儿科')
        }}>儿科</Menu.Item>
        <Menu.Item key="7" onClick={() => {
            setdeptid(7)
            setKs('肛肠科')
        }}>肛肠科</Menu.Item>
        <Menu.Item key="8" onClick={() => {
            setdeptid(8)
            setKs('心理科')
        }}>心理科</Menu.Item>
        <Menu.Item key="9" onClick={() => {
            setdeptid(9)
            setKs('康复科')
        }}>康复科</Menu.Item>
        <Menu.Item key="10" onClick={() => {
            setdeptid(10)
            setKs('其他科')
        }}>其他科</Menu.Item>
    </Menu>
    )

    const commit = async () => {
        if(doctorpassword==null ||
            doctorname==null ||
            doctor_age==null ||
            doctortitle==null ||
            deptid==null ||
            doctorcertificates_no==null){
                alert("请输入所有信息")
            }else{
                await Service.addDoctors(
                    doctorpassword,
                    doctorname,
                    doctor_age,
                    doctor_gender,
                    doctortitle,
                    deptid,
                    doctorintroduction,
                    doctorcertificates_no,
                    doctorphone).then(() => {
                    })
                    props.addClose()
                    onClose()
            }
    }
    const cancel = () => {
        onClose()
    }

    return (
        <Modal
            open={true}
            title="添加医生"
            onCancel={() => {
                onClose()
            }}
            maskClosable={false}
            footer={null}>
            <div className="add-Doctor">
                <div className="add-Doctor-body">
                    <div className="add-Doctor-body-h">添加医生</div>
                    <div className='add-Doctor-body-opt'>
                        <div className='add-Doctor-body-opt-title'>姓名:</div>
                        <input className='add-Doctor-body-opt-input' placeholder='请输入'
                            onChange={(e) => {
                                setdoctorname(e.target.value)
                            }}></input>
                    </div>
                    <div className='add-Doctor-body-opt'>
                        <div className='add-Doctor-body-opt-title'>年龄:</div>
                        <input className='add-Doctor-body-opt-input' placeholder='请输入'
                            onChange={(e) => {
                                setdoctor_age(e.target.value)
                            }}></input>
                    </div>
                    <div className='add-Doctor-body-opt'>
                        <div className='add-Doctor-body-opt-title'>联系方式:</div>
                        <input className='add-Doctor-body-opt-input' placeholder='请输入'
                            onChange={(e) => {
                                setdoctorphone(e.target.value)
                            }}></input>
                    </div>
                    <div className='add-Doctor-body-opt'>
                        <div className='add-Doctor-body-opt-title'>初始密码:</div>
                        <input className='add-Doctor-body-opt-input' placeholder='请输入'
                            onChange={(e) => {
                                setdoctorpassword(e.target.value)
                            }}></input>
                    </div>
                    <div className='add-Doctor-body-opt'>
                        <div className='add-Doctor-body-opt-title'>性别:</div>
                        <Dropdown overlay={menuSex}>
                            <Button>
                                {sex == '未知' ? '请选择' : sex} <DownOutlined />
                            </Button>
                        </Dropdown>
                    </div>
                    
                    <div className='add-Doctor-body-opt'>
                        <div className='add-Doctor-body-opt-title'>身份证号:</div>
                        <input className='add-Doctor-body-opt-input' placeholder='请输入'
                            onChange={(e) => {
                                setdoctorcertificates_no(e.target.value)
                            }}></input>
                    </div>
                    <div className='add-Doctor-body-opt'>
                        <div className='add-Doctor-body-opt-title'>等级职称:</div>
                        <Dropdown overlay={menuLevel}>
                            <Button>
                                {level == '未知' ? '请选择' : level} <DownOutlined />
                            </Button>
                        </Dropdown>
                    </div>
                    <div className='add-Doctor-body-opt'>
                        <div className='add-Doctor-body-opt-title'>所在科室:</div>
                        <Dropdown overlay={menuKs}>
                            <Button>
                                {ks == '未知' ? '请选择' : ks} <DownOutlined />
                            </Button>
                        </Dropdown>
                    </div>
                    <div className='add-Doctor-body-opt'>
                        <div className='add-Doctor-body-opt-title'>个人简介:</div>
                        <textarea className='add-Doctor-body-opt-textarea' placeholder='请输入' rows='5'
                            onChange={(e)=>{
                                setdoctorintroduction(e.target.value)
                            }}></textarea>
                    </div>
                    {/* <div className='add-Doctor-body-opt'>
                        <div className='add-Doctor-body-opt-title'>专业特长:</div>
                        <textarea className='add-Doctor-body-opt-textarea' placeholder='请输入' rows='5'></textarea>
                    </div> */}
                </div>
                <div className='add-Doctor-footer'>
                    <Button onClick={commit}>确认</Button>
                    <Button onClick={cancel}>取消</Button>
                </div>
            </div>
        </Modal>

    )
}
export default AddDoctor