/* eslint-disable react/prop-types */
import './addKs.styl'
import {
    Modal,
    Button,
    Form,
    Input,
} from 'antd'
import { useState } from 'react';
import Service from '../../api/service';
function AddKs(props) {
    const {onClose} = props;
    // const [id, setId] = useState()
    const [name, setName] = useState()
    const [charger, setCharger] = useState()

    

    const ad = async () => {
        let did ='' 
        await Service.getDoctoridByname(charger).then((res)=>{
            did=res[0].doctorid
        })

        await Service.addDept(name,did).then(res=>{
            if(res){
                alert('添加成功')
            }
        })
        await props.addClose()
        onClose()
    }

    return (
        <Modal open={true}
            title="添加科室"
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
                    
                    <Form.Item label="科室名称" >
                        <Input onChange={(e) => { setName(e.target.value) }} />
                    </Form.Item>
                    {/* <Form.Item label="科室编号" >
                        <Input onChange={(e) => { setId(e.target.value) }} />
                    </Form.Item> */}
                    {/* <Form.Item label="科目" >
                        <Input onChange={(e) => { setType(e.target.value) }} />
                    </Form.Item> */}
                    <Form.Item label="科室主任" >
                        <Input onChange={(e) => { setCharger(e.target.value) }} />
                    </Form.Item>
                    {/* <Form.Item label="科室简介">
                        <TextArea rows={4} onChange={(e) => { setInfo(e.target.value) }} />
                    </Form.Item> */}

                </Form>
                <div className='apr_footer'>
                    <Button onClick={ad}>确认</Button>
                    <Button onClick={props.onClose}>取消</Button>
                </div>

            </div>
        </Modal>
    )
}
export default AddKs