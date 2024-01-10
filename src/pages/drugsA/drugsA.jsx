/* eslint-disable no-unused-vars */
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined, HighlightOutlined, CloseOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import AddDrug from '../addDrug/addDrug';
import './drugsA.styl'
import Service from '../../api/service';
import UpdateDrug from '../updateDrug/updateDrug';
function DrugsA() {
    const [kid, setKid] = useState(0)
    const [add, setAdd] = useState(false)
    const [count, setCount] = useState(0)
    const [up, setUp] = useState(false)
    const [drugId, setDrugId] = useState(0)
    const changeAdd = () => {
        setAdd(!add)
    }
    const menu = (
        <Menu>
            <Menu.Item key="1" onClick={() => {
                setKid('处方药')
            }}>处方药</Menu.Item>
            <Menu.Item key="2" onClick={() => {
                setKid('非处方药')
            }}>非处方药</Menu.Item>
            <Menu.Item key="3" onClick={() => {
                setKid('中成药')
            }}>中成药</Menu.Item>
            <Menu.Item key="4" onClick={() => {
                setKid('中药')
            }}>中药</Menu.Item>
            <Menu.Item key="5" onClick={() => {
                setKid(0)
            }}>所有</Menu.Item>
        </Menu>
    )

    const [Drugs, setDrug] = useState([])

    useEffect(() => {
        let a = []
        Service.getAllDrugs().then((res) => {
            res.map((i) => {
                a.push(i)
            })
            setDrug(a)
        })
    }, [count])

    const changeDrugid = (e) => {
        setDrugId(e)
        setUp(true)
    }

    return (
        <div className="D_info">
            {
                add && (
                    <AddDrug addClose={() => { setCount(count + 1) }} onClose={() => { setAdd(false) }} />
                )
            }
            {
                up && (
                    <UpdateDrug drugId={drugId} upClose={() => { setCount(count + 1) }} onClose={() => { setUp(false) }} />
                )
            }
            <div className='Dinfo_header'>
                <Dropdown overlay={menu}>
                    <Button>
                        {kid == 0 ? '请选择药物类型' : kid} <DownOutlined />
                    </Button>
                </Dropdown>
                <div className='dinfo-h-r'>
                    <Button className='dinfo-h-b' onClick={changeAdd}>添加药物</Button>
                </div>
            </div>
            <div className='Dinfo_body'>
                <table className='dinfo-table'>
                    <thead className='dinfo-thead'>
                        <tr>
                            <th></th>
                            <th>药物名称</th>
                            <th>药品编号</th>
                            <th>制药公司</th>
                            <th>进价</th>
                            <th>售价</th>
                            <th>数量</th>
                            <th>药物类型</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody className='dinfo-tbody'>
                        {
                            Drugs.map((e) => {
                                if (kid == 0 || kid == e.category) {
                                    return (
                                        <tr className='dinfo-tbody-tr' key={e.medicationid}>
                                            <td>
                                                <div className='dinfo-tbody-circle'></div>
                                            </td>
                                            <td>{e.medicationname}</td>
                                            <td>{e.medicationid}</td>
                                            <td>{e.manufacturer}</td>
                                            <td>{e.purchaseprice}元</td>
                                            <td>{e.sellingprice}元</td>
                                            <td>{e.inventory}</td>
                                            <td>{e.category}</td>
                                            <td>
                                                <div className='dinfo-ops'>
                                                    <HighlightOutlined className='dinfo-ico' 
                                                    onClick={() => { changeDrugid(e.medicationid) }} />
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

export default DrugsA
