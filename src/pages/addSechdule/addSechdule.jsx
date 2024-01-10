/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import './addSechdule.styl'
import {
    Modal,
    Button,
    Form,
    Input,
} from 'antd'
import { useState } from 'react';
import Service from '../../api/service';
// eslint-disable-next-line react/prop-types
function AddSechdule(props) {
    const [name, setName] = useState()
    const ad = async () => {
        let did = ''
        await Service.getDoctoridByname(name).then((res) => {
            did = res[0].doctorid
        })

        Service.updateSchedule(props.doctorscheduleid, did, props.deptid,name,props.week).then(res => {
            if(res){
                alert('添加成功')
            }
        })
        props.asClose()
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

                    <Form.Item label="值班医生" >
                        <Input onChange={(e) => { setName(e.target.value) }} />
                    </Form.Item>
                    {/* <Form.Item label="科室编号" >
                        <Input onChange={(e) => { setId(e.target.value) }} />
                    </Form.Item> */}
                    {/* <Form.Item label="科目" >
                        <Input onChange={(e) => { setType(e.target.value) }} />
                    </Form.Item> */}
                    {/* <Form.Item label="科室主任" >
                        <Input onChange={(e) => { setCharger(e.target.value) }} />
                    </Form.Item> */}
                    {/* <Form.Item label="科室简介">
                        <TextArea rows={4} onChange={(e) => { setInfo(e.target.value) }} />
                    </Form.Item> */}

                </Form>
                <div className='apr_footer'>
                    <Button onClick={ad}>确认</Button>
                    <Button>取消</Button>
                </div>

            </div>
        </Modal>
    )
}
export default AddSechdule