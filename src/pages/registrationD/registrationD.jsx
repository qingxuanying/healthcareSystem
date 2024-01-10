import { HighlightOutlined, CloseOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import './registrationD.styl'
import Input from 'antd/es/input/Input';
import Service from '../../api/service';
import { useNavigate } from 'react-router-dom'
const { Search } = Input;
function RegistrationD() {
    const navigate = useNavigate()
    const [pname, setpname] = useState('')
    const [items, setItems] = useState([])
    // const [doctorid,setDoctorid] = useState()

    useEffect(() => {
        let a = []
        // setDoctorid(localStorage.getItem("doctorid"))
        Service.getRegistrationByDOctorid(localStorage.getItem("doctorid")).then((res) => {
            // console.log(res)
            res.map((i) => {
                a.push(i)
            })
            setItems(a)
        })

    }, [])
    const changePname = (e) => {
        setpname(e)
    }

    const gotoPre = (patientid, registrationid) => {
        localStorage.setItem("patientid", patientid)
        localStorage.setItem("registrationid", registrationid)
        navigate('/dhome/PrescriptionD')
    }

    return (
        <div className="D_info">
            <div className='Dinfo_header'>
                <Search
                    placeholder="患者姓名"
                    onSearch={changePname}
                    style={{
                        width: 200,
                    }}
                />
                {/* <div className='dinfo-h-r'>
                    <Button className='dinfo-h-b' onClick={changePname}>添加医生</Button>
                </div> */}
            </div>

            <div className='Dinfo_body'>
                <table className='dinfo-table'>
                    <thead className='dinfo-thead'>
                        <tr>
                            <th></th>
                            <th>患者姓名</th>
                            {/* <th>联系方式</th> */}
                            <th>患者自述</th>
                            <th>挂号时间</th>
                            <th>就诊状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody className='dinfo-tbody'>
                        {
                            items.map((e) => {
                                if (pname == '' || pname == e.patientname) {
                                    return (
                                        <tr className='dinfo-tbody-tr' key={e.registrationid} onClick={()=>{
                                            gotoPre(e.patientid,e.registrationid)
                                        }}>
                                            <td>
                                                <div className='dinfo-tbody-circle'></div>
                                            </td>
                                            <td>{e.patientname}</td>
                                            {/* <td>{e.number}</td> */}
                                            <td>{e.decrept}</td>
                                            <td>{e.registrationDate}</td>
                                            <td>
                                                {e.status == 1 ? (
                                                    <div className='dinfo-tbody-tr-statu-y'>已就诊</div>
                                                ) : (
                                                    <div className='dinfo-tbody-tr-statu-w'>未就诊</div>
                                                )}

                                            </td>
                                            <td>
                                                <div className='dinfo-ops'>
                                                    <HighlightOutlined className='dinfo-ico' />
                                                    <CloseOutlined className='dinfo-ico' />
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

export default RegistrationD
