/* eslint-disable react/prop-types */
import './addWard.styl'
import {
    Modal,
    Button,
    Form,
    Input,
    Menu,
    Dropdown
} from 'antd'
import { DownOutlined } from '@ant-design/icons';
import { useState,useEffect } from 'react';
import Service from '../../api/service';
function AddWard(props) {
    const { onClose } = props
    const { TextArea } = Input;

    const [id, setId] = useState()
    const [name, setName] = useState()
    const [info, setInfo] = useState()
    // const [wardCapacity, setwardCapacity] = useState()
    const [deptid, setdeptid] = useState(1)
    const [ks, setKs] = useState('未知')
    const [depts,setDepts]=useState([])

    useEffect(()=>{ 
        Service.getAllDepts().then((res)=>{
            let a=[]
            // console.log(res)
            res.map((i)=>{
                a.push(i)
            })
            setDepts(a)
            // console.log(depts)
        })
    },[])
    
    const menuKs2 = (
        <Menu>
            {
                depts.map((item)=>(
                    <Menu.Item key={item.deptid} onClick={()=>{
                        setdeptid(item.deptid)
                        setKs(item.deptname)
                    }}>{item.deptname}</Menu.Item>
                ))
            }
        </Menu>
    )


    const ad = async () => {
        await Service.addWard(id, name, 6, deptid, info).then((res)=>{
            if(!res){
                alert("添加失败,科室id不存在")
            }else{
                alert("添加成功")
            }
        })
        props.addClose()
        onClose()
    }

    return (
        <Modal open={true}
            title="添加病房"
            onCancel={() => {
                onClose()
            }}
            maskClosable={false}
            footer={null}>
            <div className='addpre'>
                <Form
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    layout="horizontal"
                    disabled={false}
                    style={{
                        maxWidth: 600,
                    }}
                >

                    <Form.Item label="病房名称" >
                        <Input onChange={(e) => { setName(e.target.value) }} />
                    </Form.Item>
                    <Form.Item label="病房编号" >
                        <Input onChange={(e) => { setId(e.target.value) }} />
                    </Form.Item>
                    <Form.Item label="所在科室">
                        <Dropdown overlay={menuKs2}>
                            <Button>
                                {ks == '未知' ? '请选择' : ks} <DownOutlined />
                            </Button>
                        </Dropdown>
                    </Form.Item>
                    {/* <Form.Item label="病房容量" >
                        <Input onChange={(e) => { setwardCapacity(e.target.value) }} />
                    </Form.Item> */}
                    <Form.Item label="病房简介">
                        <TextArea rows={4} onChange={(e) => { setInfo(e.target.value) }} />
                    </Form.Item>

                </Form>
                <div className='apr_footer'>
                    <Button onClick={ad}>确认</Button>
                    <Button>取消</Button>
                </div>

            </div>
        </Modal>
    )
}
export default AddWard