import { Button } from 'antd';
import './hospitalizationA.styl'
import { UnorderedListOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { useState,useEffect } from 'react';
import AddWard from '../addWard/addWard';
import Service from '../../api/service';
import UpdateBed from '../updateBed/updateBed';
function HospitalizationA() {
    // const items1 = [
    //     {
    //         btype: '普通病房',
    //         b_id: '401',
    //         b_supervisor_title: '护士',
    //         b_supervisor: '特杨',
    //         state1: 0,
    //         state2: 1,
    //         state3: 0,
    //         state4: 1,
    //         state5: 1,
    //         state6: 0
    //     },
    //     {
    //         btype: '特级病房',
    //         b_id: '402',
    //         b_supervisor_title: '护士长',
    //         b_supervisor: '太阳',
    //         state1: 1,
    //         state2: 1,
    //         state3: 0,
    //         state4: 0,
    //         state5: 1,
    //         state6: 1
    //     }
    // ]

    // const data1 = [
    //     {
    //         bed_id: '1',
    //         bed_statu: 1,
    //         bed_time: '2023-09-14-10:30',
    //         bed_pname: '曹操',
    //         bed_sd: 5,
    //         p_situation: '.慢性非萎缩性胃炎并胃窦轻度糜烂',
    //         p_status: '手术恢复',
    //         p_drugs: '阿莫西林',
    //         p_days: 5
    //     },
    //     {
    //         bed_id: '2',
    //         bed_statu: 1,
    //         bed_time: '2023-09-15-10:30',
    //         bed_pname: '杨过',
    //         bed_sd: 2,
    //         p_situation: '左臂缺失',
    //         p_status: '手术恢复',
    //         p_drugs: '止痛药',
    //         p_days: 15
    //     },
    //     {
    //         bed_id: '3',
    //         bed_statu: 0,
    //         bed_time: '',
    //         bed_pname: '',
    //         bed_sd: '',
    //         p_situation: '',
    //         p_status: '',
    //         p_drugs: '',
    //         p_days: ''
    //     },
    //     {
    //         bed_id: '4',
    //         bed_statu: 0,
    //         bed_time: '',
    //         bed_pname: '',
    //         bed_sd: '',
    //         p_situation: '',
    //         p_status: '',
    //         p_drugs: '',
    //         p_days: ''
    //     },
    //     {
    //         bed_id: '5',
    //         bed_statu: 0,
    //         bed_time: '',
    //         bed_pname: '',
    //         bed_sd: '',
    //         p_situation: '',
    //         p_status: '',
    //         p_drugs: '',
    //         p_days: ''
    //     },
    //     {
    //         bed_id: '6',
    //         bed_statu: 0,
    //         bed_time: '',
    //         bed_pname: '',
    //         bed_sd: '',
    //         p_situation: '',
    //         p_status: '',
    //         p_drugs: '',
    //         p_days: ''
    //     },
    // ]
    const [add,setAdd]=useState(false)
    const [items2, setItems2] = useState([])
    const [count,setCount]= useState(0)
    const [items,setItems] = useState([])
    const [up,setUp] = useState(false)
    const [wardid,setwardid] = useState()
    const [bedid,setbedid] = useState(1)
    const [fix,setFix] = useState(false)

    useEffect(()=>{
        let a = []
         Service.getWards().then(async(res)=>{
            // console.log(res)
            await res.map((i)=>{
                a.push(i)
            })
            setItems(a)
            // console.log(items)
            // console.log(a)
            changeBid(a[0].wardid)
        })
    },[count])
    

    const changeBid = async(wardid) => {
        await setwardid(wardid)
        Service.getBedsByWardId(wardid).then(async(res)=>{
            let a = []
            await res.map((i)=>{
                a.push(i)
            })
            // console.log(res)
            setItems2(a)
        })
    }

    const changeCount = ()=>{
        setCount(count + 1)
    }

    const changeUp= async(e)=>{
        await setbedid(e)
        setUp(true)
        
    }
    const changeFix =async(e)=>{
        await setbedid(e)
        setFix(true)
    }
    return (
        <div className="hospitalizationA">
            {
                add && (
                    <AddWard addClose={()=>{changeCount()}}  onClose={()=>{
                        setAdd(false)
                    }}/>
                )
            }
            {
                up && (
                    <UpdateBed wardid={wardid} bedid={bedid} upClose={()=>{changeCount()}} onClose={()=>{
                        setUp(false)
                    }}/>
                )
            }
            {
                fix &&(
                    <UpdateBed wardid={wardid} bedid={bedid} upClose={()=>{changeCount()}} onClose={()=>{
                        setFix(false)
                    }}/>
                )
            }
            <div className='Aroom-info'>
                <div className='Hospi-Btitle'>
                    <div>病房信息</div>
                    <PlusSquareOutlined onClick={()=>{
                        setAdd(!add)
                    }}/>
                </div>
                {
                    items.map((item) => {
                        return (
                            <div className='Hospi-Bbody' key={item.wardid} onClick={() => changeBid(item.wardid)} >
                                <div className='Hospi-Bbody-h'>
                                    <div className='Hospi-Bbody-hl'>普通病房-{item.wardid}</div>
                                    <div className='Hospi-Bbody-hr'>{item.wardnumber}-{item.wardname}</div>
                                </div>
                                <div className='Hospi-Bbody-b'>
                                    {item.status[0] == 1 ? (<div className='Hospi-Bbody-bblue'></div>) : (<div className='Hospi-Bbody-bgrey'></div>)}
                                    {item.status[1] == 1 ? (<div className='Hospi-Bbody-bblue'></div>) : (<div className='Hospi-Bbody-bgrey'></div>)}
                                    {item.status[2] == 1 ? (<div className='Hospi-Bbody-bblue'></div>) : (<div className='Hospi-Bbody-bgrey'></div>)}
                                    {item.status[3] == 1 ? (<div className='Hospi-Bbody-bblue'></div>) : (<div className='Hospi-Bbody-bgrey'></div>)}
                                    {item.status[4] == 1 ? (<div className='Hospi-Bbody-bblue'></div>) : (<div className='Hospi-Bbody-bgrey'></div>)}
                                    {item.status[5] == 1 ? (<div className='Hospi-Bbody-bblue'></div>) : (<div className='Hospi-Bbody-bgrey'></div>)}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className='Ap-info'>
                <div className='Hospi-Ptitle'>患者信息</div>


                {
                    items2.map((item) => {
                        if (item.bedStatus == 1) {
                            return (
                                <div className='Hospi-Pbody' key={item.bedid}>
                                    <div className='Hospi-Pbody-l'>
                                        <div className='Hospi-Pbody-lid'>{item.bedNumber}号床</div>
                                        <div className='Hospi-Pbody-ldate'>{}</div>
                                        <div className='Hospi-Pbody-lpname'>{item.bed_pname}</div>
                                        {/* <div className='Hospi-Pbody-lsd'>第{item.bed_sd}天</div> */}
                                    </div>
                                    <div className='Hospi-Pbody-m'>
                                        <div className='Hospi-Pbody-mitem'>
                                            <div className='Hospi-Pbody-miteml'>患者姓名:</div>
                                            <div className='Hospi-Pbody-mitemr'>{item.patientname}</div>
                                        </div>
                                        <div className='Hospi-Pbody-mitem'>
                                            <div className='Hospi-Pbody-miteml'>患者状态:</div>
                                            <div className='Hospi-Pbody-mitemr'>{item.patientstatus}</div>
                                        </div>
                                        {/* <div className='Hospi-Pbody-mitem'>
                                            <div className='Hospi-Pbody-miteml'>治疗药品:</div>
                                            <div className='Hospi-Pbody-mitemr'>{item.p_drugs}</div>
                                        </div>
                                        <div className='Hospi-Pbody-mitem'>
                                            <div className='Hospi-Pbody-miteml'>住院天数:</div>
                                            <div className='Hospi-Pbody-mitemr'>共{item.p_days}天</div>
                                        </div> */}
                                    </div>
                                    <div className='Hospi-Pbody-r'>
                                        <UnorderedListOutlined onClick={()=>{
                                            changeFix(item.bedid)
                                        }}/>
                                    </div>
                                </div>
                            )
                        } else {
                            return (
                                <div className='Hospi-Pbody2' key={item.bedid}>
                                    <div className='Hospi-Pbody2-l'>
                                        <div className='Hospi-Pbody2-lid'>{item.bedNumber}号床</div>
                                    </div>
                                    <div className='Hospi-Pbody2-m'>

                                    </div>
                                    <div className='Hospi-Pbody2-r'>
                                        <Button onClick={()=>{
                                            changeUp(item.bedid)
                                        }}>添加患者</Button>
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

export default HospitalizationA
