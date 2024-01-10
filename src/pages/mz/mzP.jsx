import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import AddRegistration from '../addRegistration/addRegistration';
import Service from '../../api/service';
import './mzP.styl'
function MzP() {
    const [kid, setKid] = useState(0)
    const menu = (
        <Menu>
            <Menu.Item key="1" onClick={() => {
                setKid(1)
            }}>精神科</Menu.Item>
            <Menu.Item key="2" onClick={() => {
                setKid(2)
            }}>外科</Menu.Item>
            <Menu.Item key="3" onClick={() => {
                setKid(3)
            }}>内科</Menu.Item>
            <Menu.Item key="4" onClick={() => {
                setKid(4)
            }}>消化内科</Menu.Item>
            <Menu.Item key="5" onClick={() => {
                setKid(5)
            }}>皮肤科</Menu.Item>
            <Menu.Item key="6" onClick={() => {
                setKid(6)
            }}>儿科</Menu.Item>
            <Menu.Item key="7" onClick={() => {
                setKid(7)
            }}>肛肠科</Menu.Item>
            <Menu.Item key="8" onClick={() => {
                setKid(8)
            }}>心理科</Menu.Item>
            <Menu.Item key="9" onClick={() => {
                setKid(9)
            }}>康复科</Menu.Item>
            <Menu.Item key="10" onClick={() => {
                setKid(10)
            }}>其他科</Menu.Item>
            <Menu.Item key="0" onClick={() => {
                setKid(0)
            }}>所有科</Menu.Item>
        </Menu>
    )
    const [patientid,setPatientid] = useState()
    const [doctorid,setDoctorid] = useState()
    const [doctorname,setdoctorname] =useState()
    const [fee,setFee] = useState()
    const [deptid,setDeptid] = useState()
    const [data, setData] = useState([])
    const [count, setCount] = useState()
    const [yuyue, setYuyue] = useState(false)
    useEffect(() => {
        setPatientid(localStorage.getItem("id"))
        let a = []
        Service.getDoctors().then((res) => {
            console.log(res)
            res.map((i) => {
                a.push(i)
            })
            setData(a)
        })
    }, [count])

    const changeYuyue = (doctorid,fee,deptid,doctorname)=>{
        setDoctorid(doctorid)
        setFee(fee)
        setDeptid(deptid)
        setdoctorname(doctorname)
        setYuyue(!yuyue)
    }


    return (
        <div className="D_info">
            {
                yuyue && (
                    <AddRegistration 
                    doctorname={doctorname}
                    patientid={patientid}
                    doctorid={doctorid}
                    deptid={deptid}
                    fee={fee}
                    addClose={() => { setCount(count + 1) }} 
                    onClose={() => { setYuyue(false) }} 
                    />
                )
            }
            <div className='mzP_header'>
                <Dropdown overlay={menu}>
                    <Button>
                        {kid == 0 ? '请选择科室' : kid == 1 ? '精神科' : kid == 2 ? '外科' : kid == 3 ? '内科' : kid == 4 ? '消化内科' :
                            kid == 5 ? '皮肤科' : kid == 6 ? '儿科' : kid == 7 ? '肛肠科' : kid == 8 ? '心理科' : kid == 9 ? '康复科' : '其他科'}
                        <DownOutlined />
                    </Button>
                </Dropdown>
                <div className='mzP-h-r'>
                    {/* <Button className='mzP-h-b'>预约医生</Button> */}
                </div>
            </div>

            <div className='mzP_body'>
                <table className='mzP-table'>
                    <thead className='mzP-thead'>
                        <tr>
                            <th></th>
                            <th>医生姓名</th>
                            <th>科室</th>
                            <th>职称</th>
                            <th>联系方式</th>
                            <th>挂号费用</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody className='mzP-tbody'>
                        {
                            data.map((e) => {
                                if (kid == 0 || kid == e.deptid) {
                                    return (
                                        <tr className='mzP-tbody-tr' key={e.doctorid}>
                                            <td>
                                                <div className='mzP-tbody-circle'></div>
                                            </td>
                                            <td>{e.doctorname}</td>
                                            <td>{(e.deptid == 1 ? '精神科' : e.deptid == 2 ? '外科' : e.deptid == 3 ? '内科' :
                                                e.deptid == 4 ? '消化内科' : e.deptid == 5 ? '皮肤科' : e.deptid == 6 ? '儿科' : e.deptid == 7 ? '肛肠科' :
                                                    e.deptid == 8 ? '心理科' : e.deptid == 9 ? '康复科' : '其他科')}</td>
                                            <td>{e.doctortitle}</td>
                                            <td>{e.doctorphone}</td>
                                            <td>{e.fee}</td>
                                            <td>
                                                <div className='mzP-ops'>
                                                    <Button className='mzP-h-b' onClick={() => {
                                                        changeYuyue(e.doctorid,e.fee,e.deptid,e.doctorname)
                                                    }}>预约医生</Button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }
                            })
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default MzP
