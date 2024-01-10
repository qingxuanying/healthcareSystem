/* eslint-disable react/prop-types */
import './addRegistration.styl'
import {
    Modal,
    Button,
    Form,
    Input,
} from 'antd'
import { useState } from 'react';
import Service from '../../api/service';
function AddRegistration(props) {
    const {TextArea} = Input
    const [drept,setdrept] = useState('')

    const ad = async () => {
        Service.addRegistration(props.doctorid, props.patientid, drept,props.fee).then(res => {
            if(res){
                alert('添加成功')
            }
        })
        props.addClose()
        props.onClose()
    }

    return (
        <Modal open={true}
            title="添加值班"
            onCancel={() => {
                props.onClose()
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

                    <Form.Item label="医生姓名" >
                        <Input disabled={true} defaultValue={props.doctorname}/>
                    </Form.Item>
                    <Form.Item label="挂号科室" >
                        <Input disabled={true} defaultValue={props.deptid}/>
                    </Form.Item>
                    <Form.Item label="挂号费用" >
                        <Input disabled={true} defaultValue={props.fee}/>
                    </Form.Item>
                    <Form.Item label="病情描述">
                        <TextArea rows={4} onChange={(e) => {setdrept(e.target.value)}} />
                    </Form.Item>


                </Form>
                <div className='apr_footer'>
                    <Button onClick={ad}>确认</Button>
                    <Button onClick={props.onClose}>取消</Button>
                </div>

            </div>
        </Modal>
    )
}
export default AddRegistration