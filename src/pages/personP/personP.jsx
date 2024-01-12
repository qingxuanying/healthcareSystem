import { useState, useEffect } from 'react';
import './personP.styl'
import { Avatar, Button } from 'antd'
import Bldtails from '../bl/bl';
import Service from '../../api/service';
import EditInfo from '../editInfo/editInfo';


function PersonP() {
    // eslint-disable-next-line no-unused-vars
    // const [id, setId] = useState(1)
    const id =localStorage.getItem("id")
    const [bl, setBl] = useState(false)
    const [count, setCount] = useState(0)
    const [fix, setFix] = useState(false)
    const [photo, setPhoto] = useState('')
    const [registration, setRegistration] = useState([])
    const [registrationid, setRegistrationid] = useState([])
  

    const changeBl = (registrationid) => {
        setRegistrationid(registrationid)
        setBl(true)
    }

    const [person, setPerson] = useState({})


    useEffect(() => {
        // setId(localStorage.getItem("id"))
        Service.getPatientByid(id).then((res) => {
            setPerson(res)
        })
        const backendAPI = `api/patient/getphoto?patientid=${id}`; // 请替换为实际的后端 API 地址

        fetch(backendAPI)
            .then(response => response.blob())
            .then(blob => {
                const url = URL.createObjectURL(blob);
                setPhoto(url);
            });

        Service.getRegistrationByPatientId(id).then((res) => {
            // console.log(res)
            let a = []
            res.map((i) => {
                a.push(i)
            })
            setRegistration(a)
        })

    }, [id, count])

    const fixClose = () => {
        setCount(count + 1)
    }


    return (
        <div className='personP'>
            {
                fix && (
                    <EditInfo id={id} fixClose={fixClose} onClose={() => { setFix(false) }} />
                )
            }
            <div className="personP-left">
                <div className='personP-left-body'>
                    <div className='personP-left-body-h'>患者信息</div>
                    <Avatar shape='square' size={125} src={photo} />
                    <div className='personP-left-body-opt'>
                        <div className='opt-t'>患者姓名</div>
                        <div className='opt-d'>{person.patientname}</div>
                    </div>
                    <div className='personP-left-body-opt'>
                        <div className='opt-t'>患者性别</div>
                        <div className='opt-d'>{person.patientgender == 0 ? '未知' : person.patientgender == 1 ? '男' : '女'}</div>
                    </div>
                    <div className='personP-left-body-opt'>
                        <div className='opt-t'>患者年龄</div>
                        <div className='opt-d'>{person.patientage}</div>
                    </div>
                    <div className='personP-left-body-opt'>
                        <div className='opt-t'>患者证件</div>
                        <div className='opt-d'>{person.patient_certificates_no}</div>
                    </div>
                    <div className='personP-left-body-opt'>
                        <div className='opt-t'>患者电话</div>
                        <div className='opt-d'>{person.patientPhone == '' ? '未知' : person.patientPhone}</div>
                    </div>
                    <div className='personP-left-body-opt'>
                        <Button className='opt-but' onClick={() => { setFix(true) }}>修改信息</Button>
                    </div>
                </div>
            </div>

            <div className='personP-right'>
                {
                    bl && (
                        <Bldtails
                            onClose={() => { setBl(false) }}
                            registrationid={registrationid}
                        />
                    )

                }
                <div className='personP-right-h'>电子病历</div>
                {
                    registration.map((item) => {
                        const date = new Date(item.registrationDate)
                        // const kid = item.deptid
                        return (
                            <div className='bl-info' key={item.registrationid} onClick={() => {
                                changeBl(item.registrationid)
                            }}>
                                <div className='bl-time'>{date.getFullYear()}年{date.getMonth() + 1}月{date.getDay()}日</div>
                                <div className='bl-content'>患者：{item.patientname}</div>
                                <div className='bl-content'>挂号费：{item.fee}元</div>
                                <div className='bl-content'>患者自述：{item.decrept}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default PersonP