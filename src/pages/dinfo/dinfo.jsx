/* eslint-disable no-unused-vars */
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined, HighlightOutlined, CloseOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import AddDoctor from '../addDoctor/addDoctor';
import Service from '../../api/service';
import './dinfo.styl'
import UpDoctor from '../updateDoctor/upDoctor';
function Dinfo() {
    const [kid, setKid] = useState(0)
    const [add, setAdd] = useState(false)
    const [up, setUp] = useState(false)
    const [Docter_items, setDocter_items] = useState([])
    const [chose, setChose] = useState(0)
    const [count, setcount] = useState(0)


    useEffect(() => {
        let a = []
        Service.getDoctors().then((res) => {
            
            res.map((i) => {
                a.push(i)
            })
            setDocter_items(a)
        })
    }, [count])

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


    const changeAdd = () => {
        setAdd(!add);
        let a = []
        Service.getDoctors().then((res) => {
            res.map((i) => {
                a.push(i)
            })
            setDocter_items(a)
        })
    }
    const changeUp = (e) => {
        setChose(e)
        setUp(!up);
    }

    const delDoctor = (id) => {
        let a = []
        Service.deleteDoctor(id)
        alert("删除成功")
        Service.getDoctors().then((res) => {
            res.map((i) => {
                a.push(i)
            })
            setDocter_items(a)
        })
    }

    const addClose = () => {
        setcount(count + 1)
    }

    return (

        <div className="D_info">
            {
                add && (
                    <AddDoctor addClose={()=>{ addClose()}} onClose={() => { setAdd(false) }}
                    />
                )
            }
            {
                up && (
                    <UpDoctor doctorid={chose} onClose={() => {
                        setUp(false)
                    }}
                    />
                )
            }
            <div className='Dinfo_header'>
                <Dropdown overlay={menu}>
                    <Button>
                        {kid == 0 ? '请选择科室' : kid == 1?'精神科':kid == 2?'外科':kid==3?'内科':kid==4?'消化内科':
                        kid == 5?'皮肤科':kid==6?'儿科':kid==7?'肛肠科':kid==8?'心理科':kid==9?'康复科':'其他科'} <DownOutlined />
                    </Button>
                </Dropdown>
                <div className='dinfo-h-r'>
                    <Button className='dinfo-h-b' onClick={changeAdd}>添加医生</Button>
                </div>
            </div>

            <div className='Dinfo_body'>
                <table className='dinfo-table'>
                    <thead className='dinfo-thead'>
                        <tr>
                            <th></th>
                            <th>医生姓名</th>
                            <th>科室</th>
                            <th>性别</th>
                            <th>职务</th>
                            <th>联系方式</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody className='dinfo-tbody'>
                        {
                            Docter_items.map((e) => {
                                if (kid == 0 || kid == e.deptid) {
                                    return (
                                        <tr className='dinfo-tbody-tr' key={e.doctorid}>
                                            <td>
                                                <div className='dinfo-tbody-circle'></div>
                                            </td>
                                            <td>{e.doctorname}</td>
                                            <td>{(e.deptid == 1 ? '精神科' : e.deptid == 2 ? '外科' : e.deptid == 3 ? '内科' :
                                                e.deptid == 4 ? '消化内科' : e.deptid == 5 ? '皮肤科' : e.deptid == 6 ? '儿科' : e.deptid == 7 ? '肛肠科' :
                                                    e.deptid == 8 ? '心理科' : e.deptid == 9 ? '康复科' : '其他科')}</td>
                                            <td>{e.doctorgender == 0 ? '未知' : e.doctorgender == 1 ? '男' : '女'}</td>
                                            <td>{e.doctortitle}</td>
                                            <td>{e.doctorphone}</td>
                                            <td>
                                                <div className='dinfo-ops'>
                                                    <HighlightOutlined className='dinfo-ico' onClick={() => {
                                                        changeUp(e.doctorid)
                                                    }} />
                                                    <CloseOutlined className='dinfo-ico' onClick={() => {
                                                        delDoctor(e.doctorid)
                                                    }} />
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

export default Dinfo
