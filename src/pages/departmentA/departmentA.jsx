
import { Button } from 'antd';
import './departmentA.styl'
import { UnorderedListOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import AddKs from '../addKS/addKs';
import Service from '../../api/service';
import AddSechdule from '../addSechdule/addSechdule';
function DepartmentA() {

    const [add, setAdd] = useState(false)
    const [items, setitems] = useState([])
    const [data, setdata] = useState([])
    const [as, setAs] = useState(false)
    const [choose, setchoose] = useState()
    const [cdeptid, setCdeptid] = useState()
    const [count, setCount] = useState(0)
    const [week,setWeek] = useState(1)

    useEffect(() => {
        let a = []
        Service.getAllDepts().then((res) => {
            res.map((i) => {
                a.push(i)
            })
            setitems(a)
            getSechdule(a[0].deptid)
        })

    }, [count])

    const changeAdd = () => {
        setAdd(!add)
    }
    const changeAs = (doctorscheduleid, deptid,weeki) => {
        setWeek(weeki)
        setchoose(doctorscheduleid)
        setCdeptid(deptid)
        setAs(!as)
    }

    const getSechdule = (deptid) => {
        // console.log(deptid)
        Service.getScheduleByDeptid(deptid).then((res) => {
            setdata(res)
            console.log(res)
        })
    }
    const addClose = () => {

        setCount(count + 1)
    }
    const asClose = () => {

        setCount(count + 1)
    }


    return (
        <div className="hospitalizationA">
            {
                add && (
                    <AddKs addClose={() => { addClose() }} onClose={() => { setAdd(false) }} />
                )
            }
            {
                as && (
                    <AddSechdule week={week} doctorscheduleid={choose} deptid={cdeptid} asClose={() => { asClose() }} onClose={() => { setAs(false) }} />
                )
            }
            <div className='Aroom-info'>
                <div className='Hospi-Btitle'>
                    <div>科室信息</div>
                    <PlusSquareOutlined onClick={changeAdd} />
                </div>
                {
                    items.map((item) => {
                        return (
                            <div className='Hospi-Bbody' key={item.deptid} onClick={() => {
                                getSechdule(item.deptid)
                            }}>
                                <div className='Hospi-Bbody-h'>
                                    <div className='Hospi-Bbody-hl'>普通科室-{item.deptid}</div>
                                    <div className='Hospi-Bbody-hr'>{item.deptname}</div>
                                </div>
                                <div className='Hospi-Bbody-b'>
                                    {item.state[0] == 1 ? (<div className='Hospi-Bbody-bblue'></div>) : (<div className='Hospi-Bbody-bgrey'></div>)}
                                    {item.state[1] == 1 ? (<div className='Hospi-Bbody-bblue'></div>) : (<div className='Hospi-Bbody-bgrey'></div>)}
                                    {item.state[2] == 1 ? (<div className='Hospi-Bbody-bblue'></div>) : (<div className='Hospi-Bbody-bgrey'></div>)}
                                    {item.state[3] == 1 ? (<div className='Hospi-Bbody-bblue'></div>) : (<div className='Hospi-Bbody-bgrey'></div>)}
                                    {item.state[4] == 1 ? (<div className='Hospi-Bbody-bblue'></div>) : (<div className='Hospi-Bbody-bgrey'></div>)}
                                    {item.state[5] == 1 ? (<div className='Hospi-Bbody-bblue'></div>) : (<div className='Hospi-Bbody-bgrey'></div>)}
                                    {item.state[6] == 1 ? (<div className='Hospi-Bbody-bblue'></div>) : (<div className='Hospi-Bbody-bgrey'></div>)}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className='Ap-info'>
                <div className='Hospi-Ptitle'>排班信息</div>


                {
                    data.map((item) => {
                        if (item.state == 1) {
                            return (
                                <div className='Hospi-Pbody' key={item.doctorscheduleid}>
                                    <div className='Hospi-Pbody-l'>
                                        <div className='Hospi-Pbody-lid'>周 {item.week}</div>
                                        <div className='Hospi-Pbody-ldate'>{item.date}</div>
                                    </div>
                                    <div className='Hospi-Pbody-m'>
                                        {/* <div className='Hospi-Pbody-mitem'>
                                            <div className='Hospi-Pbody-miteml'>医生职务:</div>
                                            <div className='Hospi-Pbody-mitemr'>{item.k_supervisor_title}</div>
                                        </div> */}
                                        <div className='Hospi-Pbody-mitem'>
                                            <div className='Hospi-Pbody-miteml'>医生姓名:</div>
                                            <div className='Hospi-Pbody-mitemr'>{item.doctorname}</div>
                                        </div>
                                        <div className='Hospi-Pbody-mitem'>
                                            <div className='Hospi-Pbody-miteml'>医生编号:</div>
                                            <div className='Hospi-Pbody-mitemr'>{item.doctorid}</div>
                                        </div>
                                    </div>
                                    <div className='Hospi-Pbody-r'>
                                        <UnorderedListOutlined onClick={() => {
                                            changeAs(item.doctorscheduleid,item.week,item.deptid)
                                        }} />
                                    </div>
                                </div>
                            )
                        } else {
                            return (
                                <div className='Hospi-Pbody2' key={item.doctorscheduleid}>
                                    <div className='Hospi-Pbody2-l'>
                                        <div className='Hospi-Pbody2-lid'>周{item.week}</div>
                                        {/* <div className='Hospi-Pbody-ldate'>{item.date}</div> */}
                                    </div>
                                    <div className='Hospi-Pbody2-m'>

                                    </div>
                                    <div className='Hospi-Pbody2-r'>
                                        <Button onClick={() => {
                                            changeAs(item.doctorscheduleid, item.deptid ,item.week)
                                        }}>添加排班</Button>
                                    </div>
                                </div>
                            )
                        }
                    })
                }

            </div>
        </div>
    )
}

export default DepartmentA
