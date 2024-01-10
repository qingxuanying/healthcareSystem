/* eslint-disable react/prop-types */
import { Modal } from 'antd'
import { useEffect, useState } from 'react'
import Service from '../../api/service'
import './bl.styl'

function Bldtails(props) {
    const { onClose } = props
    const [zd, setZd] = useState({})
    const [year, setYear] = useState('2024')
    const [month, setMonth] = useState('1')
    const [day, setDay] = useState('10')
    const [hour, setHour] = useState('0')
    const [min, setMin] = useState('0')
    const [doctorname, setDoctorname] = useState('')
    const [deptname, setDeptname] = useState('')
    const [prescriptionid, setprescriptionid] = useState()
    const [items, setItems] = useState([])


    useEffect(() => {
        Service.getMedicalRecordByRegistrationId(props.registrationid).then((res) => {
            // console.log(res)
            setZd(res[0])
            const date = new Date(res[0].visitTime)
            setYear(date.getFullYear())
            setMonth(date.getMonth())
            setDay(date.getDay())
            setHour(date.getHours())
            setMin(date.getMinutes())

            Service.getDoctor(res[0].doctorid).then(res => {
                // console.log(res)
                setDoctorname(res.doctorname)
                Service.getDeptName(res.deptid).then((rs) => {
                    setDeptname(rs.deptname)
                    // console.log(rs)
                })
            })
        })

        Service.getPrescriptionByRegistrationId(props.registrationid).then((res) => {
            setprescriptionid(res[0].prescriptionid)

            Service.getprescriptionMedication(res[0].prescriptionid).then((re) => {
                let a = []
                console.log(re)
                re.map((i) => {
                    a.push(i)
                })
                setItems(a)
            })
        })

    }, [props.registrationid])
    return (
        <Modal
            open={true}
            title="病历"
            onCancel={() => {
                onClose()
            }}
            maskClosable={false}
            footer={null}
            width={800}>
            <div className='bl-opt'>
                <div className='opt-l'>
                    <div className='l-o'>{year}年{month}月{day}日</div>
                    <div className='l-o'>{hour}时{min}分</div>
                    <div className='l-h'>诊断结果</div>
                    <div className='l-o'>{deptname}-{doctorname}</div>
                </div>
                <div className='opt-r'>
                    <div className='r-o'>患者病症：{zd.preliminaryDiagnosis}</div>
                    <div className='r-o'>治疗意见：{zd.treatmentAdvice}</div>
                </div>
            </div>
            <div className='bl-opt'>
                <div className='opt-l'>
                    <div className='l-o'>{year}年{month}月{day}日</div>
                    <div className='l-o'>{hour}时{min}分</div>
                    <div className='l-h'>开药</div>
                    <div className='l-o'>{deptname}-{doctorname}</div>
                </div>
                <div className='opt-r'>
                    <div className='r-o'>药单号:{prescriptionid}</div>
                    <table className='r-table'>
                        <thead className='rt-head'>
                            <tr>
                                <th>药品编号</th>
                                <th>药品名</th>
                                <th>取药量</th>
                                <th>用法</th>
                            </tr>
                        </thead>
                        <tbody className='rt-body'>
                            {
                                items.map((i)=>{
                                    return (
                                        <tr className='rt-b-tr' key={i.pmid}>
                                            <td>{i.medicationid}</td>
                                            <td>{i.medicationname}</td>
                                            <td>{i.number}</td>
                                            <td>{i.frequency}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </Modal>
    )
}
export default Bldtails