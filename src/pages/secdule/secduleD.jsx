import './secduleD.styl'
import { UnorderedListOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import Service from '../../api/service';
function ScheduleD() {
    const [data, setData] = useState([])
    useEffect(() => {
        const doctorid = localStorage.getItem("doctorid")
        Service.getDoctorScheduleByDoctorId(doctorid).then((res) => {
            let a = []
            console.log(res)
            res.map((i) => {
                a.push(i)
            })
            setData(a)
        })
    }, [])


    return (
        <div className='SecduleD'>
            <div className='Ap-info'>
                <div className='Hospi-Ptitle'>排班信息</div>


                {
                    data.map((item) => {
                        if (item.state == 1) {
                            return (
                                <div className='Hospi-Pbody' key={item.doctorscheduleid}>
                                    <div className='Hospi-Pbody-l'>
                                        <div className='Hospi-Pbody-lid'>周{item.week}</div>
                                        <div className='Hospi-Pbody-ldate'>{item.date}</div>
                                    </div>
                                    <div className='Hospi-Pbody-m'>
                                        <div className='Hospi-Pbody-mitem'>
                                            <div className='Hospi-Pbody-miteml'>科室位置:</div>
                                            <div className='Hospi-Pbody-mitemr'>{item.deptid}</div>
                                        </div>
                                        <div className='Hospi-Pbody-mitem'>
                                            <div className='Hospi-Pbody-miteml'>医生姓名:</div>
                                            <div className='Hospi-Pbody-mitemr'>{item.doctorname}</div>
                                        </div>
                                        {/* <div className='Hospi-Pbody-mitem'>
                                            <div className='Hospi-Pbody-miteml'>医生职称:</div>
                                            <div className='Hospi-Pbody-mitemr'>{item.k_supervisor}</div>
                                        </div> */}
                                    </div>
                                    <div className='Hospi-Pbody-r'>
                                        <UnorderedListOutlined />
                                    </div>
                                </div>
                            )
                        }
                        // else {
                        //     return (
                        //         <div className='Hospi-Pbody2' key={item.doctorscheduleid}>
                        //             <div className='Hospi-Pbody2-l'>
                        //                 <div className='Hospi-Pbody2-lid'>周{item.week}</div>
                        //             </div>
                        //             <div className='Hospi-Pbody2-m'>

                        //             </div>
                        //             <div className='Hospi-Pbody2-r'>
                        //                 <Button>无排班</Button>
                        //             </div>
                        //         </div>
                        //     )
                        // }
                    }
                    )
                }

            </div>
        </div>
    )
}
export default ScheduleD