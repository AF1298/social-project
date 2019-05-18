import React from 'react'
import { Form, Input, Select } from 'antd'
import ButtonComp from '../../component/button/button.component'


const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 16 },
};

class MyForm extends React.Component {

  handleSubmit = (e) => {
    const {action, click, dataEntry, dispatch, id} = this.props
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if(action === 'update'){
          dispatch({type: 'demo/update', payload: {data: values, code: id}})
          click('1')
        }
        else if (action === 'add'){
          dispatch({type: 'demo/create', payload: {data: values}})
        }
        this.clearFields()
      }
    });
  }

  setComponent = (item) => {
    if(item.type === 'text'){
      return <Input type = {item.type} style={{width: '250px'}} autoComplete = 'off'/>
    }
  }

  clearFields = () => {
    this.props.form.resetFields()
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const { formItem = [], dataEntry, click } = this.props
    return(
      <Form onSubmit={this.handleSubmit} className="formInput">
        <div style={{padding: '10px 0'}}>
          <span style = {{marginRight: '10px'}}>
            <ButtonComp type='back' exec={() => { this.clearFields(); click('1') }}/> 
          </span>
          <span>
            <ButtonComp type='save' />
          </span>
        </div>
        { formItem.map((item,index) => {
            return (     
              <Form.Item {...formItemLayout} label = {item.title} key={index} style={{marginBottom: 0}}>
                {getFieldDecorator(item.index, {
                  initialValue: dataEntry ? dataEntry[item.index] : null,
                  rules: [{ required: item.required, message: item.message }],
                })(
                  this.setComponent(item)
                )}
              </Form.Item>
            )
          })
        }
      </Form>
    )
  }
}

export const FormComp = Form.create({name: 'FormComponent'})(MyForm)