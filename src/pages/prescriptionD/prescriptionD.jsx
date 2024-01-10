import './prescriptionD.styl'
import { Avatar, Button } from 'antd'
// import { HighlightOutlined, CloseOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import AddPres from '../addPres/addPres';
import Service from '../../api/service';
function PrescriptionD() {

    const [patient, setPatient] = useState({})
    const [patientid, setPatientid] = useState()
    const [photo, setPhoto] = useState('')
    const [preliminaryDiagnosis, setpreliminaryDiagnosis] = useState('')
    const [treatmentAdvice, settreatmentAdvice] = useState('')
    const [add, setAdd] = useState(false);
    const [preid, setPreid] = useState()
    const [pre, setPre] = useState([])
    const [count, setCount] = useState(0)
    const [oldZd, setOldZd] = useState({})


    useEffect(() => {
        setPatientid(localStorage.getItem("patientid"))
        Service.getPatientByid(localStorage.getItem("patientid")).then((res) => {
            setPatient(res)
        })
        const backendAPI = `api/patient/getphoto?patientid=${localStorage.getItem("patientid")}`; // 请替换为实际的后端 API 地址
        fetch(backendAPI)
            .then(response => response.blob())
            .then(blob => {
                const url = URL.createObjectURL(blob);
                setPhoto(url);
            });

        //拿到处方单的id
        Service.getPrescriptionByRegistrationId(localStorage.getItem("registrationid")).then(async (res) => {
            setPreid(res[0].prescriptionid)
            //拿到处方单id对应的药品清单
            Service.getprescriptionMedication(res[0].prescriptionid).then((res) => {
                let a = []
                res.map((i) => {
                    a.push(i)
                })
                setPre(a)
            })
        })

        Service.getMedicalRecordByRegistrationId(localStorage.getItem("registrationid")).then(async (res) => {
            console.log(res)
            setOldZd(res[0])
        })
    }, [patientid, preid, count])

    const changeAdd = () => {
        setAdd(!add)
    }

    const zd = () => {
        Service.updateMedicalRecord(
            localStorage.getItem("registrationid"),
            preliminaryDiagnosis,
            treatmentAdvice).then((res) => {
                if (res) {
                    alert("修改诊断成功")
                }
            })
    }
    const delPre = (pmid) => {
        Service.delPreM(pmid).then((res) => {
            if (res) {
                alert('删除成功')
                setCount(count + 1)
            }
        })
    }

    return (
        <div className="prescriptionD">
            {
                add && (
                    <AddPres
                        prescriptionid={preid}
                        onClose={() => { setAdd(false) }}
                        onAdd={() => { setCount(count + 1) }}
                    />
                )
            }
            <div className="prescriptionD-left">
                <div className='prescriptionD-left-body'>
                    <div className='prescriptionD-left-body-h'>患者信息</div>
                    <Avatar shape='square' size={125} src={photo} />
                    <div className='prescriptionD-left-body-opt'>
                        <div className='opt-t'>患者姓名</div>
                        <div className='opt-d'>{patient.patientname}</div>
                    </div>
                    <div className='prescriptionD-left-body-opt'>
                        <div className='opt-t'>患者性别</div>
                        <div className='opt-d'>{patient.patientgender == 1 ? '男' : patient.patientgender == 2 ? '女' : '未知'}</div>
                    </div>
                    <div className='prescriptionD-left-body-opt'>
                        <div className='opt-t'>患者证件</div>
                        <div className='opt-d'>{patient.patient_certificates_no}</div>
                    </div>
                    <div className='prescriptionD-left-body-opt'>
                        <div className='opt-t'>患者电话</div>
                        <div className='opt-d'>{patient.patientPhone}</div>
                    </div>
                </div>
            </div>
            <div className="prescriptionD-right">
                <div className='prescriptionD-right-body'>
                    <div className='prescriptionD-right-body-opt'>
                        <div className='pre-ri-opt-title'>诊断结果</div>
                    </div>
                    <div className='pre-ri-opt-main'>
                        <div className='opt'>
                            <div className='opt-bz'>初步诊断</div>
                            <textarea className='opt-int'
                                rows="6"
                                cols="5"
                                placeholder={oldZd.preliminaryDiagnosis}
                                onChange={(e) => {
                                    setpreliminaryDiagnosis(e.target.value)
                                }}></textarea>
                        </div>
                        <div className='opt'>
                            <div className='opt-bz'>治疗意见</div>
                            <textarea className='opt-int'
                                rows="6"
                                cols="5"
                                placeholder={oldZd.treatmentAdvice}
                                onChange={(e) => {
                                    settreatmentAdvice(e.target.value)
                                }}></textarea>
                        </div>
                        <div className='opt3'>
                            <Button onClick={zd}>确认诊断</Button>
                        </div>
                    </div>
                    <div className='pre-ri-opt-ri'>
                        <div className='opt'>
                        </div>
                    </div>
                </div>
                <div className='prescriptionD-right-body'>
                    <div className='prescriptionD-right-body-opt'>
                        <div className='pre-ri-opt-title'>处方</div>
                    </div>
                    <div className='pre-ri-opt-main'>
                        <table className='pre-table'>
                            <thead className='pre-t-head'>
                                <tr>
                                    <th></th>
                                    <th>药品编号</th>
                                    <th>药品名</th>
                                    <th>用量</th>
                                    <th>用法</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody className='pre-t-body'>
                                {
                                    pre.map((item) => {
                                        return (
                                            <tr key={item.medicationid} className='pre-t-b-tr'>
                                                <td>
                                                    <div className='pre-tbody-circle'></div>
                                                </td>
                                                <td>{item.medicationid}</td>
                                                <td>{item.medicationname}</td>
                                                <td>{item.number}</td>
                                                <td>{item.frequency}</td>
                                                <td>
                                                    <div className='pre-ops'>
                                                        {/* <HighlightOutlined className='pre-ico' /> */}
                                                        {/* <CloseOutlined className='pre-ico' /> */}
                                                        <Button onClick={() => {
                                                            delPre(item.pmid)
                                                        }}>删除药品</Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        <div className='opt4'>
                            <Button onClick={changeAdd}>添加药品</Button>
                            <Button>确认处方</Button>
                        </div>
                    </div>
                    <div className='pre-ri-opt-ri'>
                        <div className='opt'>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PrescriptionD