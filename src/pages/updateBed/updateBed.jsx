/* eslint-disable react/prop-types */

import './updateBed.styl'
import {
    Modal,
    Button,
    Form,
    Input,
} from 'antd'
import { useState } from 'react';
import Service from '../../api/service';
function UpdateBed(props) {
    const {onClose} = props
    // const [name, setName] = useState()
    const [patientstatus,setpatientstatus] = useState()
    const [patientname,setpatientname] = useState()
    const [patientid,setpatientid] = useState()
    const ad = async () => {


        await Service.updateBed(props.wardid, props.bedid,patientid,patientname,patientstatus).then(res => {
            if(res){
                alert('修改成功')
            }
        })
        props.upClose()
        props.onClose()
    }


    return (
        <Modal open={true}
            title="添加患者"
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

                    <Form.Item label="患者姓名" >
                        <Input onChange={(e) => { setpatientname(e.target.value) }} />
                    </Form.Item>
                    <Form.Item label="患者编号" >
                        <Input onChange={(e) => { setpatientid(e.target.value) }} />
                    </Form.Item>
                    <Form.Item label="患者状态" >
                        <Input onChange={(e) => { setpatientstatus(e.target.value) }} />
                    </Form.Item>

                </Form>
                <div className='apr_footer'>
                    <Button onClick={ad}>确认</Button>
                    <Button onClick={()=>{
                        onClose()
                    }}>取消</Button>
                </div>

            </div>
        </Modal>
    )
}
export default UpdateBed