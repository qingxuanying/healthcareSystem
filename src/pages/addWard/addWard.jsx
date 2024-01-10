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
import { useState } from 'react';
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
    

    const menuKs = (
        <Menu>
            <Menu.Item key="1" onClick={() => {
                setdeptid(1)
                setKs('精神科')
            }}>精神科</Menu.Item>
            <Menu.Item key="2" onClick={() => {
                setdeptid(2)
                setKs('外科')
            }}>外科</Menu.Item>
            <Menu.Item key="3" onClick={() => {
                setdeptid(3)
                setKs('内科')
            }}>内科</Menu.Item>
            <Menu.Item key="4" onClick={() => {
                setdeptid(4)
                setKs('消化内科')
            }}>消化内科</Menu.Item>
            <Menu.Item key="5" onClick={() => {
                setdeptid(5)
                setKs('皮肤科')
            }}>皮肤科</Menu.Item>
            <Menu.Item key="6" onClick={() => {
                setdeptid(6)
                setKs('儿科')
            }}>儿科</Menu.Item>
            <Menu.Item key="7" onClick={() => {
                setdeptid(7)
                setKs('肛肠科')
            }}>肛肠科</Menu.Item>
            <Menu.Item key="8" onClick={() => {
                setdeptid(8)
                setKs('心理科')
            }}>心理科</Menu.Item>
            <Menu.Item key="9" onClick={() => {
                setdeptid(9)
                setKs('康复科')
            }}>康复科</Menu.Item>
            <Menu.Item key="10" onClick={() => {
                setdeptid(0)
                setKs('其他科')
            }}>其他科</Menu.Item>
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
                        <Dropdown overlay={menuKs}>
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