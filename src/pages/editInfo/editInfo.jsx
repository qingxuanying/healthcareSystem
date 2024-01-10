/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import './editInfo.styl'
import {
    Modal,
    Button,
    Form,
    Input,
    Radio,
    Upload
} from 'antd'
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import Service from '../../api/service';
function EditInfo(props) {
    const { onClose } = props
    const [name,setName] = useState('')
    const [age,setAge] = useState(0)
    const [phone,setPhoto] = useState(0)
    const [sex, setSex] = useState(0)
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const uploadPhoto = (file) => {
        if (file) {
            const formData = new FormData();
            formData.append('photo', file);
            formData.append('patientid', props.id)

            fetch('api/patient/upload', {
                method: 'POST',
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    console.log('文件上传成功:', data);
                })
                .catch(error => {
                    console.error('上传失败:', error);
                });
        }
    }


    const ad = ()=>{
        Service.updatePatient(props.id,name,sex,phone,age).then((res)=>{
            console.log(res)
            if(res){
                alert("修改成功")
                onClose()
                props.fixClose()
            }
            
        })
    }

    return (
        <Modal open={true}
            title="修改信息"
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

                    <Form.Item label="*姓名" >
                        <Input onChange={(e)=>{setName(e.target.value)}}/>
                    </Form.Item>
                    <Form.Item label="*性别">
                        <Radio.Group onChange={(e) => { setSex(e.target.value) }}>
                            <Radio value="1"> 男 </Radio>
                            <Radio value="2"> 女 </Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="*电话" >
                        <Input onChange={(e)=>{setPhoto(e.target.value)}}/>
                    </Form.Item>
                    <Form.Item label="*年龄" >
                        <Input onChange={(e)=>{setAge(e.target.value)}}/>
                    </Form.Item>
                    <Form.Item label="照片" valuePropName="fileList" getValueFromEvent={handleFileChange}>
                        <Upload
                            customRequest={({ file }) => uploadPhoto(file)}
                            listType="picture-card"
                        >
                            <button
                                style={{
                                    border: 0,
                                    background: 'none',
                                }}
                                type="button"
                            >
                                <PlusOutlined />
                                <div
                                    style={{
                                        marginTop: 8,
                                    }}
                                >
                                    上传
                                </div>
                            </button>
                        </Upload>
                    </Form.Item>



                </Form>
                <div className='apr_footer'>
                    <Button onClick={ad}>确认</Button>
                    <Button onClick={onClose}>取消</Button>
                </div>

            </div>
        </Modal>
    )
}
export default EditInfo