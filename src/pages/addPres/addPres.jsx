/* eslint-disable react/prop-types */
import { Modal } from 'antd'
import {
    Button,
    Form,
    Input,
    InputNumber,
} from 'antd'
import './addPres.styl'
import { useState } from 'react';
import Service from '../../api/service';

function AddPres(props) {
    const {onClose,onAdd} =props
    const { TextArea } = Input;

    const [name, setName] = useState()
    const [num, setNum] = useState()
    const [use, setUse] = useState()

    const ad = async () => {
        await Service.addPreM(props.prescriptionid,name,num,use).then((res)=>{
            console.log(res)
        })
        await onAdd()
        onClose()
    }
    return (
        <Modal open={true}
            title="添加药品"
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

                    <Form.Item label="药物名称" >
                        <Input onChange={(e) => { setName(e.target.value) }} />
                    </Form.Item>
                    <Form.Item label="处方药量">
                        <InputNumber onChange={(e) => { setNum(e) }} />
                    </Form.Item>
                    <Form.Item label="药物用法">
                        <TextArea rows={4} onChange={(e) => { setUse(e.target.value) }} />
                    </Form.Item>
                </Form>
                <div className='apr_footer'>
                    <Button onClick={ad}>确认开药</Button>
                    <Button onClick={onClose}>取消</Button>
                </div>

            </div>
        </Modal>
    )
}
export default AddPres