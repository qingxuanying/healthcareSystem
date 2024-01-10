/* eslint-disable react/prop-types */
import './addDrug.styl'
import {
    Modal,
    Button,
    Form,
    Input,
    Radio,
} from 'antd'
import { useState } from 'react';
import Service from '../../api/service';
function AddDrug(props) {
    const { onClose } = props

    const [id, setId] = useState()  //药品id
    const [name, setName] = useState()  //药品名称
    const [level, setLevel] = useState('处方药')    //药品类型
    const [inP, setInp] = useState()  //药品进价
    const [price, setPrice] = useState()    //药品价格
    const [dsu,setDsu] = useState() //制药公司
    const [num,setNum] = useState(0)
  

    const ad = async () => {
        await Service.addDrug(id,name,level,inP,price,dsu,num).then((res)=>{
            if(res){
                alert('添加成功')
            }
        })
        props.addClose()
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
                    <Form.Item label="药物类型">
                        <Radio.Group onChange={(e) => { setLevel(e.target.value) }}>
                            <Radio value="处方药"> 处方药 </Radio>
                            <Radio value="非处方药"> 非处方药 </Radio>
                            <Radio value="中药"> 中药 </Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="药物名称" >
                        <Input onChange={(e) => { setName(e.target.value) }} />
                    </Form.Item>
                    <Form.Item label="药物编号" >
                        <Input onChange={(e) => { setId(e.target.value) }} />
                    </Form.Item>
                    <Form.Item label="制药公司" >
                        <Input onChange={(e) => { setDsu(e.target.value) }} />
                    </Form.Item>
                    <Form.Item label="药品价格" >
                        <Input onChange={(e) => { setPrice(e.target.value) }} />
                    </Form.Item>
                    <Form.Item label="药品进价" >
                        <Input onChange={(e) => { setInp(e.target.value) }} />
                    </Form.Item>
                    <Form.Item label="药品数量" >
                        <Input onChange={(e) => { setNum(e.target.value) }} />
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
export default AddDrug