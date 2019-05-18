import React from 'react'
import {Modal} from 'antd'

export default class ModalComp extends React.Component {

  
  render() {
    const {title,content, visible} = this.props
    return (
      <Modal
        visible = {visible} 
        title = {title}
        content = {content}
        trigger = 'click'
      />
    )
  }
}